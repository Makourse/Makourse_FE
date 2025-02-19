import axios from 'axios';

const BASE_URL = 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc';
const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

const getAddressFromCoords = async (latitude, longitude) => {
    
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                coords: `${longitude},${latitude}`, // 경도, 위도 순서
                output: 'json',
                orders: 'addr', // 주소 우선(도로명주소 우선=roadaddr)
            },
            headers: {
                'X-NCP-APIGW-API-KEY-ID': CLIENT_ID,
                'X-NCP-APIGW-API-KEY': CLIENT_SECRET,
            },
        });

        const addressData = response.data.results;
        if (addressData.length > 0) {
            return addressData[0].region.area1.name + " " +
                   addressData[0].region.area2.name + " " +
                   addressData[0].region.area3.name + " " +
                   (addressData[0].land.name || "");
        } else {
            return "주소 없음";
        }
    } catch (error) {
        console.error("Reverse Geocoding API 오류:", error);
        return "주소 없음";
    }
};

export default getAddressFromCoords;