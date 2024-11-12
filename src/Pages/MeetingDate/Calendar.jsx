// Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

// Calendar 스타일을 커스터마이징
const StyledCalendar = styled(Calendar)`
  font-family: 'Arial', sans-serif;

  /* 전체 테두리 삭제 */
  border: none;

  /* 요일 밑줄 제거 및 색상 변경 */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    color: black;
  }

  /* 이번 달이 아닌 날짜 글자색을 #999999로 변경 */
  .react-calendar__tile--neighboringMonth {
    color: #999999;
  }

  /* 달력 헤더 스타일 설정 */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    /* 화살표 위치 조정 */
    button {
      order: 1; /* 화살표 위치 변경 가능 */
      background: none;
      font-size: 20px;
    }
  }

  /* 현재 날짜와 오늘 날짜 스타일 제거 */
  .react-calendar__tile--now {
    background: none !important;
    color: black !important;
  }
`;

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <StyledCalendar
      onChange={setDate}
      value={date}
      next2Label={null}       // 연도 이동 버튼 제거
      prev2Label={null}       // 연도 이동 버튼 제거
      formatShortWeekday={(locale, date) => 
        ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
      } // 요일 순서를 일월화수목금토로 변경
      formatDay={(locale, date) => date.getDate()} // 날짜 옆 '일' 제거
      formatMonthYear={(locale, date) =>
        `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`
      } // 날짜 상단 형식: 2024.09
    />
  );
};

export default MyCalendar;

