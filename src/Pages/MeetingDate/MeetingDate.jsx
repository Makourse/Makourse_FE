import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';
import Button from '../../component/Button';
import Header from '../../component/Header';
import StateHeader from '../../component/StateHeader';
import Calendar from './Calendar';
import Time from './Time';
import { createGlobalStyle } from 'styled-components';

import { schedulePost, getUserId } from "../../api";

import meetingdate from '../../assets/meetingdate.svg';
import backgroundblue from '../../assets/bg_mypage3_bggra1_blue.svg';
import backgroundpurple from '../../assets/bg_mypage3_bggra1_purple.svg';
import blurstar from '../../assets/blurstar.svg';
import heart from '../../assets/heart.svg';
import first from '../../assets/first.svg';
import second from '../../assets/second.svg';
import third from '../../assets/third.svg';
import ic_move from '../../assets/ic_move.svg';

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
    font-size: 0.875rem;
    font-weight: 400;
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
    const [viewState, setViewState] = useState('initial'); // initial, selectDate, selectTime 상태를 관리
    const [selectedDateId, setSelectedDateId] = useState(null); // 현재 선택된 ID
    const [currentDate, setCurrentDate] = useState(null); // 캘린더에서 선택된 날짜
    const [currentTime, setCurrentTime] = useState(null); // 타임피커에서 선택된 시간
    const [dates, setDates] = useState([
        { id: 1, title: '첫 번째 날짜', description: '날짜와 시간을 입력할 수 있어요' },
        { id: 2, title: '두 번째 날짜', description: '날짜와 시간을 입력할 수 있어요' },
        { id: 3, title: '세 번째 날짜', description: '날짜와 시간을 입력할 수 있어요' },
      ]);

        // user_id 가져오기
        useEffect(() => {
          const fetchUserId = async () => {
            try {
              const token = "your_access_token_here"; // 적절히 토큰 설정
              const fetchedUserId = await getUserId(token);
              setUserId(fetchedUserId);
            } catch (error) {
              console.error("Error fetching user ID:", error);
            }
          };
          fetchUserId();
        }, []);

      const handleDateClick = (id) => {
        console.log(`Date ${id} clicked`);
        const selectedDate = dates.find(date => date.id === id);
    
        if (selectedDate.description === '날짜와 시간을 입력할 수 있어요') {
            // 비어있는 날짜를 선택한 경우
            const firstEmptyIndex = dates.findIndex(date => date.description === '날짜와 시간을 입력할 수 있어요');
            if (firstEmptyIndex !== -1) {
                setSelectedDateId(dates[firstEmptyIndex].id);
                setViewState('selectDate'); // 날짜 선택 화면으로 전환
            }
        } else {
            // 기존 값이 있는 날짜를 선택한 경우
            setSelectedDateId(id);
            setViewState('selectDate'); // 시간 선택 화면으로 전환
        }
    };

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
          const updatedDates = [...dates];
          const targetIndex = selectedDateId
              ? updatedDates.findIndex(date => date.id === selectedDateId)
              : updatedDates.findIndex(date => date.description === '날짜와 시간을 입력할 수 있어요');

          if (targetIndex !== -1) {
              updatedDates[targetIndex] = { 
                  ...updatedDates[targetIndex], 
                  title: currentDate, 
                  description: '' 
              };
              setDates(updatedDates);
              setSelectedDateId(updatedDates[targetIndex].id);
              setViewState('selectTime');
          }
      }
  };
    
    // 시간 선택
    const handleTimeChange = (newTimeData) => {
      setCurrentTime(newTimeData);
  };
      
// 시간 저장 및 일정 저장 API 호출
const handleSaveTime = async () => {
  if (selectedDateId && currentTime) {
      const formattedTime = `${String(currentTime.hour).padStart(2, '0')}:${String(currentTime.minute).padStart(2, '0')}:00`;
      const dateIndex = dates.findIndex(date => date.id === selectedDateId);

      if (dateIndex !== -1) {
          const dateTime = `${dates[dateIndex].title}T${formattedTime}`;
          const updatedDates = dates.map((date, index) =>
              index === dateIndex ? { ...date, description: dateTime } : date
          );

          setDates(updatedDates);
          setViewState('initial');
      }
  }
};

