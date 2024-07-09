// services/favoriteService.ts
import axios from 'axios';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';

interface FavsDTO {
  userId: number;
  movieId: number;
}

async function addFavorite(userId: number, movieId: number, token: string): Promise<FavsDTO> {
  try {
    const response = await axios.post(`${BASE_URL}/users/${userId}/favourites`, { userId, movieId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
}

async function removeFavorite(userId: number, movieId: number, token: string): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/users/${userId}/favourites/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
}

export { addFavorite, removeFavorite };
