import axios from 'axios';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/refreshToken';

async function refreshToken(userId: number | undefined): Promise<UserInfo> {
    try {
        const response = await axios.put(`${BASE_URL}${searchEndPoint}`, null, {
            params: {
                userId: userId
            }
        });
        const userInfoResponse = response.data;
        console.log(userInfoResponse);
        return userInfoResponse;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export { refreshToken };
