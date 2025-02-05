import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Header from "../../component/Header";
import Button from "../../component/Button";
import deletex from "../../assets/deletex.svg";
import ping from "../../assets/ping.svg";

import "../../component/Fonts.css";

const MapBox = styled.div`
  width: 100%;
  min-height: 60%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
`;

const SearchBoxContainer = styled.div`
  position: absolute;
  top: 63%;
  left: 50%;
  transform: translateX(-50%);
  width: 77%;
  z-index: 1000;
`;

const SearchBox = styled.input`
  width: 100%;
  height: 3.375rem;
  border: 0.5px solid #999999;
  border-radius: 0.5rem;
  padding: 0 0.625rem;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
  ::placeholder {
    color: #999999;
  }
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchListContainer = styled.div`
  margin-top: 30px;
  height: 200px;
  overflow-y: auto;
  background-color: white;
  padding-bottom: 80px;
`;

const Suggestion = styled.div`
  display:flex;
  flex-direction: column;
  gap:8px;
  padding: 1rem;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const DeleteIcon = styled.img`
  position: absolute;
  right: 8%;
  top: 50%;
  transform: translateY(-50%);
  width: 8%;
  cursor: pointer;
`;

const DescriptionBox = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    position: absolute;
    width:226px;
    top: 57%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    border-radius: 0.5rem;
    background-color: #FFFFFF;
`;

const PingIcon = styled.img`
  padding: 0.3rem;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  width:90%;
  padding-top:1%;
`;



const BottomContainer = styled.div`
  background-color: #FAFAFA;
  border-radius: 1.5rem;
  width: 100%;
  top:60%;
  bottom: 0;
  box-shadow: 0px -4px 8px 0px #0000000A;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute; /* 절대 위치로 변경 */
  //border:2px solid blue;
`;

const BottomTextContainer=styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  height: 70%;
  width: 100%;
  gap: 0.5rem;
  //border:2px solid red;
`;

const InputField = styled.input`
  height: 2rem;
  width: 86%;
  margin-bottom: 0.5rem;
  padding: 0.4rem;
  border: none;
  border-bottom: 1.5px solid #999999;
  font-family:'Pretendard';
  font-size:1rem;
  font-weight:500;

  outline: none; /* 포커스 시 테두리 제거 */
  &:focus {
    outline: none; /* 추가적으로 포커스 상태에서도 테두리 제거 */
  }
`;

const BottomTitle=styled.div`
  width: 86%;
  font-size: 1.25rem;
  font-weight:600;
`;
const BottomAddr=styled.div`
  font-size: 1rem;
  font-weight:500;
  color:#666666;
  padding-left: 0.5rem;
`;
const BottomAddrContainer=styled.div`
  width: 90%;
 display:flex;
 align-items: center;
 //border: 2px solid red;
`;

const FixedButtonContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  width:100%;
  transform: translateX(-50%);
`;

const PlaceTextTitle = styled.div`
  font-weight:500;
  font-size:1rem;
`;
const PlaceTextAddr = styled.div`
  font-weight:400;
  font-size:12px;
