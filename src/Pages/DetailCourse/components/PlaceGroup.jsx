import { useState } from 'react';
import PlaceItem from './PlaceItem';
import PlaceReplace from './PlaceReplace';
import '../styles/PlaceGroup.css';

const PlaceGroup = ({ mainPlace, alternativePlaces = [], isEditing, selectAll, onSelect }) => {
    const [showAlternatives, setShowAlternatives] = useState(false);

    const handleToggleAlternatives = () => {
        setShowAlternatives(!showAlternatives);
    };

    return (
        <div className="place-group">
            <PlaceItem 
                {...mainPlace}
                showAlternatives={showAlternatives}
                isEditing={isEditing}
                selectAll={selectAll}
                onSelect={onSelect}
            />
            
            {alternativePlaces.length > 0 ? (
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
                                            <span>{place.title}</span>
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
            )}
        </div>
    );
};

export default PlaceGroup; 