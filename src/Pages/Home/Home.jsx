import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import alarmIcon from '../../assets/home/alarm.svg';
import { getUserData } from '../../api'; 
import HomeCard1 from './HomeCards/HomeCard1';
import HomeCard2 from './HomeCards/HomeCard2';
import HomeCard3 from './HomeCards/HomeCard3';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response) {
          setUserData(response.user);
          setSchedules(response.schedules || []); // 스케줄 없으면 빈 배열로 설정
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '날짜 미정';
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString);
    const day = days[date.getDay()];
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${day})`;
  };

  const calculateDday = (dateString) => {
    if (!dateString) return 'D-?';
    const today = new Date();
    const targetDate = new Date(dateString);
    const difference = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    return difference > 0 ? `D-${difference}` : 'D-Day';
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="app-name">makourse</h1>
        <img src={alarmIcon} alt="Alarm" className="alarm-icon" onClick={() => navigate('/alarm')} />
      </header>

      <div className="scrollable-section">
        {schedules.length > 0 && <HomeCard2 />}
        <HomeCard1 />
        <HomeCard3 userData={userData} />
      </div>

      {schedules.length > 0 ? (
        <div className="upcoming-section">
          <h2 className="upcoming-title">다가오는 일정</h2>
          <div className="upcoming-list">
            {schedules.map((schedule) => (
              <div className="course-box" key={schedule.id}>
                <div className="dday-box">{calculateDday(schedule.meet_date_first)}</div>
                <div className="course-title">{schedule.course_name || '코스 이름 없음'}</div>
                <div className="course-people">
                  {userData?.name} 외 {schedule.group - 1}명
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="register-section">
          <img src="/homestar.png" alt="homestar" className='star-icon'/>
        </div>
      )}

      <button className="register-course-btn" onClick={() => navigate('/meetingdate')}>
        코스 등록하기
      </button>
    </div>
  );
};

export default Home;
