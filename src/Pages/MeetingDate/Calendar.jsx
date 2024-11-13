import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

// Calendar 스타일을 커스터마이징
const StyledCalendar = styled(Calendar)`
  font-family: 'Arial', sans-serif;
  width: 80%; /* 달력 전체 크기를 줄이기 위해 width 추가 */
  max-width: 80%; /* 최대 너비 설정 가능 */
  border: none; /* 전체 테두리 삭제 */

  /* 요일 밑줄 제거 및 색상 변경 */
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    color: black;
  }

  /* 클릭한 날짜를 #D6EBFF 원으로 표시, 날짜를 가리지 않도록 크기 조정 */
  .react-calendar__tile--active {
    background-color: transparent !important;
    position: relative;
  }

  .react-calendar__tile--active::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%; /* 원의 크기 조정 */
    height: 80%; /* 원의 크기 조정 */
    background-color: #D6EBFF;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 0; /* 날짜와 원이 겹치도록 위치 조정 */
  }

  /* 날짜 텍스트의 z-index 설정 */
  .react-calendar__tile--active > span {
    position: relative;
    z-index: 100; /* 날짜 텍스트가 원 위로 오도록 */
  }

  /* 정사각형 모양 유지 */
  .react-calendar__tile {
    aspect-ratio: 1; /* 정사각형 비율 */
    display: flex;
    justify-content: center;
    align-items: center;
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

  /* 오늘 날짜 스타일 제거 */
  .react-calendar__tile--now {
    background: none !important;
    color: inherit !important;
  }

  /* 회색 날짜 (다음달, 지난달) */
  .react-calendar__tile--neighboringMonth {
    color: #999999;
  }

  /* 주말 날짜 (토요일, 일요일) */
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
`;

const MyCalendar = () => {
  const [date, setDate] = useState(new Date()); // 선택된 날짜
  const [viewDate, setViewDate] = useState(new Date()); // 현재 보고 있는 월

  return (
    <StyledCalendar
      onChange={setDate}
      value={date}
      onActiveDateChange={({ activeStartDate }) => setViewDate(activeStartDate)} // 달력에서 보고 있는 날짜를 변경
      next2Label={null} // 연도 이동 버튼 제거
      prev2Label={null} // 연도 이동 버튼 제거
      formatShortWeekday={(locale, date) =>
        ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
      } // 요일 순서를 일월화수목금토로 변경
      formatDay={(locale, date) => date.getDate()} // 날짜 옆 '일' 제거
      formatMonthYear={(locale, date) =>
        `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}` // 날짜 상단 형식: 2024.09
      }
      tileClassName={({ date, view }) => {
        if (date.getMonth() !== viewDate.getMonth()) {
          return 'react-calendar__tile--neighboringMonth'; // 다음 달의 날짜는 무조건 회색으로 표시
        }
        if (date.getMonth() === viewDate.getMonth() && (date.getDay() === 0 || date.getDay() === 6)) {
          return 'react-calendar__month-view__days__day--weekend'; // 이번 달의 주말은 검정색으로 표시
        }
        return ''; // 평일은 기본 스타일
      }}
    />
  );
};

export default MyCalendar;

