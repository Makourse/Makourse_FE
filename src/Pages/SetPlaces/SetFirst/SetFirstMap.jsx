import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Header from "../../../component/Header";
import Button from "../../../component/Button";
import deletex from "../../../assets/deletex.svg";
import ping from "../../../assets/ping.svg";
import getPlaceSearch from '../../../components/Naverapi/PlaceSearch';
import getAddressFromCoords from '../../../components/Naverapi/ReverseGeocoding';
import { updateCourse } from "../../../api";

import "../../../component/Fonts.css";

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
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
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
  background-color: #FFFFFF;
  border-radius: 1.5rem;
  width: 100%;
  height: 265px;
  bottom: 0;
  box-shadow: 0px -4px 8px 0px #0000000A;
  z-index: 100;
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const BottomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  width: 100%;
  gap: 0.5rem;
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
  margin-top: 5px;
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

const SetFirstMap = () => {
  const location = useLocation();
  const { state } = location;
  const scheduleId = state?.scheduleId;

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: state?.latitude || 37.557527,
    longitude: state?.longitude || 126.925595,
    place_name: state?.name || null,
    address: state?.address || null,
  });

  const [currentState, setCurrentState] = useState(1);
  const [searchQuery, setSearchQuery] = useState(state?.searchQuery || "");
  const [suggestions, setSuggestions] = useState([]);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [newPlaceName, setNewPlaceName] = useState(
    (selectedLocation.place_name || '').replace(/<[^>]*>/g, '')
  );
  
  const [allSuggestions, setAllSuggestions] = useState([]);

  // debounce를 위한 새로운 state와 useEffect 추가
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const mapOptions = {
      center: new naver.maps.LatLng(selectedLocation.latitude, selectedLocation.longitude),
      zoom: 15,
    };

    const newMap = new naver.maps.Map("naver-map", mapOptions);
    setMap(newMap);

    const newMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(selectedLocation.latitude, selectedLocation.longitude),
      map: newMap,
    });
    setMarker(newMarker);

    naver.maps.Event.addListener(newMap, "click", (e) => {
      const clickedLatitude = e.coord.lat();
      const clickedLongitude = e.coord.lng();

      console.log("마커 위치 변경:", { latitude: clickedLatitude, longitude: clickedLongitude });


      newMarker.setPosition(new naver.maps.LatLng(clickedLatitude, clickedLongitude));
      setSelectedLocation({ latitude: clickedLatitude, longitude: clickedLongitude, name: null, address: null });
    });
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  useEffect(() => {
    if (searchQuery) {
      const filteredSuggestions = allSuggestions.filter(
        (item) => item.name.includes(searchQuery) || item.address.includes(searchQuery)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // 검색어 변경 시 debounce 처리
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (searchQuery.length > 0) {
      const timeout = setTimeout(() => {
        handleSearch();
      }, 2000); // 2초 동안 입력이 없으면 검색 실행
      setSearchTimeout(timeout);
    }
  }, [searchQuery]);

  const handleSuggestionClick = (suggestion) => {
    const { latitude, longitude, name, address } = suggestion;
  
    if (map) {
      const position = new naver.maps.LatLng(latitude, longitude);
      map.setCenter(position);
      map.setZoom(15);
  
      if (marker) {
        marker.setPosition(position);
      } else {
        const newMarker = new naver.maps.Marker({
          position: position,
          map: map,
        });
        setMarker(newMarker);
      }
    }
  
    setSelectedLocation({ 
      latitude, 
      longitude, 
      place_name: name,
      address: address 
    });
    setNewPlaceName(name);
    console.log("선택된 위치_myplacemap:", { latitude, longitude, name, address });
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  const navigate = useNavigate();

  const handleAddPlace = async() => {
    const newPlace = {
      meet_place: newPlaceName || selectedLocation.place_name, 
      address: selectedLocation.address || "주소 없음",
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };
    console.log("저장할 장소:", newPlace); // 디버깅용

    try {
      // 백엔드에 데이터 저장 요청
      const response = await updateCourse(scheduleId, newPlace);
      console.log("저장된 장소 응답:", response); // API 응답 확인
  
      // 저장된 장소를 기존 목록에 추가
      setAllSuggestions((prev) => [...prev, response]);
  
      // 입력 필드 초기화 및 페이지 이동
      setNewPlaceName("");
      navigate(`/detail-course/${scheduleId}`);
  
    } catch (error) {
      console.error("장소 저장 중 오류 발생:", error);
      alert("장소를 저장하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleSearch = async () => {
    try {
      const response = await getPlaceSearch(searchQuery);
      
      // response와 items 배열이 존재하는지 확인
      if (response && response.items && Array.isArray(response.items)) {
        const formattedResults = response.items.map(item => ({
          name: item.title.replace(/<[^>]*>/g, ''), // HTML 태그 제거
          address: item.roadAddress || item.address,
          latitude: parseFloat(item.mapy) / 10000000, // 네이버 좌표를 위도로 변환
          longitude: parseFloat(item.mapx) / 10000000, // 네이버 좌표를 경도로 변환
          category: item.category,
          telephone: item.telephone
        }));
        setSuggestions(formattedResults);
      } else {
        console.log("검색 결과가 없습니다:", response);
        setSuggestions([]);
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setSuggestions([]);
    }
  };

  // SearchBox 부분 수정
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setSuggestions([]);
    }
  };

  // 1. 검색창에 검색한다
  // 2. 2초간 검색어 입력이 없으면 검색으로 인식한다
  // 3. 검색 api를 호출하여 검색결과를 받는다.
  // 4. 검색결과를 리스트로 보여준다.

  return (
    <Container>
      <Header title="만날 장소 등록하기" backUrl={scheduleId ? `/detail-course/${scheduleId}` : "/home"} />
      <MapBox id="naver-map" style={currentState === 3 ? { height: '100%' } : {}} />
  
      {currentState === 1 && (
        <>
          <SearchBoxContainer>
            {searchQuery.length > 0 && (
              <DeleteIcon src={deletex} alt="delete" onClick={handleClearSearch} />
            )}
            <SearchBox
              value={searchQuery}
              onChange={handleSearchInputChange}
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
            <BottomTitle>만날 장소</BottomTitle>
            <InputField
              value={newPlaceName}
              onChange={(e) => setNewPlaceName(e.target.value)}
              placeholder="장소 이름을 입력하세요"
            />
            <BottomAddrContainer>
              <PingIcon src={ping} alt="ping" />
              <BottomAddr>{selectedLocation.address || "주소 없음"}</BottomAddr>
            </BottomAddrContainer>
            <FixedButtonContainer>
              <ButtonBox>
                <Button text="닫기" width="93%" bgColor="#F1F1F1" textColor="#666666" onClick={() => setCurrentState(3)} />
                <Button text="저장하기" width="93%" bgColor="#D6EBFF" onClick={handleAddPlace} />
              </ButtonBox>
            </FixedButtonContainer>
          </BottomTextContainer>
        </BottomContainer>
      )}
  
      {currentState === 3 && null}
    </Container>
  );  
};  

export default SetFirstMap;