import axios from 'axios';
import { API_URL } from './Login/constant';
const BASE_URL = API_URL;

// Access Token 저장 및 가져오기 헬퍼 함수
const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
  };
  
  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

// 리프레시 토큰으로 새로운 액세스 토큰을 요청하는 함수
// 엑세스 토큰과 리프레시 토큰을 파라미터로 
export const refreshAccessToken = async (accessToken, refreshToken) => {
    const response = await axios.post(
        `${BASE_URL}/api/refresh`,
        {
            refreshToken: refreshToken
        },
        {
            headers: {
                accessToken: accessToken
            }
        }
    );
    const { newAccessToken } = response.data;
    setAccessToken(newAccessToken); // 새로운 토큰 저장
    // 새로운 엑세스 토큰, 리프레시 토큰 반환 
    return response.data;
};

//유저 정보 조회 API 호출 함수
export const getUserData = async () => {

    try {
        const response = await axios.get(`${BASE_URL}/api/user`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};



// 일정 등록 API 호출 함수
export const schedulePost = async (userId, meetDateFirst, meetDateSecond, meetDateThird) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/course/schedule/`,
            {
                user_id: userId,
                meet_date_first: meetDateFirst,
                meet_date_second: meetDateSecond,
                meet_date_third: meetDateThird
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error posting schedule:', error);
        throw error;
    }
};


// user_id 가져오기 API 호출 함수
export const getUserId = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error("Access token is missing.");
      }
  
      const response = await axios.get(`${BASE_URL}/course/account/schedules`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.user.id; // user 객체에서 id 반환
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  };