import React from 'react';
import styled from 'styled-components';
import backIcon from '../assets/home/back.svg';
import "./Fonts.css"

const Container = styled.header`
    display: flex;
    align-items: center;
    padding: 16px;
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #fff;
`;

const BackButton = styled.img`
    position: absolute;
    left: 20px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
`;

const HeaderTitle = styled.h1`
    flex: 1;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    color: #000;
`;

const StateHeader = ({ title, onBack }) => {
    return (
      <Container>
        <BackButton onClick={onBack} src={backIcon} />
        <HeaderTitle>{title}</HeaderTitle>
      </Container>
    );
  };
  
  export default StateHeader;
  
