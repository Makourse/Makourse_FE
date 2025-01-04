// Time.jsx
import React, { useState } from 'react';
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
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const PickerColumn = styled.div`
  height: 100px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PickerItem = styled.div`
  font-size: 20px;
  color: ${(props) => (props.selected ? '#000' : '#aaa')};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  cursor: pointer;
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
  const periods = ['AM', 'PM'];

  const [selectedHour, setSelectedHour] = useState('01');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedPeriod, setSelectedPeriod] = useState('AM');

  const handleSelectChange = (type, value) => {
    if (type === 'hour') setSelectedHour(value);
    else if (type === 'minute') setSelectedMinute(value);
    else if (type === 'period') setSelectedPeriod(value);
  };

  const renderPeriodPicker = () => {
    return (
      <>
        <PickerItem
          selected={selectedPeriod === 'AM'}
          onClick={() => handleSelectChange('period', 'AM')}
        >
          {selectedPeriod === 'PM' ? 'AM' : ''}
        </PickerItem>
        <PickerItem
          selected={true}
          onClick={() => handleSelectChange('period', selectedPeriod)}
        >
          {selectedPeriod}
        </PickerItem>
        <PickerItem
          selected={selectedPeriod === 'PM'}
          onClick={() => handleSelectChange('period', 'PM')}
        >
          {selectedPeriod === 'AM' ? 'PM' : ''}
        </PickerItem>
      </>
    );
  };

  const renderPickerItems = (items, selectedValue, type) => {
    const selectedIndex = items.indexOf(selectedValue);
    const visibleItems = [
      items[(selectedIndex - 1 + items.length) % items.length],
      items[selectedIndex],
      items[(selectedIndex + 1) % items.length],
    ];

    return visibleItems.map((item, index) => (
      <PickerItem
        key={index}
        selected={item === selectedValue}
        onClick={() => handleSelectChange(type, item)}
      >
        {item}
      </PickerItem>
    ));
  };

  return (
    <TimePickerContainer>
      <DateDisplay>2024년 09월 30일</DateDisplay>
      <PickerWrapper>
        <PickerColumn>{renderPeriodPicker()}</PickerColumn>
        <PickerColumn>{renderPickerItems(hours, selectedHour, 'hour')}</PickerColumn>
        <PickerColumn>:</PickerColumn>
        <PickerColumn>{renderPickerItems(minutes, selectedMinute, 'minute')}</PickerColumn>
      </PickerWrapper>
      <Button>저장하기</Button>
    </TimePickerContainer>
  );
};

export default TimePicker;