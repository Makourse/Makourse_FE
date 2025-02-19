import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../../component/Button";
import Header from "../../component/Header";
import CheckHeader from "../../component/CheckHeader";
import Profile from "../../assets/home/profile1.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
`;

const SelectionContainer = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(4px);
  z-index: 2;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ isSelecting }) => (isSelecting ? "48px" : "0")};
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  height: 88px;
  padding: 0 24px;
  border-bottom: 1px solid #f1f1f1;
  background: ${({ selected }) => (selected ? "#EDF3F8A6" : "transparent")};
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
  margin-bottom: 8px;
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
  display: flex;
  justify-content: center;
`;

const ActionButton = styled.div`
  width: 152px;
  height: 54px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const DeleteActionButton = styled.button`
  width: 80%;
  height: 3.375rem;
  background-color: ${({ disabled }) => (disabled ? "#F1F1F1" : "#376FA3")};
  border-radius: 0.5rem;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ disabled }) => (disabled ? "#666666" : "white")};
  font-family: 'Pretendard';
  font-weight: 600;
`;

const DeleteButton = styled.img`
  position: fixed;
  bottom: calc(1.5rem + 64px);
  right: 24px;
  width: 136px;
  height: 36px;
  cursor: pointer;
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

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 417px;
  background: white;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const InputField = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid #999999;
  margin-top: 4px;
  padding-left: 8px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 28px;
  border: none;
  outline: none;
  font-size: 16px;
  padding-left: 8px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const InviteModal = ({ onClose, groupId }) => {
  const [userId, setUserId] = useState("");  // 사용자 아이디
  const [code, setCode] = useState("123456");  // 예시로 고정된 초대 코드
  const [isInviting, setIsInviting] = useState(false);  // 초대 중 여부 확인

  const handleInvite = async () => {
    setIsInviting(true);
    try {
      const response = await axios.post(
        `/account/groups/${groupId}/join`,
        {
          code,
          user_id: userId, 
        }
      );
      console.log("초대 성공:", response.data);
      alert("초대가 성공적으로 전송되었습니다.");
      onClose(); 
    } catch (error) {
      console.error("초대 실패:", error);
      alert("초대 전송에 실패했습니다.");
    } finally {
      setIsInviting(false);
    }
  };
  return (
    <Overlay>
      <h2 style={{ marginLeft: "8px", fontSize: "24px" }}>모임원 초대</h2>
      <p style={{ marginLeft: "8px", fontSize: "14px", marginTop: "8px" }}>
        코스 주소를 복사하여 전달하거나 회원 아이디를 입력하여 초대할 수 있어요.
      </p>
      <h3 style={{ marginLeft: "8px", fontSize: "16px", marginTop: "32px" }}>코스 주소</h3>
      <InputField>
        www.naver.com
      </InputField>
      <h3 style={{ marginLeft: "8px", fontSize: "16px", marginTop: "36px" }}>아이디 입력</h3>
      <InputField>
      <TextInput
        placeholder="초대할 아이디를 입력해주세요."
        value={userId}
        onChange={(e) => setUserId(e.target.value)}  
      />
      </InputField>
      <ButtonRow>
        <ActionButton style={{ background: "#F1F1F1", color: "#666666" }} onClick={onClose}>닫기</ActionButton>
        <ActionButton
          style={{ background: "#D6EBFF", color: "#376FA3" }}
          onClick={handleInvite}
          disabled={isInviting || !userId} 
        >
          {isInviting ? "초대 중..." : "초대하기"}
        </ActionButton>
      </ButtonRow>
    </Overlay>
  );
};

const SetParticipant = () => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [members, setMembers] = useState([
    {
      id: "1",
      name: "김민수",
      role: "모임장",
      isMe: true,
    },
    {
      id: "2",
      name: "박민지",
      role: "모임원",
      isMe: false,
    },
  ]);

  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting);
    setSelectedMembers([]); 
  };

  const handleMemberClick = (id, isLeader) => {
    if (!isSelecting || isLeader) return; // 모임장(자기 자신)을 선택하지 않도록
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  };

  const handleCheckAll = () => {
    setSelectedMembers(members.filter((m) => !m.isMe).map((m) => m.id));
  };

  const handleDeleteMembers = () => {
    setMembers(members.filter((member) => !selectedMembers.includes(member.id)));
    setSelectedMembers([]); 
    setIsSelecting(false);
  };

  return (
    <Container>
      <Header title="모임원 설정" />
      {isSelecting && <CheckHeader onCheckAll={handleCheckAll} onDone={toggleSelectMode} />}  {/* 변경된 부분 */}
      
      <MemberList isSelecting={isSelecting}>
        {members.map((member) => (
          <MemberItem
            key={member.id}
            selected={selectedMembers.includes(member.id)}
            onClick={() => handleMemberClick(member.id, member.isMe)}
          >
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
      {!isSelecting && <DeleteButton src="/participantbtn_delete.svg" alt="모임원 내보내기" onClick={toggleSelectMode} />}
      <FixedButtonContainer>
        {!isSelecting && <Button text="초대하기" onClick={() => setIsInviteOpen(true)} backgroundColor="#F1F1F1" color="#666666" />}
        {isSelecting && (
          <DeleteActionButton disabled={selectedMembers.length === 0} onClick={handleDeleteMembers}>
            내보내기
          </DeleteActionButton>
        )}
      </FixedButtonContainer>
      {isInviteOpen && <InviteModal onClose={() => setIsInviteOpen(false)} />}
    </Container>
  );
};

export default SetParticipant;