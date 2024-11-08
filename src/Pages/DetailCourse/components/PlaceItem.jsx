const PlaceItem = ({ number, title, time, category, operatingHours, showAlternatives }) => {
    return (
        <div className='info-detail-container'>
            <div className="meeting-pin">
                <div className="pin-circle-place">
                    <span>{number.padStart(2, '0')}</span>
                </div>
                <div className={`pin-line ${showAlternatives ? 'extended' : ''}`}></div>
            </div>
            <div className="info-detail">
                <div className="time-info">{time}</div>
                <div className="place-info">
                    <div className="place-title">{title}</div>
                    <div className="place-basic-info">
                        <div className='place-tag'>{category}</div>
                        <div className='place-time'>영업시간 | {operatingHours}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceItem; 