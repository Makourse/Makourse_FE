import './DetailCourse.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MeetingPlace from './components/MeetingPlace';
import PlaceGroup from './components/PlaceGroup';
import AddPlaceGuide from './components/AddPlaceGuide';
import { getCourseDetail } from '../../api';
import { getAccessToken, deletePlace } from '../../api';

const DetailCourse = () => {
    const { scheduleId } = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const accessToken = getAccessToken();

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const response = await getCourseDetail(accessToken, scheduleId);
                setCourseDetail(response);
                console.log('courseDetail response:', response);
            } catch (error) {
                console.error('Error fetching course detail:', error);
            }
        };
        fetchCourseDetail();
    }, [accessToken, scheduleId]);

    useEffect(() => {
        const mapOptions = {
            center: new naver.maps.LatLng(37.557527, 126.925595),
            zoom: 15
        };
        
        const map = new naver.maps.Map('naver-map', mapOptions);
        
        // 마커도 같은 좌표로 설정
        new naver.maps.Marker({
            position: new naver.maps.LatLng(37.557527, 126.925595),
            map: map
        });
    }, []);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCourseName('');
    };

    const handleInputChange = (e) => {
        setCourseName(e.target.value);
    };

    const handleEditCourse = () => {
        setIsEditing(!isEditing);
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        
        // 전체 선택 시 모든 항목의 ID 배열 설정, 해제 시 빈 배열로 설정
        if (newSelectAll) {
            const allIds = [];
            if (courseDetail?.course.meet_place) {
                allIds.push('meeting');
            }
            if (courseDetail?.entry) {
                courseDetail.entry.forEach(place => {
                    allIds.push(place.pk);
                });
            }
            setSelectedItems(allIds);
        } else {
            setSelectedItems([]);
        }
    };

    const handleItemSelect = (id, isSelected) => {
        if (isSelected) {
            setSelectedItems(prev => [...prev, id]);
        } else {
            setSelectedItems(prev => prev.filter(itemId => itemId !== id));
        }
    };


    const handleEditEnd = () => {
        setIsEditing(false);
        setSelectAll(false);
        setSelectedItems([]);
    };

    const handleDeleteClick = () => {
        if (selectedItems.length > 0) {
            setIsDeleteModalOpen(true);
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    // 날짜 형식 변환 함수 추가
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    // 시간 형식 변환 함수 추가
    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : hours;
        
        return `${period} ${displayHours}시 ${minutes}분`;
    };

    const deletePlaces = async (placeIds) => {
        try {
            // 선택된 모든 장소에 대해 삭제 요청 보내기
            const deletePromises = placeIds.map(id => deletePlace(id));
            
            await Promise.all(deletePromises);
            
            // 삭제 후 코스 상세 정보 다시 불러오기
            const response = await getCourseDetail(accessToken, scheduleId);
            setCourseDetail(response);
            
            // 선택 상태 초기화
            setSelectedItems([]);
            setSelectAll(false);
            setIsEditing(false);
        } catch (error) {
            console.error('Error deleting places:', error);
        }
    };

    return (
        <div className="detail-course">
            <header className="detail-course-header">
                <div className="back-button">
                    <img src='/header-goback.svg' alt="back" />
                </div>
                <h1>코스 등록하기</h1>
            </header>

            <section className="title-section">
                <h2>약속 제목</h2>
                <div className="title-content">
                    <h3>{courseDetail?.course.course_name}</h3>
                    <div className="edit-button" onClick={handleEditClick}>
                        <img src='/detail-edit.svg' alt="edit" />
                    </div>
                </div>
            </section>

            <section className="options-section">
                <div className="option-card">
                    <div className="detail-icon">
                        <img src='/detail-cal.svg' alt="cal" />
                    </div>
                    <div className="detail-content">
                        {courseDetail?.course.meet_date_first ? 
                            <>
                                <h3>{formatDate(courseDetail?.course.meet_date_first)}</h3>
                                <p>{formatTime(courseDetail?.course.meet_date_first)}</p>
                            </>
                        : <>
                                <h3>일정 저장</h3>
                                <p>날짜와 시간이 저장돼요</p>
                            </>
                        }
                    </div>
                </div>
                
                <div className="option-card" onClick={() => navigate('/setparticipant')} style={{ cursor: 'pointer' }}>
                    <div className="detail-icon">
                        <img src='/detail-member.svg' alt="people" />
                    </div>
                    <div className="detail-content">
                        <h3>같이 코스 짜기</h3>
                        <p>같이 갈 사람과 공유해요</p>
                    </div>
                </div>
            </section>
            <div className='detail-map-box'>
                <div id='naver-map' style={{ width: '100%', height: '180px' }}/>
            </div>
            {isEditing && (
                <div className='edit-select'>
                    <div className='edit-select-container'>
                        <div className='edit-select-all' onClick={handleSelectAll}>
                                <img src='/edit-check-all.svg' alt='check-all' />
                            <span>전체 선택</span>
                        </div>
                        <div className='edit-end' onClick={handleEditEnd}>
                            <span>완료</span>
                        </div>
                    </div>
                </div>
            )}

            <section className={`info-section ${isEditing ? 'editing' : ''}`}>
                {!isEditing && (
                    <div className="course-edit">
                        <div className="course-edit-button" onClick={handleEditCourse}>
                            <img src='/detail-edit2.svg' alt="edit" />
                            <span className="course-edit-button-text">코스 수정하기</span>
                        </div>
                    </div>
                )}
                {courseDetail?.course.address ? (
                <MeetingPlace 
                    time={courseDetail?.course.meet_date_first ? formatTime(courseDetail?.course.meet_date_first) : ''}
                    title={courseDetail?.course.meet_place}
                    address={courseDetail?.course.meet_address}
                    isEditing={isEditing} 
                    selectAll={selectAll}
                />
                ) : (
                    <MeetingPlace 
                    time={null}
                    title={null}
                    address={null}
                    isEditing={isEditing} 
                    selectAll={selectAll}
                />
                )}

                {courseDetail?.entry.map((place) => (
                    <PlaceGroup place_pk = {place.pk} 
                    place_number = {place.num} 
                    place_name ={place.entry_name} 
                    isEditing={isEditing} 
                    selectAll={selectAll} 
                    onSelect={(isSelected) => handleItemSelect(place.pk, isSelected)}
                    isSelected={selectedItems.includes(place.pk)}
                    />
                ))}
                
                {!isEditing && <AddPlaceGuide />}
                {isEditing && (
                    <div 
                        className={`edit-delete ${selectedItems.length > 0 ? 'active' : ''}`}
                        onClick={handleDeleteClick}
                    >
                        <p>삭제하기</p>
                    </div>
                )}
            </section>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>코스 이름</h2>
                        <input 
                            type="text" 
                            className="modal-input"
                            placeholder="코스 이름을 입력해주세요."
                            value={courseName}
                            onChange={handleInputChange}
                        />
                        <div className="modal-divider"></div>
                        <div className="modal-buttons">
                            <button 
                                className="modal-button cancel" 
                                onClick={handleCloseModal}
                            >
                                닫기
                            </button>
                            <button 
                                className={`modal-button save ${courseName ? 'active' : ''}`}
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal-overlay">
                    <div className="delete-modal">
                        <h2>
                            <span className='delete-modal-sub'>장소가 삭제됩니다</span>
                            <span className='delete-modal-main'>정말 삭제하시겠습니까?</span>
                        </h2>
                        <div className="delete-modal-buttons">
                            <button 
                                className="delete-modal-button cancel"
                                onClick={handleCloseDeleteModal}
                            >
                                닫기
                            </button>
                            <button 
                                className="delete-modal-button delete"
                                onClick={() => {
                                    deletePlaces(selectedItems);
                                    handleCloseDeleteModal();
                                }}
                            >
                                삭제하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailCourse;