import React, { useState, useEffect } from 'react';

const PlaceItem = ({ number, title, time, category, operatingHours, showAlternatives, isEditing, selectAll, onSelect }) => {
    const [isSelected, setIsSelected] = useState(false);

    // selectAll이 변경될 때만 실행
    useEffect(() => {
        if (isEditing) {
            setIsSelected(selectAll);
        }
    }, [selectAll, isEditing]);

    // 편집 모드가 끝날 때 선택 상태 초기화
    useEffect(() => {
        if (!isEditing) {
            setIsSelected(false);
        }
    }, [isEditing]);

    const handleClick = () => {
        if (isEditing) {
            const newSelected = !isSelected;
            setIsSelected(newSelected);
            onSelect(newSelected); // 클릭할 때만 onSelect 호출
        }
    };

    return (
        <div 
            className={`info-detail-container ${isEditing && isSelected ? 'selected' : ''}`} 
            onClick={handleClick}
        >
            <div className="meeting-pin">
                <div className="pin-circle-place">
                    <span>{number.padStart(2, '0')}</span>
                </div>
                <div className={`pin-line ${showAlternatives ? 'extended' : ''}`}></div>
            </div>
            <div className="info-detail">
                <div className="time-info">{`${time ? time : '시간을 설정해주세요'}`}</div>
                <div className="place-info">
                    <div className="place-title">{title}</div>
                    <div className="place-basic-info">
                        <div className='place-tag'>{category}</div>
                        <div className='place-time'>{operatingHours}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceItem; 