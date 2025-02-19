import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditProfile.css';
import backIcon from '../../assets/home/back.svg';
import profilePic from '../../assets/home/profile1.svg';
import profileEditIcon from '../../assets/home/profile_edit.svg';
import cancelIcon from '../../assets/home/cancel.svg';
import { getProfileImage, updateProfileImage } from '../../api';

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialName = location.state?.userName || ''; // 이전 페이지에서 받은 이름 값
  const [name, setName] = useState(initialName);
  const [profileImage, setProfileImage] = useState(profilePic); // 기본 프로필 이미지
  const [imageFile, setImageFile] = useState(null); // 선택한 이미지 파일

  // 🔹 프로필 이미지 가져오기
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const imageUrl = await getProfileImage();
        if (imageUrl) {
          setProfileImage(imageUrl); // 기존 프로필 이미지가 있으면 적용
        }
      } catch (error) {
        console.error("프로필 이미지 가져오기 실패:", error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleNext = async () => {
    try {
      // 프로필 이미지 변경 (이미지 선택한 경우만)
      if (imageFile) {
        await updateProfileImage(imageFile);
      }

      // 홈 화면으로 이동 (이름 변경 API는 호출하지 않음)
      navigate('/home', { state: { userName: name } });
    } catch (error) {
      console.error("프로필 이미지 업데이트 중 오류 발생:", error);
    }
  };

  const handleCancel = () => {
    setName(''); // 입력 필드 초기화
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // 미리보기 이미지 변경
      setImageFile(file); // 파일 저장
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
