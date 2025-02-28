import axios from 'axios';

const BASE_URL = '/naver-api/map-reversegeocode/v2/gc';
const CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID2;
const CLIENT_SECRET = import.meta.env.VITE_NAVER_MAP_CLIENT_SECRET2;

const getAddressFromCoords = async (latitude, longitude) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                coords: `${longitude},${latitude}`, // 경도, 위도 순서 유지
                output: 'json',
                orders: 'legalcode,admcode,addr,roadaddr', // 요청 예시에 맞춤
            },
            headers: {
                'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
                'X-NCP-APIGW-API-KEY': CLIENT_SECRET,
            },
        });

 
        if (response.data.status.code === 0) {
            const results = response.data.results;
            if (!results || results.length === 0) {
                console.error('Error: No results found');
                return { place_name: '', address: '' };
            }

            const result = results[3] || results[0];
            let address = '';
            let place_name = '';

            const regions = result.region || {};
            for (let i = 1; i <= 4; i++) {
                const area = regions[`area${i}`];
                if (area?.name) {
                    address += area.name + ' ';
                } else {
                    break;
                }
            }

            const land = result.land || {};
            if (land.addition0?.value) {
                place_name = land.addition0.value;
            } else if (land.name) {
                place_name = land.name;
            }

            address = `${address.trim()} ${place_name.trim()}`.trim(); // 주소 끝에 place_name 추가

            console.log('역지오코딩 반환값: ', place_name.trim(), address);
            return { place_name: place_name.trim(), address };
        } else {
            console.error('Error:', response.data.status.message);
            return { place_name: '', address: '' };
        }
    } catch (error) {
        console.error('API 요청 실패:', error);
        return { place_name: '', address: '' };
    }
};

export default getAddressFromCoords;
