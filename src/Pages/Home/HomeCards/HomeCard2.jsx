import './HomeCard.css';

const HomeCard2 = () => {
    return (
        <div className="home-card-2">
            <img className="homecard2-img" src="/HomeCard/homecard2.png" alt="homecard2" />
            <div className="homecard2-container">
                <img className="homecard2-icon" src="/HomeCard/homecard2-icon.png" alt="homecard2-icon" />
                <h1 className="home-card-2-title">등록된 코스</h1>
                <p className="home-card-2-text">이미 다녀온 코스도</p>
                <p className="home-card-2-text">다시 볼 수 있어요.</p>
            </div>
        </div>
    )
}

export default HomeCard2;