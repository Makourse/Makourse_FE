import './HomeCard.css';

const HomeCard3 = () => {
    return (
        <div className="home-card-3">
            <img className="homecard3-img" src="/HomeCard/homecard3.png" alt="homecard3" />
            <div className="homecard3-container">
                <img className="homecard3-icon" src="/HomeCard/homecard3-icon.png" alt="homecard3-icon" />
                <h1 className="homecard3-title">김민수</h1>
                <img className="homecard3-icon2" src="/HomeCard/homecard3-icon2.png" alt="homecard3-icon2" />
                <div className="homecard3-divider"></div>
                <p className="homecard3-text">프로필 수정</p>
            </div>
        </div>
    )
}

export default HomeCard3;