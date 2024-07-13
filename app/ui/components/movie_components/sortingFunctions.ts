import Movie from '../../../interfaces/Movie';
import { useState } from 'react';

const sortByDate = (movies: Movie[], order: 'ascending' | 'descending'): Movie[] => {
  return [...movies].sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return order === 'ascending' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
};

const sortByRating = (movies: Movie[], order: 'ascending' | 'descending'): Movie[] => {
  return [...movies].sort((a, b) => {
    return order === 'ascending' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
  });
};

const applySorting = (movies: Movie[], filter: 'default' | 'date' | 'rating', order: 'ascending' | 'descending'): Movie[] => {
  switch (filter) {
    case 'date':
      return sortByDate(movies, order);
    case 'rating':
      return sortByRating(movies, order);
    default:
      return movies;
  }
};

export { sortByDate, sortByRating, applySorting };

type FilterType = 'default' | 'date' | 'rating';
type OrderType = 'ascending' | 'descending';

const useFilters = () => {
  const [filter, setFilter] = useState<FilterType>('default');
  const [order, setOrder] = useState<OrderType>('descending');

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === 'ascending' ? 'descending' : 'ascending'));
  };

  return { filter, setFilter, order, toggleOrder };
};

export { useFilters };

