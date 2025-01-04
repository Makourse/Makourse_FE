import { useNavigate } from 'react-router-dom';
import './EditCourse.css';
import MeetingPlace from '../DetailCourse/components/MeetingPlace';
import PlaceGroup from '../DetailCourse/components/PlaceGroup';

const EditCourse = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
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
        <div className="edit-course">
            <header className="edit-course-header">
                <div className="back-button" onClick={handleGoBack}>
                    <img src='/header-goback.svg' alt="back" />
                </div>
                <h1>코스 수정하기</h1>
            </header>
        
        <div className='edit-select'>
            <div className='edit-select-all'>
                <img src='/edit-check-all.svg' alt='check-all' />
                <span>전체 선택</span>
            </div>
            <div className='edit-end'>
                <span>완료</span>
            </div>
        </div>
        <MeetingPlace 
                    time="PM 12시 30분"
                    title="홍대입구역 2번 출구"
                    address="서울시 마포구 양화로 100 홍대입구역"
                />
                
                <PlaceGroup {...place1} />
                <PlaceGroup {...place2} />
            

        </div>
    );
};

export default EditCourse; 