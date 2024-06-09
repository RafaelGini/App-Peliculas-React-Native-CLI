import axios from 'axios';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = `/users/`;

async function getUserProfile(
    id: number, 
    token: string, 
): Promise<UserInfo> {
    try {
        //const refreshedUserInfo = await refreshToken();
        const response = await axios.get(`${BASE_URL}${searchEndPoint}${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        const userInfoResponse = response.data;
        console.log("MIRA: ",  userInfoResponse)
        return userInfoResponse;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export { getUserProfile };
