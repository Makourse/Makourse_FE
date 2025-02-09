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

const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 시 액세스 토큰을 자동으로 추가하는 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답에서 401 오류가 발생하면 리프레시 토큰을 이용해 재시도하는 인터셉터
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) {
                    throw new Error("Refresh token is missing.");
                }

                const accessToken = getAccessToken();

                // 리프레시 토큰으로 새 액세스 토큰 요청
                const response = await axios.post(
                    `${BASE_URL}/account/token/refresh/`,
                    { refreshToken: refreshToken },
                    {
                        headers: {
                            accessToken: accessToken,
                        },
                    }
                );

                const { accessToken: newAccessToken } = response.data;
                setAccessToken(newAccessToken);

                // 새로운 액세스 토큰으로 원래 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// 유저 정보 가져오기 API 호출 함수
export const getUserData = async () => {
    try {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error("Access token is missing.");
        }

        const response = await axios.get(`${BASE_URL}/account/schedules`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
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

        const response = await axios.get(`${BASE_URL}/account/schedules`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data.user.id;
    } catch (error) {
        console.error("Error fetching user ID:", error);
        throw error;
    }
};

// 일정 등록 API 호출 함수
export const schedulePost = async (userId, meetDateFirst, meetDateSecond, meetDateThird) => {
    try {
        const response = await apiClient.post("/course/schedule/", {
            user_id: userId,
            meet_date_first: meetDateFirst,
            meet_date_second: meetDateSecond,
            meet_date_third: meetDateThird,
        });
        return response.data;
    } catch (error) {
        console.error("Error posting schedule:", error);
        throw error;
    }
};
