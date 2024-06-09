export default interface Movie {
    id: number;
    genres: string[]; 
    overview: string;
    poster: string; 
    release_date: string;
    title: string;
    vote_average: number;
}