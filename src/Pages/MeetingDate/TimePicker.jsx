import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  color: #000;
`;

const DateDisplay = styled.div`
  font-size: 24px;
  color: #4A90E2;
  margin-bottom: 20px;
`;

const PickerWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const PickerColumn = styled.div`
  height: 180px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  display: flex;
  flex-direction: column;
  align-items: center;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PickerItem = styled.div`
  font-size: 32px;
  color: ${(props) => (props.selected ? '#000' : '#aaa')};
  height: 60px;
  padding-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  transition: color 0.2s ease;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: #4A90E2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const TimePicker = () => {
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const periods = [' ','AM', 'PM',' '];

  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const periodRef = useRef(null);

  useEffect(() => {
    const createObserver = (ref, setSelectedValue) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setSelectedValue(entry.target.textContent);
            }
          });
        },
        {
          root: ref.current,
          threshold: 0.9, // 중앙에 맞추기 <-왜 0.5아니고 0.9로하니까되는지는 모르겟음
        }
      );

      ref.current.childNodes.forEach((item) => observer.observe(item));

      // Clean up observer when component unmounts
      return () => {
        ref.current.childNodes.forEach((item) => observer.unobserve(item));
        observer.disconnect();
      };
    };

    const hourObserverCleanup = createObserver(hourRef, setSelectedHour);
    const minuteObserverCleanup = createObserver(minuteRef, setSelectedMinute);
    const periodObserverCleanup = createObserver(periodRef, setSelectedPeriod);

    return () => {
      hourObserverCleanup();
      minuteObserverCleanup();
      periodObserverCleanup();
    };
  }, []);

  return (
    <TimePickerContainer>
      <DateDisplay>2024년 09월 30일</DateDisplay>
      <PickerWrapper>
        <PickerColumn ref={periodRef}>
          {periods.map((period, index) => (
            <PickerItem key={index} selected={period === selectedPeriod}>
              {period}
            </PickerItem>
          ))}
        </PickerColumn>
        <PickerColumn ref={hourRef}>
          {[...hours, ...hours, ...hours].map((hour, index) => (
            <PickerItem key={index} selected={hour === selectedHour}>
              {hour}
            </PickerItem>
          ))}
        </PickerColumn>
        <PickerColumn>:</PickerColumn>
        <PickerColumn ref={minuteRef}>
          {[...minutes, ...minutes, ...minutes].map((minute, index) => (
            <PickerItem key={index} selected={minute === selectedMinute}>
              {minute}
            </PickerItem>
          ))}
        </PickerColumn>
      </PickerWrapper>
      <Button>저장하기</Button>
    </TimePickerContainer>
  );
};

export default TimePicker;

//시간과 분의 무한반복을..못하겠음 그냥 3개이어붙였는데 나중에해결해보기
//맨앞과 맨뒤에 공백을 삽입해야 01과 12도 가운데로올수있을 것 같은데.. (무한반복해결되면 자동해결)
//현재 AM과 PM은 선택조차 되지않음
//AM와 PM에는 앞뒤로 공백을 무조건 삽입해야할 것 같은데 영문자랑 비슷한 세로길이의 공백을 넣을 순 없나..
//스크롤하면 애매하게 위에 걸림..
//미팅데이트, 캘린터와 더불어 날짜와 시간을 저장하는 로직을 만들고 테스트해봐야함 (앞서고른 날짜도 불러오기)
