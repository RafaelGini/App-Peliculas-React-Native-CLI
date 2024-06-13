import axios from 'axios';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';

async function updateUser(userId: number, updatedData: Partial<UserInfo>, token: string): Promise<UserInfo> {
    try {
        console.log('... Llamando al Back end...');
        const response = await axios.put(
            `${BASE_URL}/users/${userId}`,
            updatedData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        const updatedUserInfo: UserInfo = response.data;
        return updatedUserInfo;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export { updateUser };
