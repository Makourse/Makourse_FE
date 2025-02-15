import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Button from '../../component/Button';
import Header from '../../component/Header';

import { getMyPlaces } from "../../api";

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
  font-weight: 600;
  font-size: 24px;
  color: black;
  line-height: 1.3;
`;

const DescriptionText2 = styled.p`
  color: black;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
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
  font-size: 18px;
  font-weight: 500;
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
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();


  // 백엔드 API에서 데이터 불러오기
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getMyPlaces(); // API 호출
        setPlaces(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error("장소를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchPlaces();
  }, []);

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
          <FixedButtonContainer>
          <Button text="나만의 장소 저장하기" onClick={handleButtonClick} />
          </FixedButtonContainer>
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




