import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';
import alarmIcon from '../../assets/home/alarm.svg';
import frame0 from '../../assets/home/Frame0.svg';
import frame1 from '../../assets/home/Frame1.svg';
import frame2 from '../../assets/home/Frame2.svg';
import profilePic from '../../assets/home/profile1.svg';
import starIcon from '../../assets/home/star.svg';
import loginIcon from '../../assets/home/login.svg';
import { getUserData } from '../../api';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || '김민수'; // 기본값으로 김민수
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      console.log(data);
      setUserData(data);
    };
    fetchUserData();
  }, []);

  const handleFrame0Click = () => {
    navigate('/check-course');
  };

  const handleFrame1Click = () => {
    navigate('/myplace');
  };

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const d = new Date(date);
    const day = days[d.getDay()];
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}(${day})`;
  };

  // D-Day 계산
  const calculateDday = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    const difference = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    return difference > 0 ? `D-${difference}` : 'D-Day';
  };

  // 오늘 날짜 확인
  const isTodayOrLater = (date) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const targetDate = new Date(date).setHours(0, 0, 0, 0);
    return targetDate >= today;
  };

  // 임시 데이터
  const courseData = [
    { title: '코스 이름0', date: '2025-01-05', people: '김민수 외 2명' },
    { title: '코스 이름1', date: '2025-01-20', people: '김민수 외 2명' },
    { title: '코스 이름2', date: '2025-01-30', people: '김민수 외 2명' },
  ]
    .filter((course) => isTodayOrLater(course.date)) // 오늘 이후 날짜만 필터링
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="app-name">makourse</h1>
        <img
          src={alarmIcon}
          alt="Alarm"
          className="alarm-icon"
          onClick={() => navigate('/alarm', { state: { userName } })}
        />
      </header>

      <div className="scrollable-section">
        <img
          src={frame0}
          alt="Frame 0"
          className="frame0"
          onClick={handleFrame0Click}
        />
        <img
          src={frame1}
          alt="Frame 1"
          className="frame1"
          onClick={handleFrame1Click}
        />
        <div
          className="profile-section"
          style={{ backgroundImage: `url(${frame2})` }}
        >
          <img src={profilePic} alt="Profile" className="profile-image" />
          <h3 className="profile-name">{userName}</h3>
          <img src={loginIcon} alt="Login Icon" className="login-icon" />
          <div className="divider"></div>
          <button
            className="edit-profile-btn"
            onClick={() => navigate('/editprofile', { state: { userName } })}
          >
            프로필 수정하기
          </button>
        </div>
      </div>

      {courseData.length > 0 && (
        <div className="upcoming-section">
          <h2 className="upcoming-title">다가오는 일정</h2>
          <div className="upcoming-list">
            {courseData.map((course, index) => {
              const dday = calculateDday(course.date);
              return (
                <div className="course-box" key={index}>
                  <div className="dday-box">{dday}</div>
                  <div className="course-title">{course.title}</div>
                  <div className="course-people">{course.people}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {courseData.length === 0 && (
        <div className="register-section">
          <img src={starIcon} alt="Star Icon" className="star-icon" />
          <p className="register-text">코스를 등록해보세요!</p>
        </div>
      )}

      <button
        className="register-course-btn"
        onClick={() => navigate('/myplace')}
      >
        코스 등록하기
      </button>
    </div>
  );
};

export default Home;
