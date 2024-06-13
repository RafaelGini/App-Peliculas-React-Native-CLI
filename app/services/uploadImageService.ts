import axios from 'axios';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const uploadImageEndPoint = '/users';

async function uploadImage(userId: number, imageUri: string, token: string): Promise<UserInfo> {
    try {
        const formData = new FormData();
        formData.append('multipartFile', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'profile.jpg',
        });

        console.log(`... Llamando al Back end para subir imagen...`);
        const response = await axios.put(`${BASE_URL}${uploadImageEndPoint}/${userId}/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        const updatedUserInfo: UserInfo = response.data;
        return updatedUserInfo;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

export { uploadImage };
