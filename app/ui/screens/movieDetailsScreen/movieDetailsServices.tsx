import { MovieItem } from "../serch_screens/Interfaces";

//(movieId: number): Promise<Movie> =>

export const getMovieDetails = async (movieId: number) => {
    const API_URL = `https://api.themoviedb.org/3/movie/${movieId}`;
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGY4YTE0YmVlNjgwN2M3YjBmZWE5NDQ4NWU2ZWYyYiIsInN1YiI6IjY2NjFmZDlkZjkxZDUxYzgwMTdlN2E5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-0M36E7UlCEKDkXtPJvVUAvWQCX2WYgMM_DTZ5zJw3g';
    const baseUrlPoster = "https://image.tmdb.org/t/p/w500";
    
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    try {
      const response = await fetch(API_URL, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      data.poster_path = `${baseUrlPoster}${data.poster_path}`;
      return data
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };
  