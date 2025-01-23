import axios from 'axios';
import { API_URL } from './Login/constant';
const BASE_URL = API_URL;

export const getUserData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/user`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};