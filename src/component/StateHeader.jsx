import React from 'react';
import styled from 'styled-components';
import backIcon from '../assets/home/back.svg';
import "./Fonts.css"

const Container = styled.header`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  box-sizing: border-box;
  font-size: 1.25rem;
  //border: 2px solid red;
  font-family:'Pretendard';
  font-weight:600;
`;

const BackButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(${backIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  position: absolute;
  left: 1rem;
`;

const HeaderTitle = styled.h1`
  font-weight: 600; 
  font-size: 20px;
  color: #000;
  margin: 0;
`;

const StateHeader = ({ title, onBack }) => {
    return (
      <Container>
        <BackButton onClick={onBack} />
        <HeaderTitle>{title}</HeaderTitle>
      </Container>
    );
  };
  
  export default StateHeader;
  
