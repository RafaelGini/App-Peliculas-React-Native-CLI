import axios from 'axios';
import Movie from "../interfaces/Movie";

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const searchEndPoint = '/movies';

async function getMovies(userInput: string): Promise<Movie[]> {
    try {
      const response = await axios.get(`${BASE_URL}${searchEndPoint}`, {
        params: {
          query: userInput,
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
