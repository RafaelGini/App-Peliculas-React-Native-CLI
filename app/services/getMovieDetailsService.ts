// services/movieService.ts
import axios from 'axios';
import MovieDetails from '../interfaces/MovieDetails';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/movies';

async function getMovieDetail(movieId: string, userInfo: UserInfo | null): Promise<MovieDetails | null> {
  try {
    const response = await axios.get(`${BASE_URL}${searchEndPoint}/${movieId}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      },
      params: {
        idUser: userInfo?.id 
      }
    });
    const movie: MovieDetails = response.data;
    return movie;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export { getMovieDetail };
