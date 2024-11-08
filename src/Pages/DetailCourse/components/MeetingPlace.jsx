const MeetingPlace = ({ time, title, address }) => {
    if (!time && !title && !address) {
        return (
            <div className="info-item">
                <div className="icon-circle">
                    <img src='/detail-cir-meeting.svg' alt="meeting" />
                </div>
                <div className="info-content">
                    <h3>어디서 만날 건가요?</h3>
                    <p>같이 만나서 이동하기 편한 장소를 선택해 보세요</p>
                </div>
            </div>
        );
    }

    return (
        <div className='info-detail-container'>
            <div className="meeting-pin">
                <div className="pin-circle-meeting">
                    <span>만날<br/>장소</span>
                </div>
                <div className="pin-line"></div>
            </div>
            <div className="info-detail">
                <div className="time-info">{time}</div>
                <div className="place-info">
                    <div className="place-title">{title}</div>
                    <div className="place-address">{address}</div>
                </div>
            </div>
        </div>
    );
};

export default MeetingPlace; 