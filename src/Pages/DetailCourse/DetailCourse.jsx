import './DetailCourse.css';
import { useState } from 'react';

const DetailCourse = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseName, setCourseName] = useState('');

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
                    <h3>2024년 09월 26일 생성된...</h3>
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
                    <div className="content">
                        <h3>일정 저장</h3>
                        <p>날짜와 시간이 저장돼요</p>
                    </div>
                </div>
                
                <div className="option-card">
                    <div className="detail-icon">
                        <img src='/detail-member.svg' alt="people" />
                    </div>
                    <div className="content">
                        <h3>같이 코스 짜기</h3>
                        <p>같이 갈 사람과 공유해요</p>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <div className="info-item">
                    <div className="icon-circle">
                        <img src='/detail-cir-meeting.svg' alt="meeting" />
                    </div>
                    <div className="info-content">
                        <h3>어디서 만날 건가요?</h3>
                        <p>같이 만나서 이동하기 편한 장소를 선택해 보세요</p>
                    </div>
                </div>

                <div className='info-detail-container'>
                    <div className="meeting-pin">
                        <div className="pin-circle-meeting">
                            <span>만날<br/>장소</span>
                        </div>
                        <div className="pin-line"></div>
                    </div>
                    <div className="info-detail">
                        <div className="time-info">PM 12시 30분</div>
                        <div className="place-info">
                            <div className="place-title">홍대입구역 2번 출구</div>
                            <div className="place-address">서울시 마포구 양화로 100 홍대입구역</div>
                        </div>
                    </div>
                </div>
                <div className='info-detail-container'>
                    <div className="meeting-pin">
                        <div className="pin-circle-place">
                            <span>01</span>
                        </div>
                        <div className="pin-line"></div>
                    </div>
                        <div className="info-detail">
                            <div className="time-info">PM 12시 30분</div>
                            <div className="place-info">
                                <div className="place-title">홍대 카페</div>
                                <div className="place-basic-info">
                                    <div className='place-tag'>카페</div>
                                    <div className='place-time'>영업시간 | 11:30~21:00</div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className='place-replace'>
                    <img src='/detail-replace.svg' alt="replace" />
                    <div>대안 장소 |</div> 
                    <div className='place-replace-cnt'>N개의 대안 장소가 있어요</div> 
                </div>
                <div className='info-detail-container'>
                    <div className="meeting-pin">
                        <div className="pin-circle-place">
                            <span>02</span>
                        </div>
                        <div className="pin-line"></div>
                    </div>
                        <div className="info-detail">
                            <div className="time-info">PM 12시 30분</div>
                            <div className="place-info">
                                <div className="place-title">홍대 카페</div>
                                <div className="place-basic-info">
                                    <div className='place-tag'>카페</div>
                                    <div className='place-time'>영업시간 | 11:30~21:00</div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className='place-replace'>
                    <img src='/detail-plus.svg' alt="replace" />
                    <div>대안 장소를 추가해 보세요.</div> 
                </div>
                <div className="info-item place">
                    <div className="icon-circle">
                        <img src='/detail-cir-togo.svg' alt="place" />
                    </div>
                    <div className="info-content">
                        <h3>어디를 갈 건가요?</h3>
                        <p>장소를 등록해보세요.</p>
                    </div>
                </div>
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
                                className="modal-button" 
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
        </div>
    );
};

export default DetailCourse;