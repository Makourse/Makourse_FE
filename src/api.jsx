import axios from 'axios';
import { API_URL } from './Login/constant';
const BASE_URL = API_URL;

// 리프레시 토큰으로 새로운 액세스 토큰을 요청하는 함수
// 엑세스 토큰과 리프레시 토큰을 파라미터로 
export const refreshAccessToken = async (accessToken, refreshToken) => {
    const response = await axios.post(
        `${BASE_URL}/account/token/refresh/`,
        {
            refreshToken: refreshToken
        },
        {
            headers: {
               Authorization: `Bearer ${accessToken}`
            }
        }
    );
    // 새로운 엑세스 토큰, 리프레시 토큰 반환 
    return response.data;
};

//유저 정보,코스 목록 조회 API 호출 함수
export const getUserData = async (accessToken) => {
    try {
        const response = await axios.get(`${BASE_URL}/account/schedules`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

//코스 등록 API 호출 함수
export const createCourse = async (accessToken, courseData) => {
    try {
        const response = await axios.post(`${BASE_URL}/course/schedule/`, courseData, {
            headers: {
                Authorization: `Bearer ${accessToken}`  
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering course:', error);
        throw error;
    }
};

//코스 상세보기 API 호출 함수
export const getCourseDetail = async (accessToken, courseId) => {
    try {
        const response = await axios.get(`${BASE_URL}/course/schedule/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching course detail:', error);
        throw error;
    }
};

//코스 삭제 API 호출 함수   
export const deleteCourse = async (accessToken, courseId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/course/schedule/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting course:', error);
        throw error;
    }
};

//코스 수정 API 호출 함수
export const updateCourse = async (accessToken, courseId, courseData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/course/schedule/${courseId}/`, courseData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }   
};

//코스-세부 장소 추가 API 호출 함수
export const addEntries = async (accessToken, courseId, entries) => {   
    try {
        const response = await axios.post(`${BASE_URL}/course/schedule-entries/post/${courseId}/`, entries, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding entries:', error);
        throw error;
    }
};

//코스-세부 장소 수정 API 호출 함수
export const updateEntries = async (accessToken, courseId, entries) => {
    try {
        const response = await axios.patch(`${BASE_URL}/course/schedule-entries/${courseId}/`, entries, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating entries:', error);
        throw error;
    }
};

//코스-세부 장소 삭제 API 호출 함수
export const deleteEntries = async (accessToken, courseId, entries) => {
    try {
        const response = await axios.delete(`${BASE_URL}/course/schedule-entries/${courseId}/`, {   
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting entries:', error);
        throw error;
    }
};

//코스-세부 장소 조회 API 호출 함수
export const getEntries = async (accessToken, courseId) => {
    try {
        const response = await axios.get(`${BASE_URL}/course/schedule-entries/${courseId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching entries:', error);
        throw error;
    }
};




