// services/movieService.ts
import axios from 'axios';
import MovieDetails from '../interfaces/MovieDetails';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/movies';

const emptyMovieDetails: MovieDetails = {
  id: 0,
  title: '',
  releaseDate: '',
  runtime: 0,
  genre: '',
  rating: 0,
  overview: '',
  posterPath: '',
};

async function getMovieDetail(movieId: string, userInfo: UserInfo | null): Promise<MovieDetails> {
  try {
    const response = await axios.get(`${BASE_URL}${searchEndPoint}/${movieId}`, {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`
      }
    });
    const movie: MovieDetails = response.data;
    return movie;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return emptyMovieDetails;
  }
}

export { getMovieDetail };
