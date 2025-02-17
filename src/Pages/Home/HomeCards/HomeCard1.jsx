import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCard.css';

const HomeCard1 = () => {

    const navigate = useNavigate();

    return (
        <div className="home-card-1" onClick={() => navigate('/myplace')} style={{ cursor: 'pointer' }}>
            <img className="homecard1-img" src="/HomeCard/homecard1.png" alt="homecard1" />
            <img className="homecard1-icon" src="/HomeCard/homecard1-icon.png" alt="homecard1-icon" />
            <h1 className="home-card-1-title">나만의 장소</h1>
            <p className="home-card-1-text">가보고 싶었던 장소를</p>
            <p className="home-card-1-text">저장할 수 있어요!</p>
        </div>
    )
}

export default HomeCard1;