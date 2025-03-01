import './DetailCourse.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MeetingPlace from './components/MeetingPlace';
import PlaceGroup from './components/PlaceGroup';
import AddPlaceGuide from './components/AddPlaceGuide';
import { getCourseDetail,updateCourse } from '../../api';
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
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState({
        period: 'AM',
        hour: '01',
        minute: '00'
    });
    const [startY, setStartY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [currentType, setCurrentType] = useState(null);
    const [isQuickScrolling, setIsQuickScrolling] = useState(false);
    const scrollTimeout = useRef(null);
    const navigate = useNavigate();
    const accessToken = getAccessToken();
    const [currentMonth, setCurrentMonth] = useState(new Date());

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

    const handleDateClick = () => {
        if (courseDetail?.course.meet_date_first) {
            const date = new Date(courseDetail.course.meet_date_first);
            setSelectedDate(date);
            setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
            
            // 시간 설정
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const period = hours >= 12 ? 'PM' : 'AM';
            const hour12 = hours % 12 === 0 ? 12 : hours % 12;
            
            setSelectedTime({
                period: period,
                hour: String(hour12).padStart(2, '0'),
                minute: String(minutes).padStart(2, '0')
            });
        } else {
            const today = new Date();
            setSelectedDate(today);
            setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
            
            // 현재 시간 설정
            const hours = today.getHours();
            const minutes = today.getMinutes();
            const period = hours >= 12 ? 'PM' : 'AM';
            const hour12 = hours % 12 === 0 ? 12 : hours % 12;
            
            setSelectedTime({
                period: period,
                hour: String(hour12).padStart(2, '0'),
                minute: String(minutes).padStart(2, '0')
            });
        }
        setIsDateModalOpen(true);
    };

    const handleCloseDateModal = () => {
        setIsDateModalOpen(false);
    };
    
    const handleCalendarDateClick = (date) => {
        setSelectedDate(date);
    };
    
    const handleNextToTimeModal = () => {
        if (selectedDate) {
            setIsDateModalOpen(false);
            setIsTimeModalOpen(true);
        }
    };
    
    const handleCloseTimeModal = () => {
        setIsTimeModalOpen(false);
    };
    
    const handleTouchStart = (e, type) => {
        setStartY(e.touches[0].clientY);
        setIsDragging(true);
        setCurrentType(type);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const currentY = e.touches[0].clientY;
        const diff = startY - currentY;

        // 빠른 스크롤 감지
        if (!isQuickScrolling) {
            setIsQuickScrolling(true);
        }
        
        // 스크롤 타임아웃 초기화
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        if (Math.abs(diff) > 10) { // 민감도 증가
            updateTime(currentType, diff > 0);
            setStartY(currentY);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setCurrentType(null);
        
        // 터치 종료 후 일정 시간 후에 빠른 스크롤 상태 해제
        scrollTimeout.current = setTimeout(() => {
            setIsQuickScrolling(false);
        }, 300);
    };

    const updateTime = (type, increment) => {
        setSelectedTime(prev => {
            let newValue;
            switch(type) {
                case 'period':
                    return { ...prev, period: prev.period === 'AM' ? 'PM' : 'AM' };
                case 'hour':
                    newValue = parseInt(prev.hour) + (increment ? 1 : -1);
                    if (newValue > 12) newValue = 1;
                    if (newValue < 1) newValue = 12;
                    return { ...prev, hour: String(newValue).padStart(2, '0') };
                case 'minute':
                    newValue = parseInt(prev.minute) + (increment ? 5 : -5); // 5분 단위로 변경
                    if (newValue > 55) newValue = 0;
                    if (newValue < 0) newValue = 55;
                    return { ...prev, minute: String(newValue).padStart(2, '0') };
                default:
                    return prev;
            }
        });
    };

    const handlePeriodClick = () => {
        setSelectedTime(prev => ({
            ...prev,
            period: prev.period === 'AM' ? 'PM' : 'AM'
        }));
    };
    
    const handleSaveTime = async () => {
        try {
            if (!selectedDate) return;
            
            // 24시간 형식으로 변환
            let hour24 = parseInt(selectedTime.hour);
            if (selectedTime.period === 'PM' && hour24 !== 12) {
                hour24 += 12;
            } else if (selectedTime.period === 'AM' && hour24 === 12) {
                hour24 = 0;
            }
            
            // 날짜와 시간 결합
            const combinedDate = new Date(selectedDate);
            combinedDate.setHours(hour24);
            combinedDate.setMinutes(parseInt(selectedTime.minute));
            combinedDate.setSeconds(0);
            
            // API 호출하여 날짜 저장
            await updateCourse(scheduleId, { meet_date_first: combinedDate.toISOString() });
            
            // 상태 업데이트
            if (courseDetail) {
                setCourseDetail({
                    ...courseDetail,
                    course: {
                        ...courseDetail.course,
                        meet_date_first: combinedDate.toISOString()
                    }
                });
            }
            
            setIsTimeModalOpen(false);
        } catch (error) {
            console.error('날짜 저장 중 오류 발생:', error);
        }
    };

    const handleSaveCourseName = async () => {
        try {
            await updateCourse(scheduleId, { course_name: courseName });
            
            // 코스 이름 변경 후 상태 업데이트
            if (courseDetail) {
                setCourseDetail({
                    ...courseDetail,
                    course: {
                        ...courseDetail.course,
                        course_name: courseName
                    }
                });
            }
            
            setIsModalOpen(false);
            setCourseName(''); // 입력 필드 초기화
        } catch (error) {
            console.error('Error saving course name:', error);  
        }
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

    const handlePrevMonth = () => {
        setCurrentMonth(prev => {
            const prevMonth = new Date(prev);
            prevMonth.setMonth(prev.getMonth() - 1);
            return prevMonth;
        });
    };
    
    const handleNextMonth = () => {
        setCurrentMonth(prev => {
            const nextMonth = new Date(prev);
            nextMonth.setMonth(prev.getMonth() + 1);
            return nextMonth;
        });
    };
    
    // 달력에 표시할 날짜 배열 생성 함수
    const getDaysArray = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay(); // 해당 월의 첫 날 요일 (0: 일요일)
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 일 수
        
        const result = [];
        
        // 이전 달의 날짜 채우기
        const prevMonthDays = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            const date = new Date(year, month - 1, day);
            result.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                isSelected: selectedDate && date.toDateString() === selectedDate.toDateString()
            });
        }
        
        // 현재 달의 날짜 채우기
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            result.push({
                date,
                isCurrentMonth: true,
                isToday: date.toDateString() === today.toDateString(),
                isSelected: selectedDate && date.toDateString() === selectedDate.toDateString()
            });
        }
        
        // 다음 달의 날짜 채우기 (총 42개 칸 채우기)
        const remainingDays = 42 - result.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            result.push({
                date,
                isCurrentMonth: false,
                isToday: false,
                isSelected: selectedDate && date.toDateString() === selectedDate.toDateString()
            });
        }
        
        return result;
    };

    return (
        <div className="detail-course">
            <header className="detail-course-header">
                <div className="back-button">
                    <img src='/header-goback.svg' alt="back" 
                        onClick={() => navigate(`/home`)}
                    />
                </div>
                <h1 className='detail-course-header-title'>코스</h1>
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

            <section className="options-section" onClick={handleDateClick}>
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
                
                {/* <div className="option-card" onClick={() => navigate('/setparticipant')} style={{ cursor: 'pointer' }}>
                    <div className="detail-icon">
                        <img src='/detail-member.svg' alt="people" />
                    </div>
                    <div className="detail-content">
                        <h3>같이 코스 짜기</h3>
                        <p>같이 갈 사람과 공유해요</p>
                    </div>
                </div> */}
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
                                onClick={handleSaveCourseName}
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

            {isDateModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content date-modal">
                        <h2>날짜 선택</h2>
                        <div className="calendar-container">
                            <div className="custom-calendar">
                                <div className="calendar-header">
                                    <button className="prev-month" onClick={handlePrevMonth}>&lt;</button>
                                    <div className="current-month">
                                        {`${currentMonth.getFullYear()}.${String(currentMonth.getMonth() + 1).padStart(2, '0')}`}
                                    </div>
                                    <button className="next-month" onClick={handleNextMonth}>&gt;</button>
                                </div>
                                <div className="calendar-weekdays">
                                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                                        <div key={day} className="weekday">{day}</div>
                                    ))}
                                </div>
                                <div className="calendar-days">
                                    {getDaysArray(currentMonth.getFullYear(), currentMonth.getMonth()).map((dayInfo, i) => (
                                        <div 
                                            key={i}
                                            className={`calendar-day 
                                                ${dayInfo.isCurrentMonth ? 'current-month' : 'other-month'} 
                                                ${dayInfo.isToday ? 'today' : ''} 
                                                ${dayInfo.isSelected ? 'selected' : ''}`
                                            }
                                            onClick={() => dayInfo.isCurrentMonth && handleCalendarDateClick(dayInfo.date)}
                                        >
                                            {dayInfo.date.getDate()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-divider"></div>
                        <div className="modal-buttons">
                            <button 
                                className="modal-button cancel" 
                                onClick={handleCloseDateModal}
                            >
                                닫기
                            </button>
                            <button 
                                className={`modal-button save ${selectedDate ? 'active' : ''}`}
                                onClick={handleNextToTimeModal}
                                disabled={!selectedDate}
                            >
                                다음
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isTimeModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content time-modal">
                        <h2>시간 선택</h2>
                        <div className="selected-date-display">
                            <p>선택된 날짜</p>
                            <h3>{selectedDate ? selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</h3>
                        </div>
                        <div className="time-picker"
                             onTouchMove={handleTouchMove}
                             onTouchEnd={handleTouchEnd}>
                            <div 
                                className="time-column period-column" 
                                onClick={handlePeriodClick}
                                data-selected={selectedTime.period}
                            >
                                <div className="time-option am">AM</div>
                                <div className="time-option pm">PM</div>
                            </div>
                            <div className="time-column"
                                 data-type="hour"
                                 onTouchStart={(e) => handleTouchStart(e, 'hour')}>
                                <div className="time-option">
                                    {String(parseInt(selectedTime.hour) === 1 ? 12 : parseInt(selectedTime.hour) - 1).padStart(2, '0')}
                                </div>
                                <div className="time-option selected">{selectedTime.hour}</div>
                                <div className="time-option">
                                    {String(parseInt(selectedTime.hour) === 12 ? 1 : parseInt(selectedTime.hour) + 1).padStart(2, '0')}
                                </div>
                            </div>
                            <div className="time-separator">:</div>
                            <div className="time-column"
                                 data-type="minute"
                                 onTouchStart={(e) => handleTouchStart(e, 'minute')}>
                                <div className="time-option">
                                    {String(parseInt(selectedTime.minute) === 0 ? 55 : parseInt(selectedTime.minute) - 5).padStart(2, '0')}
                                </div>
                                <div className="time-option selected">{selectedTime.minute}</div>
                                <div className="time-option">
                                    {String(parseInt(selectedTime.minute) === 55 ? 0 : parseInt(selectedTime.minute) + 5).padStart(2, '0')}
                                </div>
                            </div>
                        </div>
                        <div className="modal-divider"></div>
                        <div className="modal-buttons">
                            <button 
                                className="modal-button cancel" 
                                onClick={handleCloseTimeModal}
                            >
                                닫기
                            </button>
                            <button 
                                className="modal-button save active" 
                                onClick={handleSaveTime}
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailCourse;