import axios from 'axios';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';  // Reemplaza con la URL de tu backend

const deleteAccount = async (userId: number, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { deleteAccount };
