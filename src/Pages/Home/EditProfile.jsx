import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditProfile.css';
import backIcon from '../../assets/home/back.svg';
import profilePic from '../../assets/home/profile1.svg';
import profileEditIcon from '../../assets/home/profile_edit.svg';
import cancelIcon from '../../assets/home/cancel.svg';
import { updateProfileImage } from '../../api';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialName = location.state?.userName || '';
  const [name, setName] = useState(initialName);
  const [profileImage, setProfileImage] = useState(profilePic);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleNext = async () => {
    try {
      if (imageFile) {
        await updateProfileImage(imageFile);
      }

      navigate('/home', { state: { userName: name } });
    } catch (error) {
      console.error("프로필 이미지 업데이트 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setName('');
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // 미리보기 이미지 변경
      setImageFile(file);
    }
  };

  return (
    <div className="edit-profile-container">
      <header className="edit-profile-header">
        <img
          src={backIcon}
          alt="Back"
          className="back-icon"
          onClick={() => navigate('/home')}
        />
        <h1 className="header-title">프로필 수정</h1>
      </header>

      <div className="edit-profile-content">
        <p className="edit-instruction">프로필을 <br /> 수정해 보아요.</p>
        <div className="profile-picture-container">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-picture"
          />
          <label htmlFor="file-upload" className="profile-edit-icon">
            <img
              src={profileEditIcon}
              alt="Edit Profile"
              className="profile-edit-icon-img"
            />
          </label>
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleProfileImageChange}
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
              onClick={handleCancel}
            />
          )}
        </div>
      </div>

      <button
        className="next-button"
        onClick={handleNext}
        style={{
          backgroundColor: '#D6EBFF',
          color: '#376FA3',
        }}
      >
        다음
      </button>
    </div>
  );
};

export default EditProfile;