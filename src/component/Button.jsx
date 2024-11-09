import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  width: 100%;
  height: 3.375rem;
  display: flex;
  justify-content: center;
`;

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
  return (
    <ButtonContainer>
      <Button bgColor={bgColor} textColor={textColor} width={width}>
        {text}
      </Button>
    </ButtonContainer>
  );
};

export default MyButton;


