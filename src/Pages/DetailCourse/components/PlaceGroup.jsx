import { useState, useEffect } from 'react';
import PlaceItem from './PlaceItem';
import { getPlaceDetail, getAlternativePlaces } from '../../../api';
import { useNavigate } from 'react-router-dom';
import '../styles/PlaceGroup.css';

const PlaceGroup = ({ place_pk, place_number, place_name, isEditing, selectAll, onSelect }) => {
    const [showAlternatives, setShowAlternatives] = useState(false);
    const [placeDetail, setPlaceDetail] = useState(null);
    const [alternativePlaces, setAlternativePlaces] = useState([]);
    const navigate = useNavigate();
    const handleToggleAlternatives = () => {
        setShowAlternatives(!showAlternatives);
    };

    useEffect(() => {
        const fetchPlaceDetail = async () => {
            const placeDetail = await getPlaceDetail(place_pk);
            setPlaceDetail(placeDetail);
        };
        fetchPlaceDetail();
    }, [place_pk]);

    useEffect(() => {
        const fetchAlternativePlaces = async () => {
            const alternativePlaces = await getAlternativePlaces(place_pk);
            setAlternativePlaces(alternativePlaces);
        };
        fetchAlternativePlaces();
    }, [place_pk]);

    return (
        <div className="place-group">
            <PlaceItem 
                number={place_number}
                name={placeDetail?.entry_name}
                time={placeDetail?.time}
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