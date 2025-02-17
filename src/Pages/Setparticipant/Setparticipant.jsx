import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import Header from "../../component/Header";
import Profile from "../../assets/home/profile1.svg";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  height: 88px;
  padding: 0 24px;
  border-bottom: 1px solid #F1F1F1;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const MemberInfo = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const MemberRole = styled.div`
  font-size: 12px;
  color: #666;
  span {
    color: black;
  }
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
`;

const SetParticipant = ({ scheduleId }) => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/account/schedules/${scheduleId}/group`);
        const sortedMembers = response.data.memberships.map(m => ({
          id: m.id,
          name: m.user.name,
          role: m.role,
          isMe: m.user.id === "current_user_id" // 여기에 현재 사용자 ID 확인 로직 필요
        })).sort((a, b) => (a.isMe ? -1 : 1));
        setMembers(sortedMembers);
      } catch (error) {
        console.error("모임원을 불러오는 데 실패했습니다.", error);
      }
    })();
  }, [scheduleId]);

  const handleButtonClick = () => {
    navigate("/myplace/save");
  };

  return (
    <Container>
      <Header title="모임원 설정" />
      <MemberList>
        {members.map((member) => (
          <MemberItem key={member.id}>
            <ProfileImage src={Profile} alt="프로필" />
            <MemberInfo>
              <MemberName>
                {member.name} {member.isMe && "(나)"}
              </MemberName>
              <MemberRole>
                역할 | <span>{member.role}</span>
              </MemberRole>
            </MemberInfo>
          </MemberItem>
        ))}
      </MemberList>
      <FixedButtonContainer>
        <Button text="초대하기" onClick={handleButtonClick} />
      </FixedButtonContainer>
    </Container>
  );
};

export default SetParticipant;
