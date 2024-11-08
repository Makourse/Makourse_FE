import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: ${(props) => props.width || '80%'};
  height: 3.375rem;
  background-color: ${(props) => props.bgColor || '#D6EBFF'};
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.textColor || '#376FA3'};
`;

const MyButton = ({ text, bgColor, textColor, width }) => {
  return <Button bgColor={bgColor} textColor={textColor} width={width}>{text}</Button>;
};

export default MyButton;

