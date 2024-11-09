import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/Button';
import Header from '../../component/Header';

import logo from '../../assets/logo1 2.svg';
import backgroundblue from '../../assets/bg_mypage3_bggra1_blue.svg';
import backgroundpurple from '../../assets/bg_mypage3_bggra1_purple.svg';

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

const Myplace = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/myplace/save');
  };

  return (
    <Container>
      <Header title="나만의 장소" />
      <MyplaceContainer>
        {places.length === 0 ? (
          <>
            <DescriptionContainer>
              <DescriptionText1>가고 싶었던 곳을 <br /> 저장하고 코스에 반영해요</DescriptionText1>
              <DescriptionText2>평소에 가고 싶은 곳이 있었다면 저장해 보아요.<br />자도에 나오지 않는 곳도 저장할 수 있어요.</DescriptionText2>
            </DescriptionContainer>
            {/* places가 없을 때만 로고와 배경 이미지 렌더링 */}
            <Logo src={logo} alt="logo" />
            <TextContainer>아직 저장된 장소가 없어요</TextContainer>
            <Bgpurple src={backgroundpurple} alt="purlplecircle" />
            <Bgblue src={backgroundblue} alt="bluecircle" />
          </>
        ) : (
          <ul>
            {places.map((place, index) => (
              <li key={index}>{place}</li>
            ))}
          </ul>
        )}
      </MyplaceContainer>
      <Button text="나만의 장소 저장하기" onClick={handleButtonClick} />
    </Container>
  );
};

export default Myplace;

