import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '../assets/back.svg';

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

const Header = ({ title }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackButton onClick={goBack} />
      <HeaderTitle>{title}</HeaderTitle>
    </Container>
  );
};

export default Header;
