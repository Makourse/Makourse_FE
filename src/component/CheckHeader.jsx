import React from "react";
import styled from "styled-components";

const SelectionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(4px);
  z-index: 2;
`;

const CheckAllButton = styled.img`
  width: 75px;
  height: 36px;
  margin-left: 24px; 
  cursor: pointer;
`;

const DoneButton = styled.div`
  font-size: 14px;
  color: #376FA3;
  cursor: pointer;
  padding: 8px 16px;
  position: absolute;
  right: 24px;
`;

const CheckHeader = ({ onCheckAll, onDone }) => {
  return (
    <SelectionContainer>
      <CheckAllButton src="/btn_allcheck.svg" alt="전체 선택" onClick={onCheckAll} />
      <DoneButton onClick={onDone}>완료</DoneButton>
    </SelectionContainer>
  );
};

export default CheckHeader;
