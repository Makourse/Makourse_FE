import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCard.css';

const HomeCard3 = ({ userData }) => {
    const navigate = useNavigate();

    return (
        <div className="home-card-3">
            <img className="homecard3-img" src="/HomeCard/homecard3.png" alt="homecard3" />
            <div className="homecard3-container">
                <img className="homecard3-icon" src="/HomeCard/homecard3-icon.png" alt="homecard3-icon" />
                <h1 className="homecard3-title">{userData ? userData.name : '로딩 중...'}</h1>
                <img className="homecard3-icon2" src="/HomeCard/homecard3-icon2.png" alt="homecard3-icon2" />
                <div className="homecard3-divider"></div>
                <button className="homecard3-btn" onClick={() => navigate('/editprofile')}>
                    프로필 수정
                </button>
            </div>
        </div>
    );
}

export default HomeCard3;
