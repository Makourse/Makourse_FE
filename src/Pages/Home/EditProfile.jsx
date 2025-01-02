import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditProfile.css';
import backIcon from '../../assets/home/back.svg';
import profilePic from '../../assets/home/profile1.svg';
import profileEditIcon from '../../assets/home/profile_edit.svg';
import cancelIcon from '../../assets/home/cancel.svg'; // 취소 버튼 아이콘 추가

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialName = location.state?.userName || ''; // Home에서 넘어온 userName을 가져옴

  const [name, setName] = useState(initialName);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleNext = () => {
    if (name.trim()) {
      navigate('/home', { state: { userName: name } });
    }
  };

  const handleCancel = () => {
    setName(''); // 취소 버튼 클릭 시 이름 입력 필드 지우기
  };

  return (
    <div className="edit-profile-container">
      {/* Header */}
      <header className="edit-profile-header">
        <img
          src={backIcon}
          alt="Back"
          className="back-icon"
          onClick={() => navigate('/home')}
        />
        <h1 className="header-title">프로필 수정</h1>
      </header>

      {/* Main Content */}
      <div className="edit-profile-content">
        <p className="edit-instruction">프로필을 <br /> 수정해 보아요.</p>
        <div className="profile-picture-container">
          <img
            src={profilePic}
            alt="Profile"
            className="profile-picture"
          />
          <img
            src={profileEditIcon}
            alt="Edit Profile"
            className="profile-edit-icon"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={handleChange}
            className="name-input"
            autoFocus
          />
          {name && (
            <img
              src={cancelIcon}
              alt="Cancel"
              className="cancel-button"
              onClick={handleCancel} // 취소 버튼 클릭 시 이름 지우기
            />
          )}
        </div>
      </div>

      {/* Next Button */}
      <button
        className="next-button"
        onClick={handleNext}
        disabled={!name.trim()}
        style={{
          backgroundColor: name.trim() ? '#D6EBFF' : '#F1F1F1',
          color: name.trim() ? '#376FA3' : '#666666',
        }}
      >
        다음
      </button>
    </div>
  );
};

export default EditProfile;
