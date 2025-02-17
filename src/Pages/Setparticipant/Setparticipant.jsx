import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../component/Button';
import Header from '../../component/Header';

import { getMyPlaces } from "../../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  position: relative;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
`;

const Setparticipant = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getMyPlaces();
        setPlaces(response.data);
      } catch (error) {
        console.error("장소를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    if (location.state?.newPlace) {
      setPlaces((prevPlaces) => {
        const isDuplicate = prevPlaces.some(
          (place) =>
            place.name === location.state.newPlace.name &&
            place.address === location.state.newPlace.address
        );
        if (!isDuplicate) {
          return [...prevPlaces, location.state.newPlace];
        }
        return prevPlaces;
      });

      navigate('/myplace', { replace: true });
    }
  }, [location.state, navigate]);

  const handleButtonClick = () => {
    navigate('/myplace/save');
  };

  return (
    <Container>
      <Header title="같이 코스 짜기" />
      <FixedButtonContainer>
        <Button text="나만의 장소 저장하기" onClick={handleButtonClick} />
      </FixedButtonContainer>
    </Container>
  );
};

export default Setparticipant;
