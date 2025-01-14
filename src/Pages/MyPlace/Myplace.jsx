import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Button from '../../component/Button';
import Header from '../../component/Header';

import logo from '../../assets/logo1 2.svg';
import backgroundblue from '../../assets/bg_mypage3_bggra1_blue.svg';
import backgroundpurple from '../../assets/bg_mypage3_bggra1_purple.svg';
import myplaceimg from '../../assets/myplaceimg.svg';

import "../../component/Fonts.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
`;

const MyplaceContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  padding-left: 3rem;
  display: flex;
  flex-direction: column;
`;

const DescriptionText1 = styled.p`
  padding-top: 5%;
  font-size: 5.5vw;
  font-weight: bold;
  color: black;
`;

const DescriptionText2 = styled.p`
  font-size: 3.5vw;
  color: black;
  margin-top: 1rem;
`;

const Logo = styled.img`
  width: 40vw;
  max-width: 300px;
  margin-top: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const TextContainer = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4vw;
  color: black;
  white-space: nowrap;
`;

const PlaceContainer = styled.div`
   width: 90%;
   padding: 0.7rem;
   border-bottom: 1px solid #F1F1F1;
   display: flex;
   align-items: center;
   margin: 0.5rem 0;
`;

const PlaceTextContainer = styled.div`
   display: flex;
   flex-direction: column;
   margin-left: 1rem;
   gap:8px;
`;
const PlaceTextTitle = styled.div`
  font-weight:500;
  font-size:1rem;
`;
const PlaceTextAddr = styled.div`
  font-weight:400;
  font-size:12px;
`;

const PlaceImg = styled.img`
   width: 40px;
   height: 40px;
   border-radius: 50%;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  width:100%;
  transform: translateX(-50%);
`;

const Myplace = () => {
  const [places, setPlaces] = useState([
    { name: "홍대입구", address: "서울시 마포구 양화로 100 홍대입구역", latitude: 37.557527, longitude: 126.925595, image: null },
  ]); // 더미 데이터
  const navigate = useNavigate();
  const location = useLocation();

  // 새로운 장소를 추가하는 로직
  useEffect(() => {
    if (location.state?.newPlace) {
      setPlaces((prevPlaces) => {
        // 중복 방지: 동일한 이름과 주소의 장소가 이미 있는지 확인
        const isDuplicate = prevPlaces.some(
          (place) =>
            place.name === location.state.newPlace.name &&
            place.address === location.state.newPlace.address
        );
        if (!isDuplicate) {
          return [...prevPlaces, location.state.newPlace];
        }
        return prevPlaces;
      });

      // 상태 초기화 (중복 추가 방지)
      navigate('/myplace', { replace: true });
    }
  }, [location.state, navigate]);

  const handleButtonClick = () => {
    navigate('/myplace/save');
  };

  return (
    <Container>
      <Header title="나만의 장소" />
        {places.length === 0 ? (
          <>
          <MyplaceContainer>
          <DescriptionContainer>
              <DescriptionText1>가고 싶었던 곳을 <br /> 저장하고 코스에 반영해요</DescriptionText1>
              <DescriptionText2>평소에 가고 싶은 곳이 있었다면 저장해 보아요.<br />자도에 나오지 않는 곳도 저장할 수 있어요.</DescriptionText2>
            </DescriptionContainer>
            <Logo src={logo} alt="logo" />
            <TextContainer>아직 저장된 장소가 없어요</TextContainer>
            <Bgpurple src={backgroundpurple} alt="purlplecircle" />
            <Bgblue src={backgroundblue} alt="bluecircle" />
          </MyplaceContainer>
          <Button text="나만의 장소 저장하기" onClick={handleButtonClick} />
          </>
        ) : (
          <>
          <MyplaceContainer>
          {places.map((place, index) => (
              <PlaceContainer key={index}>
                <PlaceImg src={place.image || myplaceimg} alt="Place Image" />
                <PlaceTextContainer>
                  <PlaceTextTitle>{place.name}</PlaceTextTitle>
                  <PlaceTextAddr>{place.address}</PlaceTextAddr>
                </PlaceTextContainer>
              </PlaceContainer>
            ))}
          </MyplaceContainer>
          <FixedButtonContainer>
          <Button text="나만의 장소 추가하기" onClick={handleButtonClick} />
          </FixedButtonContainer>
          </>
        )}
    </Container>
  );
};

export default Myplace;




