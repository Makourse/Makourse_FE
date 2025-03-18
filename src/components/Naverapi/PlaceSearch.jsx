import axios from 'axios';

// 프록시 URL 사용 (vite.config.js에 설정된 경로)
const BASE_URL = '/v1/search/local.json';
const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

const getPlaceSearch = async (query) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                query: query,//검색어 
                display: 10,//검색 결과 수
                start: 1,//검색 시작 위치
            },
            headers: {
                'X-Naver-Client-Id': CLIENT_ID,
                'X-Naver-Client-Secret': CLIENT_SECRET,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        console.log('API 응답:', response.data);
        return response.data;
    } catch (error) {
        console.error('네이버 API 호출 중 오류 발생:', error.response || error);
        throw error;
    }
};

export default getPlaceSearch;