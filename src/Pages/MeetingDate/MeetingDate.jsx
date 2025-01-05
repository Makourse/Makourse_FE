import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../component/Button';
import Header from '../../component/Header';
import Calendar from './Calendar';
import TimePicker from './TimePicker';

import meetingdate from '../../assets/meetingdate.svg';
import backgroundblue from '../../assets/bg_mypage3_bggra1_blue.svg';
import backgroundpurple from '../../assets/bg_mypage3_bggra1_purple.svg';
import blurstar from '../../assets/blurstar.svg';
import heart from '../../assets/heart.svg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
    position: relative;
`;

const MeetingDateContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const DescriptionContainer = styled.div`
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
`;
const DescriptionContainer2 = styled.div`
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
`;
const DescriptionTitle = styled.div`
    font-size: 1.875rem;
    font-weight: 600;
`;
const DescriptionContent = styled.div`
    margin-top: 1.5rem;
    font-size: 0.875rem;
    font-weight: 400;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
`;
const Date = styled.div`
    display: flex;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0px 8px 8px 0px #0000000A;
`;

const DateMeeting = styled.img`
   width: 40px;
   height: 40px;
   border-radius: 50%;
   margin-right: 1rem;
`;
const Text = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const Datetext = styled.div`
    font-size: 1rem;
    font-weight: 600;
`;
const Descriptiontext = styled.div`
    font-size: 0.75rem;
    font-weight: 400;
`;

const CalendarContainer = styled.div`
    display: flex;
    flex-grow: 1;

`;
const TimeContainer = styled.div`
    display: flex;
    flex-grow: 1;

`;
const CalendarBackground = styled.div`
    background-color: #FAFAFA;
    border-radius: 1.5rem;
    width: 100%;
    box-shadow: 0px -4px 8px 0px #0000000A;
    z-index: 1;
    //border:2px solid red;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-around;
`;
const TimeBackground = styled.div`
    background-color: #FAFAFA;
    border-radius: 1.5rem;
    width: 100vw;
    box-shadow: 0px -4px 8px 0px #0000000A;
    z-index: 1;
    //border:2px solid red;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-around;
`;
const Bgpurple = styled.img`
    width: 60vw;
    position: absolute;
    top: 43%;
    left: 0%;
    transform: translate(-10%, -50%);
`;

const Bgblue = styled.img`
    width: 60vw;
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(0%, -50%);
`;

const Blurstar = styled.img`
    width: 30vw;
    position: absolute;
    top: 35%;
    left: 0%;
    transform: translate(0%, -50%);
    z-index: 2;
`;

const Heart = styled.img`
    width: 37vw;
    position: absolute;
    top:33%;
    left: 63.5%;
    transform: translate(0%, -50%);
