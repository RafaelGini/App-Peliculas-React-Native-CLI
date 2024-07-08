import axios from 'axios';
import Movie from "../interfaces/Movie";
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/movies';

async function getLatestMovies(userInfo: UserInfo | null): Promise<Movie[]> { 
    try {
      const response = await axios.get(`${BASE_URL}${searchEndPoint}`, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      });
      const movies = response.data.movies;
      console.log(movies)
      return movies;
    } catch (error) {
      return [];

    }
}
export { getLatestMovies };
