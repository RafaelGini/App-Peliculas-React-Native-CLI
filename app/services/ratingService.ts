// services/ratingService.ts
import axios from 'axios';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const ratingEndPoint = '/movies';

async function rateMovie(movieId: number, userId: number, score: number, userInfo: UserInfo | null): Promise<boolean> {
  try {
    const response = await axios.post(`${BASE_URL}${ratingEndPoint}/${movieId}/rating/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      },
      params: {
        score
      }
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error rating movie:', error);
    return false;
  }
}

export { rateMovie };
