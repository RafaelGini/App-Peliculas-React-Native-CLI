// MovieDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MovieDetailUI from './MovieDetailUI';
import { getMovieDetail } from '../../../services/getMovieDetailsService'; 
//Reduxs
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';
import UserInfo from '../../../interfaces/UserInfo';
import MovieDetails from '../../../interfaces/MovieDetails';
import { useRoute } from '@react-navigation/native';

interface MovieDetailProps {
    movieId: string;
}

interface RouteParams {
    movieId: string;
}

const MovieDetail: React.FC = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const { movieId } = route.params as RouteParams;
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo());

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setIsLoading(true);
            const fetchedMovie = await getMovieDetail(movieId, userInfo);
            setMovie(fetchedMovie);
            setIsLoading(false);
        };

        fetchMovieDetail();
    }, [movieId]);

    if (isLoading || !movie) {
        return (
            <View style={styles.container}>
                {/* Aquí podrías colocar un spinner de carga */}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MovieDetailUI movie={movie} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E', // Ajusta el color según tu tema
    },
});

export default MovieDetail;
