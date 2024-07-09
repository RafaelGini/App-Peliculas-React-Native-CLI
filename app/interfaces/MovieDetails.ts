interface CastMember {
  name: string;
  character: string;
  profile_path: string;
}

export default interface MovieDetails {
  director: string;
  director_path: string;
  images: string[];
  trailer: string;
  favourite: boolean;
  id: number;
  title: string;
  tagline: string;
  overview: string;
  genres: string[];
  release_date: string;
  runtime: string; 
  vote_average: number;
  vote_count: number;
  cast: CastMember[];
  poster_path: string;
  backdrop_path: string;
  adult: boolean;
}
