import './SetProfilePage.css';
import { useState } from 'react';

const SetProfilePage = ({ onNameChange }) => {
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
        onNameChange(e.target.value);
    }

    return (
        <div className="setProfilePage">
            <div className="setProfilePage-content">
                <div className="setProfilePage-content-title">프로필을</div>
                <div className="setProfilePage-content-title">설정해보아요.</div>
            </div>
            <div className="setProfilePage-input">
                <div className="setProfilePage-input-img"></div>
                <input className="setProfilePage-input-name" type="text" placeholder="닉네임을 입력해주세요." onChange={handleNameChange} />
            </div>
        </div>
    )
}

export default SetProfilePage;