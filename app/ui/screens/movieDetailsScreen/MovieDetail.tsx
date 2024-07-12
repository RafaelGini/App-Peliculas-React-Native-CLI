// MovieDetail.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../styles/theme';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import MovieDetailUI from './MovieDetailUI';
import { getMovieDetail } from '../../../services/getMovieDetailsService';
import loadingScreen from '../../../utils/loadingScreen';
import NoDetailsScreen from '../../../utils/noDetailScreen';
import { addFavorite, removeFavorite } from '../../../services/favoritesServices';
import { rateMovie } from '../../../services/ratingService';

// Redux
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';
import UserInfo from '../../../interfaces/UserInfo';
import MovieDetails from '../../../interfaces/MovieDetails';
import { refreshToken } from '../../../services/refreshTokenService';
import RatingModal from './RatingModal';

interface RouteParams {
    movieId: string;
}

const MovieDetail: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { movieId } = route.params as RouteParams;

    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo());

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setIsLoading(true);
            const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
            dispatch(setUser(refreshedUserInfo));
            setUserInfo(refreshedUserInfo);
            const fetchedMovie = await getMovieDetail(movieId, userInfo);
            setMovie(fetchedMovie);
            setIsLoading(false);
        };

        fetchMovieDetail();
    }, [movieId]);

    if (isLoading) {
        return (
            <View style={styles.container2}>
                {loadingScreen()}
            </View>
        )
    }

    if (!movie) {
        return NoDetailsScreen();
    }

    const handleFavoriteToggle = async () => {
        if (!userInfo || !movie) return;
        try {
            if (movie.favourite) {
                await removeFavorite(userInfo.id, movie.id, userInfo.token);
            } else {
                await addFavorite(userInfo.id, movie.id, userInfo.token);
            }
            setMovie({ ...movie, favourite: !movie.favourite });
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const handleRatingPress = () => {
        setModalVisible(true);
    };

    const handleRatingSubmit = async (selectedRating: number) => {
        if (userInfo && movie) {
            const success = await rateMovie(movie.id, userInfo.id, selectedRating, userInfo);
            if (success) {
                Toast.show({
                    type: 'success',
                    text1: t('RATE_SENT'),//'Calificación enviada',
                    text2: t('RATE_SENT_INFO')//'Tu calificación ha sido enviada con éxito.'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: t('ERROR_RATE_SENT'),//'Error',
                    text2: t('ERROR_RATE_SENT_INFO'),//'Hubo un error al enviar tu calificación.'
                });
            }
        }
        setModalVisible(false);
    };


    console.log(movie)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleFavoriteToggle}>
                    <Icon name="heart" size={24} color={movie.favourite ? 'red' : 'gray'} />
                </TouchableOpacity>
            </View>
            <MovieDetailUI movie={movie} onRatingPress={handleRatingPress} />
            <RatingModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleRatingSubmit}
                rating={rating}
                setRating={setRating}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    container2: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: theme.colors.background,
        height: '100%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: theme.colors.background
    },
});

export default MovieDetail;
