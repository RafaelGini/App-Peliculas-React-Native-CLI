import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.colors.background,
  },
  cardPicture: {
    flex: 3,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: theme.colors.background,
  },
  cardInfo: {
    flex: 7,
    padding: 8,
    backgroundColor: theme.colors.background,
  },
  line: {
    flex: 1,
    flexDirection: 'row',
  },
  movieTitle: {
    fontSize: 26,
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  movieRate: {
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 5,
    color: theme.colors.secondary,
  },
  movieText: {
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 5,
    color: theme.colors.text_light,
  },
  icon: {
    alignSelf: 'center',
  },
  searchInputContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  searchInputText: {
    flex: 5,
  },
  searchInputButton: {
    flex: 1,
  },
  searchButton: {
    borderRadius: 30,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.background_soft,
    padding: 10,
    alignSelf: 'center',
  },
  sortContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 5,
  },
  sortLineBox: {
    flex: 1,
  },
  sortButton: {
    borderRadius: 10,
    borderColor: theme.colors.grey,
    backgroundColor: theme.colors.background_soft,
    paddingHorizontal: 30,
    paddingVertical: 2,
    alignSelf: 'center',
  },
  sortText: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    color: theme.colors.text_light,
    borderColor: theme.colors.text_light,
    backgroundColor: theme.colors.background_soft,
    borderRadius: 35,
    padding: 10,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    height: 150,
    borderRadius: 8,
  },
});

export default searchStyles;