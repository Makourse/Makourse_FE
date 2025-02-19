import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';
import alarmIcon from '../../assets/home/alarm.svg';
import profilePic from '../../assets/home/profile1.svg';
import loginIcon from '../../assets/home/login.svg';
import { getUserData, getProfileImage } from '../../api'; // API 호출 추가
import HomeCard1 from './HomeCards/HomeCard1';
import HomeCard2 from './HomeCards/HomeCard2';
import HomeCard3 from './HomeCards/HomeCard3';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태 추가
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

          // 프로필 이미지 가져오기
          const profileImgUrl = await getProfileImage(accessToken);
          if (profileImgUrl) setProfileImage(profileImgUrl);

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

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="app-name">makourse</h1>
        <img src={alarmIcon} alt="Alarm" className="alarm-icon" onClick={() => navigate('/alarm')} />
        <img 
          src={profileImage || profilePic} // 프로필 이미지 있으면 사용, 없으면 기본 이미지
          alt="Profile" 
          className="profile-icon" 
        />
      </header>

      <div className="scrollable-section">
        <HomeCard2 />
        <HomeCard1 />
        <HomeCard3 userData={userData} />
      </div>

      {/* 다가오는 일정 */}
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
