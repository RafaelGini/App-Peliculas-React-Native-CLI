import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import InfiniteScrollList3 from '../../components/movie_components/InfiniteScroll3';
import useUserInfo from '../../../hooks/useUserInfo';
import { refreshToken } from '../../../services/refreshTokenService';
import { setUser } from '../../../redux/slices/userSlice';
import theme from '../../styles/theme';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const dispatch = useDispatch();
  const userInfo = useUserInfo();
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);

  const fetchUserInfo = async () => {
    if (localUserInfo?.token && localUserInfo?.refreshToken) {
      const refreshedUserInfo = await refreshToken(localUserInfo.token, localUserInfo.refreshToken);
      dispatch(setUser(refreshedUserInfo));
      setLocalUserInfo(refreshedUserInfo);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUserInfo();
      setDebouncedQuery(searchQuery);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for movies..."
        placeholderTextColor="#ffffff" 
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <InfiniteScrollList3 searchQuery={debouncedQuery} userInfo={localUserInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "white"
  },
});

export default SearchScreen;
