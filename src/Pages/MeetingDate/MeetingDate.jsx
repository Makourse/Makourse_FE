import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import Button from '../../component/Button';
import Header from '../../component/Header';
import StateHeader from '../../component/StateHeader';
import Calendar from './Calendar';
import Time from './Time';
import { createGlobalStyle } from 'styled-components';

import { schedulePost } from "../../api";

import meetingdate from '../../assets/meetingdate.svg';
import backgroundblue from '../../assets/bg_mypage3_bggra1_blue.svg';
import backgroundpurple from '../../assets/bg_mypage3_bggra1_purple.svg';
import blurstar from '../../assets/blurstar.svg';
import heart from '../../assets/heart.svg';
import first from '../../assets/first.svg';
import second from '../../assets/second.svg';
import third from '../../assets/third.svg';
import ic_move from '../../assets/ic_move.svg';
import { toast, ToastContainer } from 'react-toastify';
const GlobalStyle = createGlobalStyle`
  .no-scroll {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }

  /* 빠른 스크롤 중일 때는 transition 비활성화 */
  .quick-scrolling .time-option {
    transition: none;
  }

  /* 슬라이딩 애니메이션 */
  .sliding-up {
    transform: translateY(-40px);
    opacity: 0;
  }

  .sliding-down {
    transform: translateY(40px);
    opacity: 0;
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    position: relative;
    background-color: white;
`;

const MeetingDateContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const MeetingDateContainer2 = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    //border : 2px solid red;
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    padding: 2rem 0;
    margin-top: 1rem;
    //border : 2px solid black;
`;
const DescriptionContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    padding: 1.5rem 0;
    margin-top: 1rem;
`;
const DescriptionTitle = styled.div`
    font-size: 1.875rem;
    font-weight: 600;
    z-index: 10;
`;
const DescriptionContent = styled.div`
    width: 90%;
    margin-top: 1rem;
    font-size: 16px;
    font-weight: 500;
    color: #666666;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    //border : 2px solid black;
    margin-top: 1rem;
`;
const Date = styled.div`
    display: flex;
    align-items: center;
    height: 4.5rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0px 8px 8px 0px #0000000A;
    padding-left: 0.75rem;
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
const Ic_move = styled.img`
    width:1.5rem;
    padding-right: 1rem;
`;
const TextWrapper = styled.div`
    display: flex;
    width:100%;
    justify-content: space-between;
`;

const CalendarContainer = styled.div`
    display: flex;
    flex-grow: 1;

`;
const TimeContainer = styled.div`
    display: flex;
    flex-grow: 1;
    //border: 2px solid black;
    margin-top: 54px;
`;
const CalendarBackground = styled.div`
    background-color: #FFFFFF;
    border-radius: 1.5rem;
    width: 100%;
    box-shadow: 0px -4px 8px 0px #0000000A;
    z-index: 1;
    margin-top: 1rem;
    //border:2px solid red;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-around;
`;
const TimeBackground = styled.div`
    background-color: #FFFFFF;
    border-radius: 1.5rem;
    width: 100vw;
    box-shadow: 0px -4px 8px 0px #0000000A;
    z-index: 1;
    //border:2px solid red;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    top: 232px;
    left: 0%;
    transform: translate(0%, -50%);
    z-index: 2;
`;

const Heart = styled.img`
    width: 37vw;
    position: absolute;
    top:220px;
    left: 63.5%;
    transform: translate(0%, -50%);
`;

const ButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 1rem;
    z-index: 10;
    flex-direction: column;
`;

const Button2 = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    color: #666666;
    text-decoration: underline;
`;

const DateContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  //border: 2px solid red;
`;
const Description = styled.div`
  font-size: 0.875rem;
  color: #666666;
  margin-top: 48px;
`;

const DateDisplay = styled.div`
  font-size: 1.875rem;
  font-weight: 600;
  color: #376FA3;
  margin-bottom: 20px;
`;


