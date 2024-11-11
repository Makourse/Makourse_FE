import React, { useState } from 'react'; 
import styled from 'styled-components';
import Button from '../../component/Button';
import Header from '../../component/Header';

import star from '../../assets/star.svg';
import backgroundblue from '../../assets/bg_mypage3_bggra1_blue.svg';
import backgroundpurple from '../../assets/bg_mypage3_bggra1_purple.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
`;

const MyplaceSaveContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Search = styled.input`
  width: 90%;
  height: 10%;
  margin-top: 1rem;
  gap: 12px;
  border: 0.5px solid #999999;
  border-radius: 0.5rem;
  //padding: 10px;
  font-size: 1rem;
  outline: none;
  ::placeholder {
    color: #888;
  }
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 입력창 아래 그림자 */
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

const MyplaceSave = () => {
  return (
    <Container>
      <Header title="나만의 장소" />
      <MyplaceSaveContainer>
        <Search placeholder="검색어를 입력하세요." />
        <Logo src={star} alt="star" />
        <TextContainer>장소를 검색해보세요.</TextContainer>
        <Bgpurple src={backgroundpurple} alt="purlplecircle" />
        <Bgblue src={backgroundblue} alt="bluecircle" />
      </MyplaceSaveContainer>
      <Button text="저장하기" bgColor="#F1F1F1" />
    </Container>
  );
};

export default MyplaceSave;