// initial 상태에서 일정 저장 버튼 클릭 시 API 호출
const handleSaveInitialState = async () => {
  try {
    // 날짜와 시간이 입력되지 않은 경우 null 처리
    const formattedDates = dates.map(date => date.description !== '날짜와 시간을 입력할 수 있어요' ? date.description : null);

    const requestData = {
      userId,
      meetDateFirst: formattedDates[0],
      meetDateSecond: formattedDates[1],
      meetDateThird: formattedDates[2],
    };

    await schedulePost(requestData.userId, requestData.meetDateFirst, requestData.meetDateSecond, requestData.meetDateThird);

    alert('일정이 저장되었습니다!');
  } catch (error) {
    console.error('일정 저장 실패:', error);
    console.log('userId 값:', userId); // userId 출력
  }
};




    const getDateMeetingSrc = (description, index) => {
        if (description === '날짜와 시간을 입력할 수 있어요') return meetingdate;
        const srcMapping = [first, second, third];
        return srcMapping[index] || meetingdate;
    };   

    const isDraggable = dates.some(date => date.description !== '날짜와 시간을 입력할 수 있어요');

    const onDragEnd = (result) => {
        if (!isDraggable) {
            console.warn("드래그가 비활성화되었습니다.");
            return;
        }
    
        if (!result.destination) {
            console.warn("No destination provided. Drag canceled.");
            return;
        }
    
    
        const updatedDates = Array.from(dates);
        const [removed] = updatedDates.splice(result.source.index, 1);
        updatedDates.splice(result.destination.index, 0, removed);

        setDates(updatedDates);
    };

      useEffect(() => {
        console.log("초기 dates 상태:", dates);
        console.log("초기 draggableId 목록:", dates.map(date => date.id));
      }, []);
      
  // 현재 선택된 날짜 가져오기
  const selectedDate = selectedDateId
  ? dates.find((date) => date.id === selectedDateId)?.title
  : null;

  const getButtonText = () => {
    const hasSavedDate = dates.some(date => date.description !== '날짜와 시간을 입력할 수 있어요');
    return hasSavedDate ? "저장하기" : "나중에 정할게요";
};

const handleBack = () => {
    switch (viewState) {
      case 'selectTime':
        setViewState('selectDate');
        break;
      case 'selectDate':
        setViewState('initial');
        break;
      default:
        break;
    }
  };

  

    return (
        <>
          <GlobalStyle />
          <Container>
                {viewState === 'initial' && (
                    <>
                    <Header title="코스 등록하기" />
                    <MeetingDateContainer>
                    <MeetingDateContainer2>
                        <DescriptionContainer>
                            <DescriptionTitle>만날 날짜를</DescriptionTitle>
                            <DescriptionTitle>선택해주세요.</DescriptionTitle>
                            <DescriptionContent>
                                만날 날짜가 확정되지 않았을 경우를 고려하여 날짜는 최대 3개까지 등록 가능합니다.
                            </DescriptionContent>
                        </DescriptionContainer>
                        <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="dates">
                {(provided) => (
                  <DateContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {dates.map((date, index) => (
                         <Draggable
                        key={String(date.id)} 
                        draggableId={String(date.id)} 
                        index={index}
                        isDragDisabled={!isDraggable}
                         >
                        {(provided) => (
                          <Date
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            selected={date.id === selectedDateId}
                            onClick={() => handleDateClick(date.id)}
                          >
                            <DateMeeting
                              src={getDateMeetingSrc(date.description, index)}
                              alt="meetingdate"
                            />
                            <TextWrapper>
                              <Text>
                                <Datetext>{date.title}</Datetext>
                                <Descriptiontext>{date.description}</Descriptiontext>
                              </Text>
                              <Ic_move
                                src={ic_move}
                                alt="ic_move"
                              />
                            </TextWrapper>
                          </Date>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </DateContainer>
                )}
              </Droppable>
            </DragDropContext>
          </MeetingDateContainer2>
                <ButtonContainer>
                    <Button text={getButtonText()} onClick={handleSaveInitialState} />
                </ButtonContainer>
                </MeetingDateContainer>
                    </>
                )}

                {viewState === 'selectDate' && (
                    <>
                    <StateHeader
                    title='코스 등록하기'
                    onBack={handleBack}
                  />
                    <MeetingDateContainer>
                    <DescriptionContainer2>
                    <Bgpurple src={backgroundpurple} alt="purlplecircle" />
                    <Bgblue src={backgroundblue} alt="bluecircle" />
                        <DescriptionTitle>날짜를</DescriptionTitle>
                        <DescriptionTitle>선택해주세요.</DescriptionTitle>
                    </DescriptionContainer2>
                    <CalendarContainer>
                        <CalendarBackground>
                            <Calendar onDateClick={handleCalendarDateClick} />
                        </CalendarBackground>
                    </CalendarContainer>
                    <ButtonContainer>
                        <Button 
                            text="저장하기" 
                            onClick={handleSaveDate}
                            /*bgColor={isDateSelected ? "#D6EBFF" : "#F1F1F1"} 
                            textColor={isDateSelected ? "#376FA3" : "#666666"} 
                            onClick={isDateSelected ? handleDateSelection : null} 
                            disabled={!isDateSelected}*/
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
                            <Blurstar src={blurstar} alt="blurstar"/>
                            <Heart src={heart} alt="heart"/>
                            <DescriptionTitle>시간을</DescriptionTitle>
                            <DescriptionTitle>선택해주세요.</DescriptionTitle>
                        </DescriptionContainer2>
                        <TimeContainer>
                            <TimeBackground>
                            <DateContainer2>
                               <Description>선택된 날짜</Description>
                               <DateDisplay>{selectedDate || '날짜를 선택하세요'}</DateDisplay>
                            </DateContainer2>
                                <Time
                                    onTimeChange={handleTimeChange}
                                    selectedDate={selectedDate} // 여기서 선택된 날짜 전달
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
        </Container>
        </>
    );
};

export default Meetingdate;







