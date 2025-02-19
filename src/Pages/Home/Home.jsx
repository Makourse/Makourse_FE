import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import alarmIcon from '../../assets/home/alarm.svg';
import { getUserData, getUserProfile } from '../../api'; 
import HomeCard1 from './HomeCards/HomeCard1';
import HomeCard2 from './HomeCards/HomeCard2';
import HomeCard3 from './HomeCards/HomeCard3';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData();
        if (response) {
          console.log('사용자 데이터 응답:', response);
          setUserData(response.user);
          setSchedules(response.schedules || []);
        }

        const profileResponse = await getUserProfile();
        console.log('프로필 이미지 응답:', profileResponse);

        if (profileResponse?.profile_image) {
          setUserData(prev => ({
            ...prev,
            profile_image: profileResponse.profile_image
          }));
          console.log('프로필 이미지 상태 업데이트:', profileResponse.profile_image);
        } else {
          console.warn('⚠️ 프로필 이미지 값이 null이거나 없음');
        }
      } catch (error) {
        console.error('❌ 사용자 데이터 가져오기 실패:', error);
      }
    };

    fetchUserData();
  }, []);

  // 프로필 수정 후 Home으로 돌아왔을 때 반영
  useEffect(() => {
    if (location.state?.profileImage) {
      console.log('✅ 프로필 수정 후 새로운 이미지 적용:', location.state.profileImage);
      setUserData(prev => ({
        ...prev,
        profile_image: location.state.profileImage
      }));
    }
  }, [location.state?.profileImage]);

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