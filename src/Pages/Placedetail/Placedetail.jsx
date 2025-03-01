import './Placedetail.css';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateEntries,getPlaceDetail } from '../../api';

const Placedetail = () => {
    const location = useLocation();
    const placeId = location.state?.id; // 전달받은 place의 id만 가져오기
    const schedule = location.state?.schedule;

    const navigate = useNavigate();
    
    const [placeDetails, setPlaceDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
    const [placeMemo, setPlaceMemo] = useState('');
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
    const [displayTime, setDisplayTime] = useState('');

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            if (!placeId) return;
            
            try {
                const details = await getPlaceDetail(placeId);
                setPlaceDetails(details);
                console.log('장소 세부 정보:', details);
                
                // content가 null이 아니면 메모로 설정
                if (details.content) {
                    setPlaceMemo(details.content);
                }
                
                // time 값이 있으면 AM/PM 형식으로 변환하여 displayTime에 설정
                if (details.time) {
                    const [hours, minutes] = details.time.split(':');
                    const hour = parseInt(hours);
                    let period = 'AM';
                    let hour12 = hour;
                    
                    if (hour >= 12) {
                        period = 'PM';
                        hour12 = hour === 12 ? 12 : hour - 12;
                    }
                    if (hour === 0) {
                        hour12 = 12;
                    }
                    
                    const formattedTime = `${period} ${String(hour12).padStart(2, '0')}:${minutes}`;
                    setDisplayTime(formattedTime);
                    
                    // selectedTime도 함께 업데이트
                    setSelectedTime({
                        period: period,
                        hour: String(hour12).padStart(2, '0'),
                        minute: minutes
                    });
                }
            } catch (error) {
                console.error('장소 세부 정보 가져오기 실패:', error);
            }
        };
        
        fetchPlaceDetails();
    }, [placeId]);

    useEffect(() => {
        if (!placeDetails) return; // placeDetails가 없으면 실행 안 함
    
        const mapOptions = {
            center: new naver.maps.LatLng(placeDetails.latitude, placeDetails.longitude),
            zoom: 15
        };
        
        const map = new naver.maps.Map('naver-map', mapOptions);
        
        // 마커를 place 위치에 설정
        new naver.maps.Marker({
            position: new naver.maps.LatLng(placeDetails.latitude, placeDetails.longitude),
            map: map
        });
    }, [placeDetails]);

    const handleMemo = () => {
        setIsModalOpen(true);
    };

    const handleTime = () => {
        setIsTimeModalOpen(true);
    };

    // const handleTimeChange = (type, value) => {
    //     setSelectedTime(prev => ({
    //         ...prev,
    //         [type]: value
    //     }));
    // };

    const handleCloseTimeModal = () => {
        setIsTimeModalOpen(false);
    };

    const handleSaveTime = async () => {
        const formattedTime = `${selectedTime.period} ${selectedTime.hour}:${selectedTime.minute}`;
        
        // 24시간 형식으로 변환
        let hour24 = parseInt(selectedTime.hour);
        if (selectedTime.period === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (selectedTime.period === 'AM' && hour24 === 12) {
            hour24 = 0;
        }
        
        const formattedTime2 = `${String(hour24).padStart(2, '0')}:${selectedTime.minute}:00`;
        
        setDisplayTime(formattedTime);
        setIsTimeModalOpen(false);
        
        try {
            // placeId를 사용하여 해당 장소 항목 업데이트
            const entryData = {
                time: formattedTime2
            };
            
            await updateEntries(placeId, entryData);
            console.log('시간이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('시간 저장 중 오류 발생:', error);
            // 오류 처리 로직 추가 가능
        }
    };

    const handleInputChange = (e) => {
        setPlaceMemo(e.target.value);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSaveMemo = async () => {
        try {
            // placeId를 사용하여 해당 장소 항목 업데이트
            const entryData = {
                content: placeMemo
            };
            
            await updateEntries(placeId, entryData);
            console.log('메모가 성공적으로 저장되었습니다.');
            setIsModalOpen(false);
        } catch (error) {
            console.error('메모 저장 중 오류 발생:', error);
            // 오류 처리 로직 추가 가능
        }
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
                    newValue = parseInt(prev.minute) + (increment ? 1 : -1);
                    if (newValue > 59) newValue = 0;
                    if (newValue < 0) newValue = 59;
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

    // 컴포넌트가 언마운트될 때 클래스 제거
    useEffect(() => {
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    return (
        <>
        <div className="place-detail">
            <header className="place-detail-header">
                <div className="back-button">
                    <img src='/header-goback.svg' alt="back" onClick={() => navigate(`/detail-course/${schedule}`)} />
                </div>
                <h1>장소 상세히 보기</h1>
            </header>   
            <div className='place-detail-map-box'>
                <div id='naver-map' style={{ width: '100%', height: '180px' }}/>
            </div> 
            <div className='place-detail-info-box'>
                <div className='place-detail-address-box'>
                    <img src='/placedetail-locate.svg' alt="address" />
                    <p>{placeDetails?.address || "주소 없음"}</p>
                </div>
                <div className='place-detail-place'>
                    <p>{placeDetails?.entry_name || "장소 이름 없음"}</p>
                </div>
                <div className='place-detail-options'>
                    <div className='place-detail-memo' onClick={handleMemo}>
                        {placeMemo ? <p className='place-detail-memo-text'>메모 |</p> : <img src='/detail-plus.svg' alt="plus" />}     
                        <p className='place-detail-time-text_2'>{placeMemo ? `${placeMemo}` : '메모를 작성할 수 있어요.'}</p>
                        {placeMemo ? <img src='/detail-edit.svg' alt="edit" /> : null}
                    </div>
                    <div className='place-detail-time' onClick={handleTime}>
                        {displayTime ? (
                            <>
                                <p className='place-detail-time-text'>시간 |</p>
                                <p className='place-detail-time-text_2'>{displayTime}</p>
                                <img src='/detail-edit.svg' alt="edit" />
                            </>
                        ) : (
                            <>
                                <img src='/detail-plus.svg' alt="plus" />
                                <p className='place-detail-time-text_2'>시간을 설정할 수 있어요.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="course-edit">
            <div className="course-edit-button" onClick={() => navigate(`/place-edit`, { state: { id: placeId, schedule: schedule } })}>
                    <img src='/detail-edit2.svg' alt="edit" />
                    <span className="course-edit-button-text">장소 수정하기</span>
                </div>
            </div>
        
        {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>메모 작성</h2>
                    <input 
                        type="text" 
                        className="modal-input"
                        placeholder="메모를 입력해주세요."
                        value={placeMemo}
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
                            className={`modal-button save ${placeMemo ? 'active' : ''}`}
                            onClick={handleSaveMemo}
                        >
                            저장하기
                        </button>
                    </div>
                </div>
            </div>
        )}

        {isTimeModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content time-modal">
                    <h2>시간 설정</h2>
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
                                {String(parseInt(selectedTime.minute) === 0 ? 59 : parseInt(selectedTime.minute) - 1).padStart(2, '0')}
                            </div>
                            <div className="time-option selected">{selectedTime.minute}</div>
                            <div className="time-option">
                                {String(parseInt(selectedTime.minute) === 59 ? 0 : parseInt(selectedTime.minute) + 1).padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                    <div className="modal-divider"></div>
                    <div className="modal-buttons">
                        <button className="modal-button cancel" onClick={handleCloseTimeModal}>
                            닫기
                        </button>
                        <button className="modal-button save active" onClick={handleSaveTime}>
                            저장하기
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Placedetail;