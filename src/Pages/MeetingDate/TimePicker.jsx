import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
  border: 2px solid blue;
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: #666666;
`;

const DateDisplay = styled.div`
  font-size: 1.875rem;
  font-weight: 600;
  color: #376FA3;
  margin-bottom: 20px;
`;

const PickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid green;
`;

const PickerColumn = styled.div`
  height: 150px;
  margin: 0 13px; /* 컬럼 간 간격 설정 */
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

const Colon=styled.div`
    font-size: 1.125rem;
    
`;

const PickerItem = styled.div`
  font-size: 1.125rem;
  color: ${(props) => (props.selected ? '#000' : '#aaa')};
  height: 48px;
  min-height: 48px;
  width:3.5rem;
  padding-top: 1px;
  padding-bottom:1px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  transition: color 0.2s ease;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  border-top: ${(props) => (props.selected ? '1px solid black' : 'transparent')};
  border-bottom: ${(props) => (props.selected ? '1px solid black' : 'transparent')};
  border-left: transparent;
  border-right: transparent;
`;



const TimePicker = ({ onSaveTime, selectedDate }) => {
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  const periods = [' ', 'AM', 'PM', ' '];

  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const periodRef = useRef(null);

  useEffect(() => {
    const updateSelectedValue = (ref, setSelectedValue) => {
      if (!ref.current) return;

      const itemHeight = 48; // PickerItem height
      const scrollTop = ref.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight+0.5);

      const nearestItem = ref.current.childNodes[index];
      if (nearestItem) {
        setSelectedValue(nearestItem.textContent.trim());
      }
    };

    const onScroll = (ref, setSelectedValue) => {
      const handleScroll = () => {
        updateSelectedValue(ref, setSelectedValue);
      };

      ref.current.addEventListener('scroll', handleScroll);

      return () => {
        ref.current.removeEventListener('scroll', handleScroll);
      };
    };

    const hourCleanup = onScroll(hourRef, setSelectedHour);
    const minuteCleanup = onScroll(minuteRef, setSelectedMinute);
    const periodCleanup = onScroll(periodRef, setSelectedPeriod);

    return () => {
      if (hourCleanup) hourCleanup();
      if (minuteCleanup) minuteCleanup();
      if (periodCleanup) periodCleanup();
    };
  }, []);

  useEffect(() => {
    console.log('Selected Hour:', selectedHour);
    console.log('Selected Minute:', selectedMinute);
    console.log('Selected Period:', selectedPeriod);
  }, [selectedHour, selectedMinute, selectedPeriod]);

  const handleSave = () => {
    const formattedTime = `${selectedPeriod} ${selectedHour}시 ${selectedMinute}분`;
    onSaveTime(formattedTime);
  };

  return (
    <TimePickerContainer>
      <DateContainer>
        <Description>선택된 날짜</Description>
        <DateDisplay>{selectedDate || '날짜를 선택하세요'}</DateDisplay>
      </DateContainer>

      <PickerWrapper>
        <PickerColumn ref={periodRef}>
          {periods.map((period, index) => (
            <PickerItem key={index} selected={period === selectedPeriod}>
              {period}
            </PickerItem>
          ))}
        </PickerColumn>

        <PickerColumn ref={hourRef}>
          {hours.map((hour, index) => (
            <PickerItem key={index} selected={hour === selectedHour}>
              {hour}
            </PickerItem>
          ))}
        </PickerColumn>

        <Colon>:</Colon>

        <PickerColumn ref={minuteRef}>
          {minutes.map((minute, index) => (
            <PickerItem key={index} selected={minute === selectedMinute}>
              {minute}
            </PickerItem>
          ))}
        </PickerColumn>
      </PickerWrapper>
    </TimePickerContainer>
  );
};

export default TimePicker;




//시간과 분의 무한반복을..못하겠음
//맨앞과 맨뒤에 공백을 삽입해야 01과 12도 가운데로올수있을 것 같은데.. (무한반복해결되면 자동해결)
//24분에서 25분 넘어가는 기점부터 가운데가 아니라 맨 밑을 선택하는것으로 인식됨
//49에서 50 넘어가는 기점부터 맨 밑의 다음 숫자를 선택하는 것으로 인식됨

//미팅데이트, 캘린터와 더불어 날짜와 시간을 저장하는 로직을 만들고 테스트해봐야함
//3개 다 백엔드에 저장할 수 있도록 (3개 다 아니면 null값을 보내야하니까 title과 description을 placeholder로 써야하나?)
