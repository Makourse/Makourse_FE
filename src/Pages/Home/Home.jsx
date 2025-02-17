import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';
import alarmIcon from '../../assets/home/alarm.svg';
import profilePic from '../../assets/home/profile1.svg';
import loginIcon from '../../assets/home/login.svg';
import { getUserData } from '../../api';
import HomeCard1 from './HomeCards/HomeCard1';
import HomeCard2 from './HomeCards/HomeCard2';
import HomeCard3 from './HomeCards/HomeCard3';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [groupMembers, setGroupMembers] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await getUserData(accessToken);
        if (response) {
          setUserData(response.user);
          setSchedules(response.schedules);

          response.schedules.forEach(schedule => {
            fetchGroupMembers(schedule.id);
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchGroupMembers = async (scheduleId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`/account/schedules/${scheduleId}/group`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch group data');
      const data = await response.json();
      setGroupMembers(prev => ({ ...prev, [scheduleId]: data.memberships.length - 1 }));
    } catch (error) {
      console.error(`Error fetching group data for schedule ${scheduleId}:`, error);
    }
  };

  const formatDate = (dateString) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString);
    const day = days[date.getDay()];
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${day})`;
  };

  const calculateDday = (dateString) => {
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
        <HomeCard2 />
        <HomeCard1 />
        <HomeCard3 userData={userData} />
      </div>

      {schedules.length > 0 && (
        <div className="upcoming-section">
          <h2 className="upcoming-title">다가오는 일정</h2>
          <div className="upcoming-list">
            {schedules.map((schedule) => (
              <div className="course-box" key={schedule.id}>
                <div className="dday-box">{calculateDday(schedule.meet_date_first)}</div>
                <div className="course-title">{schedule.course_name}</div>
                <div className="course-people">
                  {userData?.name} 외 {groupMembers[schedule.id] !== undefined ? `${groupMembers[schedule.id]}명` : '?명'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {schedules.length === 0 && (
        <div className="register-section">
          <img src="/homestar.png" alt="homestar" className='star-icon'/>
        </div>
      )}

      <button className="register-course-btn" onClick={() => navigate('/myplace')}>
        코스 등록하기
      </button>
    </div>
  );
};

export default Home;
