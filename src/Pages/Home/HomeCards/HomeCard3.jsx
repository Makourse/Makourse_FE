import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCard.css';

const HomeCard3 = ({ userData }) => {
    const navigate = useNavigate();

    const profileImage = '/HomeCard/homecard3-icon.png'; //프로필 이미지 get 연동 필요

    const socialIcon =
        userData?.social_provider === 'google' ? '/HomeCard/homecard3-google.png' :
        userData?.social_provider === 'kakao' ? '/HomeCard/homecard3-kakao.png' :
        '/HomeCard/homecard3-kakao.png'; // 기본값 (카카오)

    return (
        <div className="home-card-3">
            <img className="homecard3-img" src="/HomeCard/homecard3.png" alt="homecard3" />
            <div className="homecard3-container">
                <img className="homecard3-icon" src={profileImage} alt="profile" />
                <h1 className="homecard3-title">{userData?.name || '로딩 중...'}</h1>
                <img className="homecard3-kakao" src={socialIcon} alt="social-icon" />
                <div className="homecard3-divider"></div>
                <button className="homecard3-btn" onClick={() => navigate('/editprofile')}>
                    프로필 수정
                </button>
            </div>
        </div>
    );
};

export default HomeCard3;
