import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import GoogleUserInfo from '../interfaces/GoogleUserInfo';
import UserInfo from '../interfaces/UserInfo';

const BASE_URL = 'https://movie-finder-api.azurewebsites.net/movieFinder';
const loginEndpoint = '/login';
const refreshTokenEndpoint = '/refreshToken';

interface AuthContextProps {
  userInfo: UserInfo | null;
  login: (userInfo: GoogleUserInfo) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  userInfo: null,
  login: async () => {},
  logout: () => {},
  refreshToken: async () => {}
});

interface AuthProviderProps {
    children: React.ReactNode; 
  }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.error('Failed to load user info', error);
      }
    };

    loadUserInfo();
  }, []);

  const login = async (googleUserInfo: GoogleUserInfo) => {
    try {
      const response = await axios.post(`${BASE_URL}${loginEndpoint}`, googleUserInfo);
      const fetchedUserInfo = response.data;
      setUserInfo(fetchedUserInfo);
      await AsyncStorage.setItem('userInfo', JSON.stringify(fetchedUserInfo));
    } catch (error) {
      console.error('Error during login', error);
    }
  };

    const logout = async () => {
    setUserInfo(null);
    await AsyncStorage.removeItem('userInfo');
  };

  const refreshToken = useCallback(async () => {
    if (!userInfo) return;
    try {
      const response = await axios.post(`${BASE_URL}${refreshTokenEndpoint}`, { googleId: userInfo.googleId });
      const refreshedUserInfo = response.data;
      setUserInfo(refreshedUserInfo);
      await AsyncStorage.setItem('userInfo', JSON.stringify(refreshedUserInfo));
      return refreshedUserInfo;
    } catch (error) {
      console.error('Error refreshing token', error);
    }
  }, [userInfo]);

  return (
    <AuthContext.Provider value={{ userInfo, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
