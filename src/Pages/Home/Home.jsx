import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';
import alarmIcon from '../../assets/home/alarm.svg';
import { getUserData, getCourseDetail } from '../../api';
import HomeCard1 from './HomeCards/HomeCard1';
import HomeCard2 from './HomeCards/HomeCard2';
import HomeCard3 from './HomeCards/HomeCard3';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [courseDetails, setCourseDetails] = useState({}); // 코스 상세 정보 저장

  useEffect(() => {
    const fetchUserDataAndCourses = async () => {
      try {
        const response = await getUserData();
        if (response) {
          setUserData(response.user);
          setSchedules(response.schedules);

          const courseDetailsPromises = response.schedules.map(async (schedule) => {
            const courseDetail = await getCourseDetail(localStorage.getItem('accessToken'), schedule.id);
            
            // ✅ 코스 상세정보 로그 출력
            console.log(`코스 ID: ${courseDetail.course.id}, 코스 이름: ${courseDetail.course.course_name}`);

            return courseDetail;
          });

          const courseDetailsResponses = await Promise.all(courseDetailsPromises);
          const detailsMap = courseDetailsResponses.reduce((acc, detail) => {
            acc[detail.course.id] = detail;
            return acc;
          }, {});

          setCourseDetails(detailsMap);
        }
      } catch (error) {
        console.error('Error fetching user data or course details:', error);
      }
    };

    fetchUserDataAndCourses();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '날짜 미정';
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateString);
    const day = days[date.getDay()];
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${day})`;
  };

  const calculateDday = (dateString) => {
    if (!dateString) return 'D-?';
    const today = new Date();
    const targetDate = new Date(dateString);
    const difference = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    return difference > 0 ? `D-${difference}` : 'D-Day';
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="app-name">makourse</h1>
        <img src={alarmIcon} alt="Alarm" className="alarm-icon" onClick={() => navigate('/alarm')} />
      </header>

      <div className="scrollable-section">
        <HomeCard2 />
        <HomeCard1 />
        <HomeCard3 userData={userData} />
      </div>

      {schedules.length > 0 ? (
        <div className="upcoming-section">
          <h2 className="upcoming-title">다가오는 일정</h2>
          <div className="upcoming-list">
            {schedules.map((schedule) => {
              const courseDetail = courseDetails[schedule.id];

              return (
                <div className="course-box" key={schedule.id}>
                  <div className="dday-box">{calculateDday(courseDetail?.course.meet_date_first)}</div>
                  <div className="course-title">{courseDetail?.course.course_name || '코스 이름 없음'}</div>
                  <div className="course-people">
                    {userData?.name} 외 {courseDetail?.course.group ? `${courseDetail.course.group - 1}명` : '?명'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="register-section">
          <img src="/homestar.png" alt="homestar" className='star-icon'/>
        </div>
      )}

      <button className="register-course-btn" onClick={() => navigate('/myplace')}>
        코스 등록하기
      </button>
    </div>
  );
};

export default Home;
