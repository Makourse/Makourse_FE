import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../component/Button';
import Header from '../../component/Header';

import star from '../../assets/star.svg';
import search from '../../assets/search.svg';
import deletex from '../../assets/deletex.svg';

import "../../component/Fonts.css";

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
  height: 11%;
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
  width: 8%;
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
  width: 40vw;
  max-width: 300px;
  margin-top: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TextContainer = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  font-weight: 500;
  color: black;
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

const MyplaceSave = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const allSuggestions = [
    { name: "홍대입구", address: "서울시 마포구 양화로 100 홍대입구역", latitude: 37.557527, longitude: 126.925595 },
    { name: "서울숲", address: "서울시 성동구 뚝섬로 273 서울숲역", latitude: 37.544579, longitude: 127.041268 },
    { name: "남산타워", address: "서울시 중구 남산동2가 105-1", latitude: 37.551169, longitude: 126.988227 },
    { name: "경복궁", address: "서울시 종로구 사직로 161", latitude: 37.579617, longitude: 126.977041 },
  ];

  const decomposeSearchQuery = (query) => query.split('').map(char => char.toLowerCase());

  useEffect(() => {
    if (searchQuery) {
      const decomposedQuery = decomposeSearchQuery(searchQuery);
      const filteredSuggestions = allSuggestions.filter((item) => {
        const isMatch = decomposedQuery.every(char => 
          item.name.toLowerCase().includes(char) || item.address.toLowerCase().includes(char)
        );
        return isMatch;
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleNavigateToMap = () => {
    navigate('/myplace/map', { state: { searchQuery } }); // 검색어 전달
  };
  
  // 장소 클릭 시 이동 부분 수정
  const handleSuggestionClick = (suggestion) => {
    navigate('/myplace/map', { 
      state: { 
        latitude: suggestion.latitude, 
        longitude: suggestion.longitude, 
        searchQuery 
      }
    });
  };
  

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
      <Header title="나만의 장소 저장하기" />
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
            {suggestions.map((suggestion, index) => (
              <Suggestion key={index} onClick={() => handleSuggestionClick(suggestion)}>
                <PlaceTextTitle>{highlightText(suggestion.name, searchQuery)}</PlaceTextTitle>
                <PlaceTextAddr>{highlightText(suggestion.address, searchQuery)}</PlaceTextAddr>
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

export default MyplaceSave;




//input text기 deletex뚫고가지않게..