import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';
import backIcon from '../../assets/home/back.svg';
import profilePic from '../../assets/home/profile1.svg';
import profileEditIcon from '../../assets/home/profile_edit.svg';
import cancelIcon from '../../assets/home/cancel.svg';
import { getUserProfile, updateProfileImage, updateName } from '../../api';

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(profilePic);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        console.log("가져온 유저 프로필:", userProfile);
        setName(userProfile.name || '');
        
        if (userProfile.profile_image) {
          setProfileImage(`https://api-makourse.kro.kr${userProfile.profile_image}`);
        }
      } catch (error) {
        console.error("사용자 프로필 가져오기 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleNext = async () => {
    try {
      if (name) {
        await updateName(name);
        console.log("이름 업데이트 성공:", name);
      }
      if (imageFile) {
        await updateProfileImage(imageFile);
      }
      
      const updatedProfile = await getUserProfile();
      setName(updatedProfile.name || '');
      setProfileImage(updatedProfile.profile_image ? `https://api-makourse.kro.kr${updatedProfile.profile_image}` : profilePic);
      
      navigate('/home', { 
        state: { 
          userName: updatedProfile.name, 
          profileImage: updatedProfile.profile_image ? `https://api-makourse.kro.kr${updatedProfile.profile_image}` : profilePic
        } 
      });
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setName('');
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
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
            onError={() => setProfileImage(profilePic)}
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