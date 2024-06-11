import axios from 'axios';
import Movie from "../interfaces/Movie";
import UserInfo from '../interfaces/UserInfo';
import useUserInfo from '../hooks/useUserInfo';
import { refreshToken } from './refreshTokenService';
import GoogleUserInfo from '../interfaces/GoogleUserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/movies';

async function getMovies(userInput: string, userInfo: UserInfo | null): Promise<Movie[]> { 
    try {
      const response = await axios.get(`${BASE_URL}${searchEndPoint}`, {
        params: {
          query: userInput,
        },
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      });
      const movies = response.data.movies;
      console.log(movies)
      return movies;

    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];

    }
}
export { getMovies };
