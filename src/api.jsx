import axios from 'axios';
import { API_URL } from './Login/constant';
const BASE_URL = API_URL;

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