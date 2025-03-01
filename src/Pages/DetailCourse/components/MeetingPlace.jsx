import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const MeetingPlace = ({ time, title, address, isEditing, selectAll, onSelect }) => {
    // const [isSelected, setIsSelected] = useState(false);
    const { scheduleId } = useParams();
    const navigate = useNavigate();
    // // selectAll이 변경될 때만 실행
    // useEffect(() => {
    //     if (isEditing) {
    //         setIsSelected(selectAll);
    //     }
    // }, [selectAll, isEditing]);

    // // 편집 모드가 끝날 때 선택 상태 초기화
    // useEffect(() => {
    //     if (!isEditing) {
    //         setIsSelected(false);
    //     }
    // }, [isEditing]);

    // const handleClick = () => {
    //     if (isEditing) {
    //         const newSelected = !isSelected;
    //         setIsSelected(newSelected);
    //         onSelect(newSelected); // 클릭할 때만 onSelect 호출
    //     }
    // };

    const clickToFstPlace = () => {
        navigate(`/setfirst/save`, {
            state: { scheduleId: scheduleId }  
        });
    };

    if (!time && !title && !address) {
        return (
            <div className="info-item" onClick={clickToFstPlace}>
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
        <div 
            className={`info-detail-container`} 
            // onClick={handleClick}
        >
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