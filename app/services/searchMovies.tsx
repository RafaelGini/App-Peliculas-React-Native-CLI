import Movie from "../interfaces/Movie";

const movie1: Movie = {
    id: 1,
    genres: ["accion"],
    overview: "", 
    poster: "", 
    release_date: "",
    title: "", 
    vote_average: 0
}

function getMovies(userInput: string): Movie[] {
    

    return [movie1];

}


