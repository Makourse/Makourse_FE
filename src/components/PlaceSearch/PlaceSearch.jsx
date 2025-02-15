import axios from 'axios';

const BASE_URL = 'https://openapi.naver.com/v1/search/local';
const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

const getPlaceSearch = async (query) => {
    const response = await axios.get(BASE_URL, {
        params: {
            query: query,//검색어 
            display: 10,//검색 결과 수
            start: 1,//검색 시작 위치
        },
        headers: {
            'X-Naver-Client-Id': CLIENT_ID,
            'X-Naver-Client-Secret': CLIENT_SECRET,
        },
    });
    return response.data;
};

export default getPlaceSearch;