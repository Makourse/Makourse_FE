import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckCourse.css';
import backIcon from '../../assets/home/back.svg';
import starIcon from '../../assets/home/star.png';

function CheckCourse() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  // 오늘 날짜 계산
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  // 날짜 포맷팅 함수 (YYYY.MM.DD(요일))
  const formatDate = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const d = new Date(date);
    const day = days[d.getDay()];
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}(${day})`;
  };

  // 임시 데이터
  const courseData = [
    { title: '성수 데이트', date: '2025-01-07', people: '김민수 외 2명' },
    { title: '홍대 데이트', date: '2025-01-05', people: '김민수 외 2명' },
    { title: '경복궁 나들이', date: '2025-01-09', people: '김민수 외 2명' },
    { title: '코스 이름', date: '2025-01-10', people: '김민수 외 2명' },
    { title: '코스 이름', date: '2025-01-11', people: '김민수 외 2명' },
    { title: '코스 이름', date: '2025-01-12', people: '김민수 외 2명' },
  ].sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜 정렬

  // D-Day 계산
  const calculateDday = (date) => {
    const targetDate = new Date(date);
    const difference = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    if (difference < 0) return `D+${Math.abs(difference)}`;
    if (difference === 0) return 'D-Day';
    return `D-${difference}`;
  };

  // 일정 분리
  const upcomingCourses = courseData.filter(
    (course) => calculateDday(course.date).startsWith('D-')
  );
  const completedCourses = courseData.filter(
    (course) => !calculateDday(course.date).startsWith('D-')
  );

  return (
    <div className="checkcourse-container">
      {/* Header */}
      <div className="header">
        <img
          src={backIcon}
          alt="Back"
          className="back-icon"
          onClick={() => navigate('/home')}
        />
        <div className="header-title">등록된 코스</div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          다가오는 일정
        </button>
        <button
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          완료된 일정
        </button>
      </div>

      {/* Content */}
      <div className="content">
        {activeTab === 'upcoming' && upcomingCourses.length > 0 ? (
          upcomingCourses.map((course, index) => (
            <div className="course-item" key={index}>
              <div className="course-info">
                <div className="course-title">{course.title}</div>
                <div className="course-details">
                  <span className="course-date">{formatDate(course.date)}</span>{' '}
                  <span className="separator" /> {course.people}
                </div>
              </div>
              <div className="course-dday">{calculateDday(course.date)}</div>
            </div>
          ))
        ) : activeTab === 'completed' && completedCourses.length > 0 ? (
          completedCourses.map((course, index) => (
            <div className="course-item" key={index}>
              <div className="course-info">
                <div className="course-title">{course.title}</div>
                <div className="course-details">
                  <span className="course-date">{formatDate(course.date)}</span>{' '}
                  <span className="separator" /> {course.people}
                </div>
              </div>
              <div className="course-dday">{calculateDday(course.date)}</div>
            </div>
          ))
        ) : (
          <div className="empty-message-container">
            <img src={starIcon} alt="Star" className="star-icon" />
            <div className="empty-message">
              {activeTab === 'upcoming'
                ? '예정된 일정이 없어요.'
                : '아직 완료된 일정이 없어요.'}
            </div>
          </div>
        )}
      </div>

      {/* Register Button */}
      <button
        className="register-button"
        onClick={() => navigate('/detail-course')}
      >
        코스 등록하기
      </button>
    </div>
  );
}

export default CheckCourse;
