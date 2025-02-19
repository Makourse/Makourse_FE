import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCard.css';

const HomeCard3 = ({ userData }) => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const image = localStorage.getItem('profileImage');
        console.log('Profile image loaded:', image); // 이미지 확인 로그
        if (image) {
            setProfileImage(image);
        }
    }, []);

    return (
        <div className="home-card-3">
            <img className="homecard3-img" src="/HomeCard/homecard3.png" alt="homecard3" />
            <div className="homecard3-container">
                <img className="homecard3-icon" src={profileImage || '/HomeCard/homecard3-icon.png'} alt="homecard3-icon" />
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
