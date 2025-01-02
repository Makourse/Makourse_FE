import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '../assets/Ic_gnb_back.svg';

const BackButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(${backIcon});
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
`;

const Back = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return <BackButton onClick={goBack} />;
};

export default Back;