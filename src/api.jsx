import axios from 'axios';
import { API_URL } from './Login/constant';

const BASE_URL = API_URL;

// Access Token 저장 및 가져오기 헬퍼 함수
export const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
};

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
};

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
        const response = await axios.get(`${BASE_URL}/course/schedule/${courseId}`, {
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
export const updateCourse = async (courseId, courseData) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("Access token is missing.");
    }
    try {
        const response = await axios.patch(`${BASE_URL}/course/schedule/${courseId}`, courseData, {
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

// 일정 등록 API 호출 함수
export const schedulePost = async (meetDateFirst, meetDateSecond, meetDateThird) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("Access token is missing.");
    }

    try {
        const response = await axios.post(`${BASE_URL}/course/schedule`,
            {
                meet_date_first: meetDateFirst,
                meet_date_second: meetDateSecond,
                meet_date_third: meetDateThird,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error posting schedule:", error);
        throw error;
    }
};

// 나만의 장소 추가 API 호출 함수
export const saveMyPlace = async (placeData) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("Access token is missing.");
    }

    try {
      const response = await axios.post(`${BASE_URL}/course/myplace`, placeData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving place:", error);
      throw error;
    }
  };


// 나만의 장소 보기 API 호출 함수
  export const getMyPlaces = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        throw new Error("Access token is missing.");
    }

    try {
      const response = await axios.get(`${BASE_URL}/course/myplace`,
         {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
      );
      return response;
    } catch (error) {
      console.error("나만의 장소 데이터를 가져오는 데 실패했습니다.", error);
      throw error;
    }
  };

  // 프로필 이미지 업데이트 API
    export const updateProfileImage = async (file) => {
        const accessToken = getAccessToken();
        if (!accessToken) throw new Error("Access token is missing.");
    
        try {
        const formData = new FormData();
        formData.append('profile_image', file);
    
        const response = await axios.post(`${BASE_URL}/account/profile-image/update`, formData, 
            {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
        } catch (error) {
        console.error("프로필 이미지 업데이트 실패:", error);
        throw error;
        }
    };

    // 유저 정보 가져오기 (account/profile)
    export const getUserProfile = async () => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error("Access token is missing.");
        }

        try {
            const response = await axios.get(`${BASE_URL}/account/profile`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    };

    //세부 장소 보기 API
    export const getPlaceDetail = async (entryPk) => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error("Access token is missing.");
        }
        try {
            const response = await axios.get(`${BASE_URL}/course/schedule-entries/${entryPk}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("세부장소 데이터를 가져오는 데 실패했습니다.", error);
            throw error;
        }
    }

    //세부 장소 추가 API
    export const postPlaceDetail = async (scheduleId, placeData) => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error("Access token is missing.");
        }
        try {
            const response = await axios.post(`${BASE_URL}/course/schedule-entries/post/${scheduleId}`, placeData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("세부장소 데이터를 가져오는 데 실패했습니다.", error);
            throw error;
        }
    }

    //대안 장소 보기 API
    export const getAlternativePlaces = async (entryPk) => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            throw new Error("Access token is missing.");
        }
        try {
            const response = await axios.get(`${BASE_URL}/course/schedule-entries/${entryPk}/alternative-places`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("대안 장소 데이터를 가져오는 데 실패했습니다.", error);
            throw error;
        }
    }