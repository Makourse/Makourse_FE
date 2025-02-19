import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckCourse.css';
import backIcon from '../../assets/home/back.svg';
import starIcon from '../../assets/home/star.svg';

function CheckCourse() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [courseData, setCourseData] = useState([]); // API 데이터 저장
  const [loading, setLoading] = useState(true);

  // 오늘 날짜 계산
  const today = new Date();

  // 날짜 포맷팅 함수 (YYYY.MM.DD(요일))
  const formatDate = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const d = new Date(date);
    const day = days[d.getDay()];
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}(${day})`;
  };

  // D-Day 계산
  const calculateDday = (date) => {
    const targetDate = new Date(date);
    const difference = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    if (difference < 0) return `D+${Math.abs(difference)}`;
    if (difference === 0) return 'D-Day';
    return `D-${difference}`;
  };

  // 일정 가져오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('course/schedule/<int:schedule_id>');
    
        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }
    
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('JSON 형식의 응답이 아닙니다.');
        }
    
        const data = await response.json();
        console.log('받아온 데이터:', data);
        setCourseData(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
      } catch (error) {
        console.error('에러 발생:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchCourses();
  }, []);

  // 일정 분리
  const upcomingCourses = courseData.filter(
    (course) => calculateDday(course.date).startsWith('D-')
  );
  const completedCourses = courseData.filter(
    (course) => !calculateDday(course.date).startsWith('D-')
  );

  return (
    <div className="checkcourse-container">
      <div className="header">
        <img
          src={backIcon}
          alt="Back"
          className="back-icon"
          onClick={() => navigate('/home')}
        />
        <div className="header-title">등록된 코스</div>
      </div>

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
        {loading ? (
          <div className="loading-message">데이터 불러오는 중...</div>
        ) : activeTab === 'upcoming' && upcomingCourses.length > 0 ? (
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
