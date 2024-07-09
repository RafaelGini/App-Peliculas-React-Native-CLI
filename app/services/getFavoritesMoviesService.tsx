import axios from 'axios';
import Movie from "../interfaces/Movie";
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const favoritesEndPoint = '/users';

async function getFavoriteMovies(userInfo: UserInfo | null): Promise<Movie[]> { 
    try {
        const response = await axios.get(`${BASE_URL}${favoritesEndPoint}/${userInfo?.id}/favourites`, {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`
            }
        });
        const favoriteMovies = response.data;
        return favoriteMovies;
    } catch (error) {
        console.error('Error fetching favorite movies:', error);
        return [];
    }
}

export { getFavoriteMovies };
