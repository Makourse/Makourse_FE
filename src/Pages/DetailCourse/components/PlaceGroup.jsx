import { useState, useEffect } from 'react';
import PlaceItem from './PlaceItem';
import { getPlaceDetail } from '../../../api';
import { useNavigate } from 'react-router-dom';
import '../styles/PlaceGroup.css';

const PlaceGroup = ({ place_pk, place_number, place_name, isEditing, selectAll, onSelect }) => {
    const [showAlternatives, setShowAlternatives] = useState(false);
    const [placeDetail, setPlaceDetail] = useState(null);
    const [formattedTime, setFormattedTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaceDetail = async () => {
            const placeDetail = await getPlaceDetail(place_pk);
            setPlaceDetail(placeDetail);
            
            // time 값이 있으면 AM/PM 형식으로 변환
            if (placeDetail?.time) {
                const [hours, minutes] = placeDetail.time.split(':');
                const hour = parseInt(hours);
                let period = 'AM';
                let hour12 = hour;
                
                if (hour >= 12) {
                    period = 'PM';
                    hour12 = hour === 12 ? 12 : hour - 12;
                }
                if (hour === 0) {
                    hour12 = 12;
                }
                
                const timeString = `${period} ${String(hour12).padStart(2, '0')}시 ${minutes}분`;
                setFormattedTime(timeString);
            }
        };
        fetchPlaceDetail();
    }, [place_pk]);

    return (
        <div className="place-group">
            <PlaceItem 
                number={place_number}
                name={placeDetail?.entry_name}
                time={formattedTime}
                category={placeDetail?.category}
                address={placeDetail?.address}
                showAlternatives={showAlternatives}
                isEditing={isEditing}
                selectAll={selectAll}
                onSelect={onSelect}
                onClick={() => navigate(`/place-detail`, { state: placeDetail })}
            />
            
            {/* {alternativePlaces.length > 0 ? (
                <>
                    <PlaceReplace 
                        alternativeCount={alternativePlaces.length} 
                        onClick={handleToggleAlternatives}
                        isOpen={showAlternatives}
                    />
                    {showAlternatives && (
                        <div className="alternative-container">
                            <div className="alternative-places-wrapper">
                                {alternativePlaces.map((place, index) => (
                                    <div className="alternative-places" key={index}>
                                        <div className="alternative-place">
                                            <span>{place.name}</span>
                                            <div className="tag-selected">{place.category}</div>
                                        </div>
                                        <button className="alternative-change-button">이 장소로 변경</button>
                                    </div>
                                ))}
                                <div className="alternative-add">
                                    <img src='/replace-cir.svg' alt="plus" />
                                    <span className='alternative-add-text'>대안 장소를 <br/>추가해 보세요!</span>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <PlaceReplace isAdd={true} />
            )} */}
        </div>
    );
};

export default PlaceGroup; 