import { useNavigate, useParams } from 'react-router-dom';

const AddPlaceGuide = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/setplace/save', {
            state: { scheduleId: scheduleId }
        });
    };
    return (
        <div className="info-item add" onClick={handleClick}>
            <div className="icon-circle">
                <img src='/detail-cir-togo.svg' alt="place" />
            </div>
            <div className="info-content">
                <h3>어디를 갈 건가요?</h3>
                <p>장소를 선택하고 일정을 만들어보세요</p>
            </div>
        </div>
    );
};

export default AddPlaceGuide; 