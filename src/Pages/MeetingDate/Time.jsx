import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimePicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  min-width: 60px;
  position: relative;

  &:first-child {
    margin-right: 10px;
  }

  &.period-column {
    justify-content: center;
    gap: 0;
  }
`;

const TimeOption = styled.div`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.2);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  padding: 0;

  &.selected {
    color: #000;
    font-weight: 500;
    font-size: 18px;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: -10px;
      right: -10px;
      height: 1px;
      background-color: #000000;
    }

    &::before {
      top: -5px;
    }

    &::after {
      bottom: -5px;
    }
  }
`;

const TimeSeparator = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 0 5px;
  width: 20px;
  text-align: center;
  margin-left: -15px;
  margin-right: -15px;
`;

const Time = ({ onTimeChange, selectedDate }) => {
  const [selectedTime, setSelectedTime] = useState({
    period: 'AM',
    hour: '01',
    minute: '00',
  });
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentType, setCurrentType] = useState(null);
  const [isQuickScrolling, setIsQuickScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  const handleTouchStart = (e, type) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
    setCurrentType(type);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;

    if (!isQuickScrolling) {
      setIsQuickScrolling(true);
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    if (Math.abs(diff) > 10) {
      updateTime(currentType, diff > 0);
      setStartY(currentY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setCurrentType(null);

    scrollTimeout.current = setTimeout(() => {
      setIsQuickScrolling(false);
    }, 300);
  };

  const updateTime = (type, increment) => {
    setSelectedTime((prev) => {
      let newValue;
      switch (type) {
        case 'period':
          return { ...prev, period: prev.period === 'AM' ? 'PM' : 'AM' };
        case 'hour':
          newValue = parseInt(prev.hour) + (increment ? 1 : -1);
          if (newValue > 12) newValue = 1;
          if (newValue < 1) newValue = 12;
          return { ...prev, hour: String(newValue).padStart(2, '0') };
        case 'minute':
          newValue = parseInt(prev.minute) + (increment ? 1 : -1);
          if (newValue > 59) newValue = 0;
          if (newValue < 0) newValue = 59;
          return { ...prev, minute: String(newValue).padStart(2, '0') };
        default:
          return prev;
      }
    });
  };

  useEffect(() => {
    // 부모 컴포넌트로 시간 데이터 전달
    onTimeChange(selectedTime);
  }, [selectedTime, onTimeChange]);

  return (
    <ModalContent>
      <TimePicker
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <TimeColumn
          className="period-column"
          data-type="period"
          onTouchStart={(e) => handleTouchStart(e, 'period')}
        >
          <TimeOption>
            {selectedTime.period === 'AM' ? '' : 'AM'}
          </TimeOption>
          <TimeOption className="selected">
            {selectedTime.period}
          </TimeOption>
          <TimeOption>
            {selectedTime.period === 'PM' ? '' : 'PM'}
          </TimeOption>
        </TimeColumn>
        <TimeColumn
          data-type="hour"
          onTouchStart={(e) => handleTouchStart(e, 'hour')}
        >
          <TimeOption>
            {String(
              parseInt(selectedTime.hour) === 1
                ? 12
                : parseInt(selectedTime.hour) - 1
            ).padStart(2, '0')}
          </TimeOption>
          <TimeOption className="selected">
            {selectedTime.hour}
          </TimeOption>
          <TimeOption>
            {String(
              parseInt(selectedTime.hour) === 12
                ? 1
                : parseInt(selectedTime.hour) + 1
            ).padStart(2, '0')}
          </TimeOption>
        </TimeColumn>
        <TimeSeparator>:</TimeSeparator>
        <TimeColumn
          data-type="minute"
          onTouchStart={(e) => handleTouchStart(e, 'minute')}
        >
          <TimeOption>
            {String(
              parseInt(selectedTime.minute) === 0
                ? 59
                : parseInt(selectedTime.minute) - 1
            ).padStart(2, '0')}
          </TimeOption>
          <TimeOption className="selected">
            {selectedTime.minute}
          </TimeOption>
          <TimeOption>
            {String(
              parseInt(selectedTime.minute) === 59
                ? 0
                : parseInt(selectedTime.minute) + 1
            ).padStart(2, '0')}
          </TimeOption>
        </TimeColumn>
      </TimePicker>
    </ModalContent>
  );
};

export default Time;
