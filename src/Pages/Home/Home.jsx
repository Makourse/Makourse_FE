import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';
import alarmIcon from '../../assets/home/alarm.svg';
import frame0 from '../../assets/home/Frame0.svg';
import frame1 from '../../assets/home/Frame1.svg';
import frame2 from '../../assets/home/Frame2.svg';
import profilePic from '../../assets/home/profile1.svg';
import starIcon from '../../assets/home/star.svg';
import loginIcon from '../../assets/home/login.png';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.userName || '김민수'; // 기본값으로 김민수
  const handleFrame0Click = () => {
    navigate('/check-course');
  };

  const handleFrame1Click = () => {
    navigate('/myplace');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="app-name">makourse</h1>
        <img src={alarmIcon} alt="Alarm" className="alarm-icon" onClick={() => navigate('/editprofile', { state: { userName } })} />
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
        <div className="profile-section" style={{ backgroundImage: `url(${frame2})` }}>
          <img src={profilePic} alt="Profile" className="profile-image" />
          <h3 className="profile-name">{userName}</h3>
          <img src={loginIcon} alt="Login Icon" className="login-icon" />
          <div className="divider"></div>
          <button className="edit-profile-btn" onClick={() => navigate('/editprofile', { state: { userName } })}>프로필 수정하기</button>
        </div>
      </div>

      <div className="register-section">
        <img src={starIcon} alt="Star Icon" className="star-icon" />
        <p className="register-text">코스를 등록해보세요!</p>
        <button
          className="register-course-btn"
          onClick={() => navigate('/myplace')}
        >
          코스 등록하기
        </button>
      </div>
    </div>
  );
};

export default Home;
