import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserId, deleteCourse, getUserData, getAccessToken } from '../../api'; // Import from api.js
import './CheckCourse.css';
import backIcon from '../../assets/home/back.svg';
import Button from '../../component/Button';
import CheckHeader from '../../component/CheckHeader';

function CheckCourse() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [courses, setCourses] = useState([]);
  const today = new Date();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = await getUserId();
        const userData = await getUserData(); // Fetch user data to get the courses

        const fetchedCourses = userData.schedules.map(course => ({
          id: course.id,
          title: course.course_name,
          date: course.meet_date_first,
          people: '미정'
        }));

        setCourses(fetchedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const formatDate = (date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}(${days[d.getDay()]})`;
  };

  const calculateDday = (date) => {
    const targetDate = new Date(date);
    const difference = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    return difference < 0 ? `D+${Math.abs(difference)}` : difference === 0 ? 'D-Day' : `D-${difference}`;
  };

  const upcomingCourses = courses.filter((course) => calculateDday(course.date).startsWith('D-'));
  const completedCourses = courses.filter((course) => !calculateDday(course.date).startsWith('D-'));

  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting);
    setSelectedCourses(new Set());
  };

  const toggleCourseSelection = (id) => {
    const newSelected = new Set(selectedCourses);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedCourses(newSelected);
  };

  const deleteSelectedCourses = async () => {
    try {
      const accessToken = getAccessToken();
      console.log('Access Token:', accessToken);

      for (const courseId of selectedCourses) {
        console.log('Deleting course with ID:', courseId); 
        await deleteCourse(accessToken, courseId);
      }
      setCourses(courses.filter(course => !selectedCourses.has(course.id)));
      setSelectedCourses(new Set());
      setIsSelecting(false);
    } catch (error) {
      console.error('Error deleting courses:', error);
    }
  };

  const handleClick = (id) => {
    if (!isSelecting) {
      navigate(`/detail-course/${id}`);
    }
  };

  return (
    <div className="checkcourse-container">
      <div className="header">
        <img src={backIcon} alt="Back" className="back-icon" onClick={() => navigate('/home')} />
        <div className="header-title">등록된 코스</div>
      </div>
      
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>다가오는 일정</button>
        <button className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>완료된 일정</button>
      </div>

      {isSelecting && <CheckHeader onCheckAll={() => setSelectedCourses(new Set(courses.map(course => course.id)))} onDone={toggleSelectMode} />}
      
      <div className="content">
        {(activeTab === 'upcoming' ? upcomingCourses : completedCourses).map((course) => (
        <div 
          className={`course-item ${selectedCourses.has(course.id) ? 'selected' : ''}`} 
          key={course.id} 
          onClick={isSelecting ? () => toggleCourseSelection(course.id) : () => handleClick(course.id)}
        >
            <div className="course-info">
              <div className="course-title">{course.title}</div>
              <div className="course-details">
                <span className="course-date">{formatDate(course.date)}</span> <span className="separator" /> {course.people}
              </div>
            </div>
            <div className="course-dday">{calculateDday(course.date)}</div>
          </div>
        ))}
      </div>
      <img src="/course_delete.svg" alt="코스 삭제하기" className="delete-icon" onClick={toggleSelectMode} />

      <div className="button-container">
        {isSelecting ? (
          <Button text="삭제하기" bgColor={selectedCourses.size > 0 ? "#376FA3" : "#F1F1F1"} textColor={selectedCourses.size > 0 ? "#FFFFFF" : "#666666"} onClick={deleteSelectedCourses} disabled={selectedCourses.size === 0} />
        ) : (
          <Button text="코스 등록하기" bgColor="#D6EBFF" textColor="#376FA3" onClick={() => navigate('/detail-course')} />
        )}
      </div>
    </div>
  );
}

export default CheckCourse;
