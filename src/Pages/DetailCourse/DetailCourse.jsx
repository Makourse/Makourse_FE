import './DetailCourse.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MeetingPlace from './components/MeetingPlace';
import PlaceGroup from './components/PlaceGroup';
import AddPlaceGuide from './components/AddPlaceGuide';

const DetailCourse = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseName, setCourseName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

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
        
        // 전체 선택 시 모든 아이템 개수만큼 설정, 전체 해제 시 0으로 설정
        // mainPlace만 선택 가능하므로 총 3개 (meetingPlace + place1 + place2)
        setSelectedItems(newSelectAll ? 3 : 0);
    };

    const handleItemSelect = (isSelected) => {
        setSelectedItems(prev => isSelected ? prev + 1 : prev - 1);
    };

    const place1 = {
        mainPlace: {
            number: "1",
            time: "PM 12시 30분",
            title: "홍대 카페",
            category: "카페",
            operatingHours: "11:30~21:00"
        },
        alternativePlaces: [
            {
                number: "1",
                time: "PM 12시 30분",
                title: "다른 홍대 카페",
                category: "카페",
                operatingHours: "10:00~22:00"
            },
            {
                number: "1",
                time: "PM 12시 30분",
                title: "다른 홍대 카페",
                category: "카페",
                operatingHours: "10:00~22:00"
            },            {
                number: "1",
                time: "PM 12시 30분",
                title: "다른 홍대 카페",
                category: "카페",
                operatingHours: "10:00~22:00"
            }

        ]
    };

    const place2 = {
        mainPlace: {
            number: "2",
            title: "연남동 식당",
            category: "식당",
            operatingHours: "11:00~21:00"
        },
        alternativePlaces: []
    };

    const handleEditEnd = () => {
        setIsEditing(false);
        setSelectAll(false);
        setSelectedItems(0);
    };

    const handleDeleteClick = () => {
        if (selectedItems > 0) {
            setIsDeleteModalOpen(true);
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
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
                    <h3>홍대 놀러가기</h3>
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
                        <h3>일정 저장</h3>
                        <p>날짜와 시간이 저장돼요</p>
                    </div>
                </div>
                
                <div className="option-card">
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
                <MeetingPlace 
                    time="PM 12시 30분"
                    title="홍대입구역 2번 출구"
                    address="서울시 마포구 양화로 100 홍대입구역"
                    isEditing={isEditing}
                    selectAll={selectAll}
                    onSelect={handleItemSelect}
                />
                
                <PlaceGroup {...place1} isEditing={isEditing} selectAll={selectAll} onSelect={handleItemSelect} />
                <PlaceGroup {...place2} isEditing={isEditing} selectAll={selectAll} onSelect={handleItemSelect} />
                
                {!isEditing && <AddPlaceGuide />}
                {isEditing && (
                    <div 
                        className={`edit-delete ${selectedItems > 0 ? 'active' : ''}`}
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
                                    // 여기에 삭제 로직 추가
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