`;



const Meetingdate = () => {
    const [viewState, setViewState] = useState('initial'); // initial, selectDate, selectTime 상태를 관리
    const [selectedDateId, setSelectedDateId] = useState(null); // 현재 선택된 ID
    const [currentDate, setCurrentDate] = useState(null); // 캘린더에서 선택된 날짜
    const [currentTime, setCurrentTime] = useState(null); // 타임피커에서 선택된 시간
    const [dates, setDates] = useState([
        { id: 1, title: '첫 번째 날짜', description: '날짜와 시간을 입력할 수 있어요' },
        { id: 2, title: '두 번째 날짜', description: '날짜와 시간을 입력할 수 있어요' },
        { id: 3, title: '세 번째 날짜', description: '날짜와 시간을 입력할 수 있어요' },
      ]);

    const handleDateClick = (id) => {
        setSelectedDateId(id);
        setViewState('selectDate'); // 날짜 선택 화면으로 전환
    };

    const handleCalendarDateClick = (date) => {
        const formattedDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월 ${String(date.getDate()).padStart(2, '0')}일`;
        setCurrentDate(formattedDate);
      };

    const handleSaveDate = () => {
        if (selectedDateId !== null && currentDate) {
            const updatedDates = dates.map((date) =>
            date.id === selectedDateId ? { ...date, title: currentDate } : date
            );
            setDates(updatedDates); // 상태 업데이트
            setViewState('selectTime'); // 시간 선택 상태로 이동
        }
    };
      

  const handleSaveTime = (time) => {
    if (selectedDateId !== null && time) {
      dates[selectedDateId - 1].description = time; // 더미 데이터 업데이트
      setViewState('initial'); // 초기 상태로 복귀
    }
  };

  // 현재 선택된 날짜 가져오기
  const selectedDate = selectedDateId
  ? dates.find((date) => date.id === selectedDateId)?.title
  : null;

    return (
        <Container>
            <Header title="코스 등록하기" />
            <MeetingDateContainer>
                {viewState === 'initial' && (
                    <>
                        <DescriptionContainer>
                            <DescriptionTitle>만날 날짜를</DescriptionTitle>
                            <DescriptionTitle>선택해주세요.</DescriptionTitle>
                            <DescriptionContent>
                                만날 날짜가 확정되지 않았을 경우를 고려하여 날짜는 최대 3개까지 등록 가능합니다.
                            </DescriptionContent>
                        </DescriptionContainer>
                        <DateContainer>
                            {dates.map((date) => (
                                <Date
                                key={date.id}
                                selected={date.id === selectedDateId}
                                onClick={() => handleDateClick(date.id)}
                                >
                                    <DateMeeting src={meetingdate} alt="meetingdate" />
                                    <Text>
                                        <Datetext>{date.title}</Datetext>
                                        <Descriptiontext>{date.description}</Descriptiontext>
                                    </Text>
                                </Date>
                            ))}
                        </DateContainer>
                        <Button text="나중에 정할게요" />
                    </>
                )}

                {viewState === 'selectDate' && (
                    <>
                    <DescriptionContainer2>
                    <Bgpurple src={backgroundpurple} alt="purlplecircle" />
                    <Bgblue src={backgroundblue} alt="bluecircle" />
                        <DescriptionTitle>날짜를</DescriptionTitle>
                        <DescriptionTitle>선택해주세요.</DescriptionTitle>
                    </DescriptionContainer2>
                    <CalendarContainer>
                    <CalendarBackground>
                        <Calendar onDateClick={handleCalendarDateClick} />
                        <Button 
                            text="저장하기" 
                            onClick={handleSaveDate}
                            /*bgColor={isDateSelected ? "#D6EBFF" : "#F1F1F1"} 
                            textColor={isDateSelected ? "#376FA3" : "#666666"} 
                            onClick={isDateSelected ? handleDateSelection : null} 
                            disabled={!isDateSelected}*/
                        />
                    </CalendarBackground>
                    </CalendarContainer>
                    </>
                )}

                {viewState === 'selectTime' && (
                    <>
                        <DescriptionContainer2>
                            <Bgpurple src={backgroundpurple} alt="purlplecircle" />
                            <Bgblue src={backgroundblue} alt="bluecircle" />
                            <Blurstar src={blurstar} alt="blurstar"/>
                            <Heart src={heart} alt="heart"/>
                            <DescriptionTitle>시간을</DescriptionTitle>
                            <DescriptionTitle>선택해주세요.</DescriptionTitle>
                        </DescriptionContainer2>
                        <TimeContainer>
                            <TimeBackground>
                                <TimePicker
                                    onSaveTime={handleSaveTime}
                                    selectedDate={selectedDate} // 여기서 선택된 날짜 전달
                                />
                            </TimeBackground>
                        </TimeContainer>
                        <Button 
                            text="날짜 수정하기" 
                            onClick={() => setViewState('selectDate')} 
                        />
                        <Button text="시간 저장" onSaveTime={handleSaveTime} />
                    </>
                )}
            </MeetingDateContainer>
        </Container>
    );
};

export default Meetingdate;


  //아무거나 눌리게하고 
  //세번째날짜를눌러서 날짜입력이 되더라도 위에 비어있는 박스가 있으면
  //빈 박스에날짜기입되게

  //뒤로가는버튼이 state를 뒤로가게하는게아니라서 수정필요
  //타임피커어케하는건데

  //날짜수정하기버튼디자인수정

