import './DetailCourse.css';
import { useState } from 'react';
import MeetingPlace from './components/MeetingPlace';
import PlaceItem from './components/PlaceItem';
import PlaceReplace from './components/PlaceReplace';
import PlaceGroup from './components/PlaceGroup';
import AddPlaceGuide from './components/AddPlaceGuide';

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
            time: "PM 2시 00분",
            title: "연남동 식당",
            category: "식당",
            operatingHours: "11:00~21:00"
        },
        alternativePlaces: []
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
                
                <MeetingPlace 
                    time="PM 12시 30분"
                    title="홍대입구역 2번 출구"
                    address="서울시 마포구 양화로 100 홍대입구역"
                />
                
                <PlaceGroup {...place1} />
                <PlaceGroup {...place2} />
                
                <AddPlaceGuide />
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