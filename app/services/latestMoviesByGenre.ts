import axios from 'axios';
import Movie from "../interfaces/Movie";
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/movies';

async function getMoviesByGenre(userInfo: UserInfo | null, genre: string, page: number): Promise<Movie[]> { 
    try {
      const response = await axios.get(`${BASE_URL}${searchEndPoint}`, {
        params: {
            genre: genre,
            page: page
          },
          headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      });
      const movies = response.data.movies;
      console.log(movies);
      return movies;
    } catch (error) {
      console.error(`Error fetching movies for genre ${genre}:`, error);
      return [];
    }
  }
  
  export { getMoviesByGenre };