const Meetingdate = () => {
    const navigate = useNavigate();
    const [viewState, setViewState] = useState('selectDate'); // 바로 날짜 선택 화면으로 시작
    const [currentDate, setCurrentDate] = useState(null); // 캘린더에서 선택된 날짜
    const [currentTime, setCurrentTime] = useState(null); // 타임피커에서 선택된 시간
    const [selectedDateTime, setSelectedDateTime] = useState(null); // 최종 선택된 날짜와 시간

    // 날짜 선택
    const handleCalendarDateClick = (date) => {
      // 로컬 시간을 기준으로 YYYY-MM-DD 형식으로 포맷
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
      const day = String(date.getDate()).padStart(2, '0');
    
      const formattedDate = `${year}-${month}-${day}`;
      setCurrentDate(formattedDate);
    };
    
    // 날짜 저장
    const handleSaveDate = () => {
      if (currentDate) {
          setViewState('selectTime');
      } else {
            toast.error('날짜를 선택해주세요');
      }
    };
    
    // 시간 선택
    const handleTimeChange = (newTimeData) => {
      setCurrentTime(newTimeData);
    };
      
    // 시간 저장 및 일정 저장 API 호출
    const handleSaveTime = async () => {
      if (currentDate && currentTime) {
          const formattedTime = `${String(currentTime.hour).padStart(2, '0')}:${String(currentTime.minute).padStart(2, '0')}:00`;
          const dateTime = `${currentDate}T${formattedTime}`;
          setSelectedDateTime(dateTime);
          
          try {
            const response = await schedulePost(dateTime, null, null);
            
            // 생성된 scheduleId 가져오기
            const scheduleId = response?.id;

            if (scheduleId) {
              navigate(`/detail-course/${scheduleId}`); // 페이지 이동
            } else {
              throw new Error('scheduleId가 반환되지 않았습니다.');
            }
          } catch (error) {
            console.error('일정 저장 실패:', error);
          }
      } else {
          toast.error('시간을 선택해주세요');
      }
    };

    // 나중에 정할게요 버튼 클릭 시 처리
    const handleDecideLater = async () => {
      try {
        // 모든 날짜를 null로 전송
        const response = await schedulePost(null, null, null);
        
        // 생성된 scheduleId 가져오기
        const scheduleId = response?.id;

        if (scheduleId) {
          navigate(`/detail-course/${scheduleId}`); // 페이지 이동
        } else {
          throw new Error('scheduleId가 반환되지 않았습니다.');
        }
      } catch (error) {
        console.error('코스 저장 실패:', error);
      }
    };

    const handleBack = () => {
      if (viewState === 'selectTime') {
        setViewState('selectDate');
      }
    };
  
    const formatDateTitle = (dateString) => {
      if (!dateString) return '';
      
      const [year, month, day] = dateString.split('-');
      return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
    };

    const formatTimeDescription = (dateTimeString) => {
      if (!dateTimeString || !dateTimeString.includes('T')) return dateTimeString;

      const [date, time] = dateTimeString.split('T');
      let [hour, minute] = time.split(':');

      hour = parseInt(hour, 10);
      const ampm = hour < 12 ? 'AM' : 'PM';
      const formattedHour = String(hour % 12 === 0 ? 12 : hour % 12).padStart(2, '0');
      const formattedMinute = String(parseInt(minute, 10)).padStart(2, '0');

      return `${ampm} ${formattedHour}시 ${formattedMinute}분`;
    };
  
    return (
        <>
          <GlobalStyle />
          <Container>
                {viewState === 'selectDate' && (
                    <>
                    <Header title="코스 등록하기" backUrl="/home" />
                    <MeetingDateContainer>
                    <DescriptionContainer2>
                    <Bgpurple src={backgroundpurple} alt="purlplecircle" />
                    <Bgblue src={backgroundblue} alt="bluecircle" />
                        <DescriptionTitle>만날 날짜를</DescriptionTitle>
                        <DescriptionTitle>선택해주세요.</DescriptionTitle>
                        <DescriptionContent>일정의 날짜와 시간은 언제든지 수정할 수 있어요.</DescriptionContent>
                    </DescriptionContainer2>
                    <CalendarContainer>
                        <CalendarBackground>
                            <Calendar onDateClick={handleCalendarDateClick} />
                        </CalendarBackground>
                    </CalendarContainer>
                    <ButtonContainer>
                        <Button2 onClick={handleDecideLater}>나중에 정할게요</Button2>
                        <Button 
                            text="다음" 
                            onClick={handleSaveDate}
                        />
                        </ButtonContainer>
                    </MeetingDateContainer>
                    </>
                )}

                {viewState === 'selectTime' && (
                   <>
                    <StateHeader
                    title='코스 등록하기'
                    onBack={handleBack}
                    />
                    <MeetingDateContainer>
                        <DescriptionContainer2>
                            <Bgpurple src={backgroundpurple} alt="purlplecircle" />
                            <Bgblue src={backgroundblue} alt="bluecircle" />
                            {/* <Blurstar src={blurstar} alt="blurstar"/> */}
                            {/* <Heart src={heart} alt="heart"/> */}
                            <DescriptionTitle>시간을</DescriptionTitle>
                            <DescriptionTitle>선택해주세요.</DescriptionTitle>
                            <DescriptionContent>일정의 날짜와 시간은 언제든지 수정할 수 있어요.</DescriptionContent>
                        </DescriptionContainer2>
                        <TimeContainer>
                            <TimeBackground>
                            <DateContainer2>
                               <Description>선택된 날짜</Description>
                               <DateDisplay>{formatDateTitle(currentDate) || '날짜를 선택하세요'}</DateDisplay>
                            </DateContainer2>
                                <Time
                                    onTimeChange={handleTimeChange}
                                    selectedDate={currentDate}
                                />
                            </TimeBackground>
                        </TimeContainer>
                        <ButtonContainer>
                        <Button2 onClick={() => setViewState('selectDate')}>날짜 수정하기</Button2>
                            <Button text="저장 하기" onClick={handleSaveTime} />
                        </ButtonContainer>
                    </MeetingDateContainer>
                    </>
                )}
                <ToastContainer
                  position="bottom-center"
                  autoClose={2000}
                  hideProgressBar={true}
                  closeOnClick
                />
        </Container>
        </>
    );
};

export default Meetingdate;







