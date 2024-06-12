import axios from 'axios';
import GoogleUserInfo from '../interfaces/GoogleUserInfo';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/login';

async function login(userInfo: GoogleUserInfo): Promise<UserInfo> { 
    try {
        console.log(`... Llamando al Back end...`);
        const response = await axios.post(`${BASE_URL}${searchEndPoint}`, userInfo);
        const userInfoResponse: UserInfo = response.data;
        return userInfoResponse;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}
export { login };
