import axios from 'axios';
import GoogleUserInfo from '../interfaces/GoogleUserInfo';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/refreshToken';

async function refreshToken(GoogleUserInfo: GoogleUserInfo): Promise<UserInfo> {
    try {
        const response = await axios.post(`${BASE_URL}${searchEndPoint}`, GoogleUserInfo);
        const userInfoResponse = response.data;
        console.log(userInfoResponse);
        return userInfoResponse;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export { refreshToken };
