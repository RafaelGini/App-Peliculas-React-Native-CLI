import axios from 'axios';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/refreshToken';

async function refreshToken(token: string | undefined, refreshToken: string | undefined): Promise<UserInfo> {
    
    console.log("Se llama por primera vez al RT con: ", token, refreshToken);
   
    try {
        const response = await axios.put(`${BASE_URL}${searchEndPoint}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Refresh-Token': `Bearer ${refreshToken}`
            }
        });
        const userInfoResponse = response.data;
        console.log("Se devuelve la nueva data del usuario: ",userInfoResponse);
        return userInfoResponse;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export { refreshToken };
