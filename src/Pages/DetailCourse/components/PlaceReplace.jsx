const PlaceReplace = ({ isAdd = false, alternativeCount = 0, onClick, isOpen }) => {
    return (
        <div className='place-replace' onClick={onClick} style={{ cursor: 'pointer' }}>
            <img 
                src={isAdd ? '/detail-plus.svg' : '/detail-replace.svg'} 
                alt="replace" 
                style={{ 
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                }}
            />
            <div>{isAdd ? '대안 장소를 추가해 보세요.' : '대안 장소 |'}</div>
            {!isAdd && <div className='place-replace-cnt'>{alternativeCount}개의 대안 장소가 있어요</div>}
        </div>
    );
};

export default PlaceReplace; 