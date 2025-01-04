import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

import Calendar from 'react-calendar';


// Calendar 스타일을 커스터마이징
const StyledCalendar = styled(Calendar)`
  font-family: 'Arial', sans-serif;
  width: 80%;
  max-width: 80%;
  border: none;

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    color: black;
  }

  .react-calendar__tile {
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    background-color: transparent;
  }

  .react-calendar__tile--active {
    background-color: #D6EBFF !important; 
    position: relative;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    color: #376FA3 !important; /* 선택된 날짜의 텍스트 색상 유지 */
  }

  .react-calendar__tile--now.react-calendar__tile--active {
    color: #376FA3 !important; 
    background-color: #D6EBFF !important; 
  }

  .react-calendar__tile:focus {
    outline: none; /* 기본 포커스 스타일 제거 */
  }

  .react-calendar__tile--now {
    background: transparent !important; /* 오늘 날짜에 기본 배경색 제거 */
    color: inherit !important; /* 오늘 날짜의 텍스트 색상 유지 */
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    button {
      order: 1;
      background: none;
      font-size: 20px;
      border: none; /* 버튼의 기본 테두리 제거 */
    }

    button:focus {
      background: none !important; /* 버튼 포커스 시 배경색 제거 */
      outline: none;
    }
  }

  .react-calendar__navigation__label {
    color: #376FA3 !important; /* 연월 텍스트 파란색으로 변경 */
    pointer-events: none; /* 클릭 비활성화 */
  }

  .react-calendar__month-view__days__day--weekend {
    color: black; /* 주말의 기본 빨간색 제거 */
  }
`;

const MyCalendar = ({ onDateClick }) => {
  const today = new Date(); // 현재 날짜
  const [minDate, setMinDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1)); // 현재 달의 첫날
  const [maxDate, setMaxDate] = useState(null); // 최대 날짜는 제한하지 않음
  
  return (
    <StyledCalendar
      onClickDay={(date) => {
        onDateClick(date);  // 클릭된 날짜를 부모로 전달
      }}
      next2Label={null}
      prev2Label={null}
      calendarType="gregory"
      formatDay={(locale, date) => date.getDate()}
      formatMonthYear={(locale, date) =>
        `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`
      }
      minDate={minDate} // 이전 달로 이동 불가
      maxDate={maxDate} // 최대 날짜 제한이 없도록 설정
    />
  );
};

export default MyCalendar;

//이번달이아닌주말도 검정으로표시되는문제
//오늘날짜보다 전은 체크못하게해야하는거아닌가?





