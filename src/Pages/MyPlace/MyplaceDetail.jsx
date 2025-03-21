import './MyplaceDetail.css';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteMyPlace, updateMyPlaceContent, getMyPlaces } from "../../api";


const MyplaceDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const place = location.state; // 전달받은 place 데이터

    console.log(place); // place 데이터 확인

    
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
        if (!place) return; // place가 없으면 실행 안 함
    
        const mapOptions = {
            center: new naver.maps.LatLng(place.latitude, place.longitude),
            zoom: 15
        };
        
        const map = new naver.maps.Map('naver-map', mapOptions);
        
        // 마커를 place 위치에 설정
        new naver.maps.Marker({
            position: new naver.maps.LatLng(place.latitude, place.longitude),
            map: map
        });
    }, [place]);

    useEffect(() => {
        const fetchPlaceMemo = async () => {
            if (!place?.id) return;
            
            try {
                const response = await getMyPlaces(); 
                const placeData = response.data.find(p => p.id === place.id);
                
                if (placeData && placeData.content) {
                    setPlaceMemo(placeData.content); 
                }
            } catch (error) {
                console.error("메모 데이터를 불러오는 데 실패했습니다.", error);
            }
        };
    
        fetchPlaceMemo();
    }, [place]);

    const handleDeletePlace = async () => {
        if (!place?.id) {
            console.error("삭제할 장소 ID가 없습니다.");
            return;
        }
    
        try {
            await deleteMyPlace(place.id);
            alert("장소가 삭제되었습니다.");
            navigate("/myplace");
        } catch (error) {
            console.error("장소 삭제 실패:", error);
            alert("장소 삭제에 실패했습니다.");
        }
    };

    const handleMemo = () => {
        setIsModalOpen(true);
    };

    const handleTime = () => {
        setIsTimeModalOpen(true);
    };

    const handleTimeChange = (type, value) => {
        setSelectedTime(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const handleCloseTimeModal = () => {
        setIsTimeModalOpen(false);
    };

    const handleSaveTime = () => {
        const formattedTime = `${selectedTime.period} ${selectedTime.hour}:${selectedTime.minute}`;
        setDisplayTime(formattedTime);
        setIsTimeModalOpen(false);
    };

    const handleInputChange = (e) => {
        setPlaceMemo(e.target.value);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

const handleSaveMemo = async () => {
    if (!place?.id) {
        console.error("장소 ID가 없습니다.");
        return;
    }

    try {
        const updatedPlace = await updateMyPlaceContent(place.id, placeMemo);
        console.log("메모 저장 완료", updatedPlace);

        // API 응답이 성공하면 상태 업데이트
        setPlaceMemo(updatedPlace.content);
        setIsModalOpen(false);
    } catch (error) {
        console.error("메모 저장 실패:", error);
        alert("메모 저장에 실패했습니다.");
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
                    <img src='/header-goback.svg' alt="back" onClick={() => navigate('/myplace')}/>
                </div>
                <h1>장소 상세히 보기</h1>
            </header>   
            <div className='place-detail-map-box'>
                <div id='naver-map' style={{ width: '100%', height: '180px' }}/>
            </div> 
            <div className='place-detail-info-box'>
                <div className='place-detail-address-box'>
                    <img src='/placedetail-locate.svg' alt="address" />
                    <p>{place?.address || "주소 없음"}</p>
                </div>
                <div className='place-detail-place'>
                    <p>{place?.place_name || "장소 이름 없음"}</p>
                </div>
                <div className='place-detail-options'>
                    <div className='place-detail-memo' onClick={handleMemo}>
                        {placeMemo ? <p className='place-detail-memo-text'>메모 |</p> : <img src='/detail-plus.svg' alt="plus" />}     
                        <p className='place-detail-time-text2'>{placeMemo ? `${placeMemo}` : '메모를 작성할 수 있어요.'}</p>
                        {placeMemo ? <img src='/detail-edit.svg' alt="edit" /> : null}
                    </div>
                    {/* <div className='place-detail-time' onClick={handleTime}>
                        {displayTime ? (
                            <>
                                <p className='place-detail-time-text'>시간 |</p>
                                <p className='place-detail-time-text2'>{displayTime}</p>
                                <img src='/detail-edit.svg' alt="edit" />
                            </>
                        ) : (
                            <>
                                <img src='/detail-plus.svg' alt="plus" />
                                <p>시간을 설정할 수 있어요.</p>
                            </>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
        <div className="course-edit">
            <div className="course-edit-button" onClick={handleDeletePlace}>
                    <img src='/detail-edit2.svg' alt="edit" />
                    <span className="course-edit-button-text">장소 삭제하기</span>
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

        {/* {isTimeModalOpen && (
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
        )} */}
        </>
    );
};

export default MyplaceDetail;