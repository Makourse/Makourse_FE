import React, { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../../component/Button';
import Header from '../../../component/Header';

import getPlaceSearch from '../../../components/Naverapi/PlaceSearch';

import star from '../../../assets/star.svg';
import search from '../../../assets/search.svg';
import deletex from '../../../assets/deletex.svg';

import "../../../component/Fonts.css";

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

const SearchBoxContainer = styled.div`
  position: relative;
  width: 90%;
  height: 60px;
  margin-top: 1rem;
`;

const SearchBox = styled.input`
  width: 100%;
  height: 100%;
  border: 0.5px solid #999999;
  border-radius: 0.5rem;
  padding: 0 0.625rem;
  font-size: 1rem;
  font-family:'Pretendard';
  box-sizing: border-box;
  outline: none;
  ::placeholder {
    color: #999999;
  }
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  cursor: pointer;
`;

const DeleteIcon = styled.img`
  position: absolute;
  right: 16%;
  top: 50%;
  transform: translateY(-50%);
  width: 8%;
  cursor: pointer;
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TextContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 500;
  color: #2b2b2b;
  white-space: nowrap;
`;

const SuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;
const Suggestion = styled.div`
  padding: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #F1F1F1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0.5rem 0;
  gap:8px;
`;

const HighlightedText = styled.span`
  color: skyblue;
`;

const NormalText = styled.span`
  color: black;
`;

const PlaceTextTitle = styled.div`
  font-weight:500;
  font-size:1rem;
`;
const PlaceTextAddr = styled.div`
  font-weight:400;
  font-size:12px;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  width:100%;
  transform: translateX(-50%);
`;

const SetPlaceSave = () => {
  const location = useLocation();
  const { state } = location;
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  let searchTimeout = null;
  const scheduleId = state?.scheduleId;

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };
  
  // 장소 클릭 시 이동 부분 수정
  const handleSuggestionClick = (suggestions) => {
    const stateData = { 
      name: suggestions.title,
      address: suggestions.address,
      latitude: (suggestions.mapy / 1e7).toFixed(7), 
      longitude: (suggestions.mapx / 1e7).toFixed(7), 
      category: suggestions.category,
      searchQuery,
      scheduleId
    };
  
    navigate('/setplace/map', { state: stateData });
  };
  
  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);

    if (searchQuery.trim() !== '') {
      searchTimeout = setTimeout(async () => {
        try {
          const results = await getPlaceSearch(searchQuery);
          console.log("검색 결과:", results);
          setSuggestions(results.items || []);
        } catch (error) {
          console.error('검색 오류:', error);
          setSuggestions([]);
        }
      }, 2000); // 디바운싱 적용
    } else {
      setSuggestions([]);
    }

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  // Highlight matching parts of the text
  const highlightText = (text, query) => {
    if (!query) return <NormalText>{text}</NormalText>;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <HighlightedText key={index}>{part}</HighlightedText>
      ) : (
        <NormalText key={index}>{part}</NormalText>
      )
    );
  };

  return (
    <Container>
      <Header title="장소 등록하기" backUrl={scheduleId ? `/detail-course/${scheduleId}` : "/home"} />
      <MyplaceSaveContainer>
        <SearchBoxContainer>
          {searchQuery.length > 0 && (
            <DeleteIcon src={deletex} alt="delete" onClick={handleClearSearch} />
          )}
          <SearchBox
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="검색어를 입력하세요."
          />
          <SearchIcon src={search} alt="search" />
        </SearchBoxContainer>

        {searchQuery.length > 0 ? (
          <SuggestionContainer>
            {suggestions.map((suggestions, index) => (
              <Suggestion key={index} onClick={() => handleSuggestionClick(suggestions)}>
                <PlaceTextTitle>{highlightText(suggestions.title.replace(/<[^>]*>/g, ''), searchQuery)}</PlaceTextTitle>
                <PlaceTextAddr>{highlightText(suggestions.address, searchQuery)}</PlaceTextAddr>
              </Suggestion>
            ))}
          </SuggestionContainer>
        ) : (
          <Logo src={star} alt="star" />
        )}

        {searchQuery.length === 0 && (
          <TextContainer>장소를 검색해보세요.</TextContainer>
        )}
      </MyplaceSaveContainer>
      <FixedButtonContainer>
      <Button text="저장하기" bgColor="#F1F1F1" textColor="#666666" />
      </FixedButtonContainer>
    </Container>
  );
};

export default SetPlaceSave;




//input text기 deletex뚫고가지않게..