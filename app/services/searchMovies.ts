import axios from 'axios';
import Movie from "../interfaces/Movie";

const BASE_URL = 'http://tu-backend.com/api';
const searchEndPoint = 'searchEndPoint';

async function getMovies(userInput: string): Promise<Movie[]> {
    try {
      const response = await axios.get<Movie[]>(`${BASE_URL}${searchEndPoint}`, {
        params: {
          query: userInput
        }
      });
      return response.data;

    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }
  
  export { getMovies };


