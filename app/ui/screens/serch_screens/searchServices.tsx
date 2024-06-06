
const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZGY4YTE0YmVlNjgwN2M3YjBmZWE5NDQ4NWU2ZWYyYiIsInN1YiI6IjY2NjFmZDlkZjkxZDUxYzgwMTdlN2E5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-0M36E7UlCEKDkXtPJvVUAvWQCX2WYgMM_DTZ5zJw3g'; // Reemplaza esto con tu propia API key
const baseUrlPoster = "https://image.tmdb.org/t/p/w500";

interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genre: string;
  }

export async function searchMovies(query: string): Promise<Movie[]> {
  const url = `${API_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const moviesWithBaseUrl = data.results.map((movie: Movie) => ({
        ...movie,
        poster_path: `${baseUrlPoster}${movie.poster_path}`, 
        genre: genre_id_list.genres.find((genre: any) => movie.genre_ids.includes(genre.id))?.name || '',
      }));
    return moviesWithBaseUrl; // Suponiendo que los resultados se encuentran en la propiedad "results"
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; 
  }
}


const genre_id_list = {
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]
  }