`;

const Myplacemap = () => {
  const location = useLocation();
  const { state } = location;
  const initialLatitude = state?.latitude || 37.557527;
  const initialLongitude = state?.longitude || 126.925595;

  const [currentState, setCurrentState] = useState(1); // 1: 검색 단계, 2: 장소 이름 수정 단계
  const [searchQuery, setSearchQuery] = useState(state?.searchQuery || "");
  const [suggestions, setSuggestions] = useState([]);
  const [map, setMap] = useState(null); // 지도 객체를 상태로 저장
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
  });

  const [marker, setMarker] = useState(null);
  const [newPlaceName, setNewPlaceName] = useState("");
  const [selectedPlaceName, setSelectedPlaceName] = useState(state?.placeName || "");
  const [allSuggestions, setAllSuggestions] = useState([
    { name: "홍대입구", address: "서울시 마포구 양화로 100 홍대입구역", latitude: 37.557527, longitude: 126.925595 },
    { name: "서울숲", address: "서울시 성동구 뚝섬로 273 서울숲역", latitude: 37.544579, longitude: 127.041268 },
    { name: "남산타워", address: "서울시 중구 남산동2가 105-1", latitude: 37.551169, longitude: 126.988227 },
    { name: "경복궁", address: "서울시 종로구 사직로 161", latitude: 37.579617, longitude: 126.977041 },
  ]);

  useEffect(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(initialLatitude, initialLongitude),
      zoom: 15,
    };

    const newMap = new naver.maps.Map("naver-map", mapOptions);
    setMap(newMap);

    const newMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(initialLatitude, initialLongitude),
      map: newMap,
    });
    setMarker(newMarker);

    naver.maps.Event.addListener(newMap, "click", (e) => {
      const clickedLatitude = e.coord.lat();
      const clickedLongitude = e.coord.lng();

      newMarker.setPosition(new naver.maps.LatLng(clickedLatitude, clickedLongitude));
      setSelectedLocation({ latitude: clickedLatitude, longitude: clickedLongitude });
    });
  }, [initialLatitude, initialLongitude]);

  useEffect(() => {
    if (searchQuery) {
      const filteredSuggestions = allSuggestions.filter(
        (item) =>
          item.name.includes(searchQuery) || item.address.includes(searchQuery)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    const { latitude, longitude, name } = suggestion;
  
    if (map) {
      map.setCenter(new naver.maps.LatLng(latitude, longitude)); // 지도 중심 변경
      map.setZoom(15);
  
      new naver.maps.Marker({
        position: new naver.maps.LatLng(latitude, longitude),
        map: map,
      });
    }
  
    // 선택된 위치 및 장소 이름 업데이트
    setSelectedLocation({ latitude, longitude });
    setSelectedPlaceName(name); // name을 올바르게 설정
  };
  
  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  const navigate = useNavigate();

  const handleAddPlace = () => {
    const newPlace = {
      name: newPlaceName || selectedPlaceName, 
      address: "아무주소",
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };

    setAllSuggestions((prev) => [...prev, newPlace]);
    setNewPlaceName("");
    navigate('/myplace', { state: { newPlace } });
  };

  return (
    <Container>
      <Header title="나만의 장소 저장하기" />
      <MapBox id="naver-map" style={currentState === 3 ? { height: '100%' } : {}} />
  
      {currentState === 1 && (
        <>
          <SearchBoxContainer>
            {searchQuery.length > 0 && (
              <DeleteIcon src={deletex} alt="delete" onClick={handleClearSearch} />
            )}
            <SearchBox
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요."
            />
          </SearchBoxContainer>
  
          <DescriptionBox>
            <PingIcon src={ping} alt="ping" />
            화살표를 움직여 위치를 변경할 수 있어요
          </DescriptionBox>
          {suggestions.length > 0 && (
            <SearchListContainer>
              {suggestions.map((suggestion, index) => (
                <Suggestion
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    backgroundColor:
                      suggestion.latitude === selectedLocation.latitude &&
                      suggestion.longitude === selectedLocation.longitude
                        ? "#EDF3F8A6"
                        : "#ffffff",
                  }}
                >
                  <PlaceTextTitle>{suggestion.name}</PlaceTextTitle>
                  <PlaceTextAddr>{suggestion.address}</PlaceTextAddr>
                </Suggestion>
              ))}
            </SearchListContainer>
          )}
          <FixedButtonContainer>
          <Button text="선택하기" bgColor="#D6EBFF" onClick={() => setCurrentState(2)} />
          </FixedButtonContainer>
        </>
      )}
  
      {currentState === 2 && (
        <BottomContainer>
          <BottomTextContainer>
              <BottomTitle>나만의 장소</BottomTitle>
            <InputField
              value={newPlaceName !== "" ? newPlaceName : selectedPlaceName} // 조건 수정
              onChange={(e) => setNewPlaceName(e.target.value)}
              placeholder="장소 이름을 입력하세요"
            />
            <BottomAddrContainer>
              <PingIcon src={ping} alt="ping" />
              <BottomAddr>주소예시불러와야함</BottomAddr>
            </BottomAddrContainer>
            <FixedButtonContainer>
              <ButtonBox>
              <Button text="닫기" width="93%" bgColor="#F1F1F1" textColor="#666666"  onClick={() => setCurrentState(3)} />
              <Button text="저장하기" width="93%" bgColor="#D6EBFF"  onClick={handleAddPlace} />
              </ButtonBox>
            </FixedButtonContainer>
          </BottomTextContainer>
        </BottomContainer>
      )}
  
      {currentState === 3 && (
        null
      )}
    </Container>
  );  
};  

export default Myplacemap;

// state2에서 닫기, 저장하기버튼이 이상함.. 뭘해도 거리가 안좁혀짐
// 폰트, bottomtitle굵기, 반응형 디테일들,,
// 추후 백엔드 연결시에 주소 받아와서 역지오코딩, 새로 추가한 장소 백엔드 올리기 등등 로직 구현
// 핑 이동은 가능한데 나중에 핑 찍힌곳 좌표로 주소 알아내서 적?기? 그런식으로 없는장소도 추가할 수 있도록록