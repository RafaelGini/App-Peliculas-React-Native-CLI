//React - Navigation
import React, { useState } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Services
import { uploadImage } from '../../../services/uploadImageService';
import { refreshToken } from '../../../services/refreshTokenService';
import { updateUser } from '../../../services/updateUserService';
import { logoutUser } from '../../../services/logOutUserService';
import { deleteAccount } from '../../../services/deleteUserService';

//Redux
import useUserInfo from '../../../hooks/useUserInfo';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/userSlice';

//Handle Conecion
import checkConnection from '../../../utils/checkConnection';
import noInternetScreen from '../../../utils/noInternetScreen';
import loadingScreen from '../../../utils/loadingScreen';

//File handle
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
//Utils
import { useTranslation } from 'react-i18next';
//Components
import UI_ProfileScreen from './UI_ProfileScreen';
//Styling
import theme from '../../styles/theme';
//Interfaces
import UserInfo from '../../../interfaces/UserInfo';

const ProfileScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(useUserInfo())
  const { t } = useTranslation();
  const [nickname, setNickname] = useState<string>(userInfo?.nickname || '');
  const [image, setImage] = useState<string>(userInfo?.profileImage || '');
  const [isUploading, setUploading] = useState<boolean>(false);
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleChangePic = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    const handleUploadImage = async (imageUri: string) => {
      if (!userInfo) return;
      setUploading(true);
      try {
        const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
        dispatch(setUser(refreshedUserInfo));
        setUserInfo(refreshedUserInfo)
        const updatedUserInfo = await uploadImage(userInfo.id, imageUri, userInfo.token);
        setImage(updatedUserInfo.profileImage);
        setNickname(updatedUserInfo.nickname);
        console.log('Imagen actualizada', updatedUserInfo);
        dispatch(setUser(updatedUserInfo));
      } catch (error) {
        console.error('Error uploading image', error);
      } finally {
        setUploading(false);
      }
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setImage(imageUri);
          handleUploadImage(imageUri);
        }
      }
    });
    console.log('Cambiar foto');
  };

  const handleSaveChanges = async () => {
    if (!userInfo) return;
    setUploading(true);
    try {
      const refreshedUserInfo = await refreshToken(userInfo?.token, userInfo?.refreshToken);
      dispatch(setUser(refreshedUserInfo));
      setUserInfo(refreshedUserInfo)
      const updatedUserInfo = await updateUser(userInfo.id, { nickname }, userInfo.token);
      console.log('Usuario actualizado', updatedUserInfo);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(userInfo?.id, userInfo?.token);
      // @ts-ignore
      navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Hubo un problema al intentar cerrar sesión. Inténtalo de nuevo más tarde.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!userInfo) return;

    try {
      await deleteAccount(userInfo.id, userInfo.token);
      dispatch(setUser(emptyUserInfo())); 
      // @ts-ignore
      navigation.replace('Login'); 
      console.log("CUENTA ELIMINADA")
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'Hubo un problema al intentar eliminar la cuenta. Inténtalo de nuevo más tarde.');
    }
  };

  const handleActiveSave = (currentNick: string, initialNick: string) => {
    if (!currentNick) return true;
    return currentNick === initialNick;
  };

  const createAlertLogout = () =>
    Alert.alert(t('ALERT_LOGOUT_TITLE'), t('ALERT_LOGOUT_TEXT'), [
      { text: t('ALERT_CANCEL') },
      { text: t('ALERT_CONTINUE'), onPress: handleLogout },
    ], { cancelable: true });

  const createAlertDelete = () =>
    Alert.alert(t('ALERT_DELETE_TITLE'), t('ALERT_DELETE_TEXT'), [
      { text: t('ALERT_CANCEL') },
      { text: t('ALERT_CONTINUE'), onPress: handleDeleteAccount },
    ], { cancelable: true });

  if (checkConnection() === false) {
    return (
      <View style={styles.container}>
        {noInternetScreen()}
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>{t('ERROR_LOADING_USER_INFO')}</Text>
      </View>
    );
  }

  if (isUploading) {
    return loadingScreen() 
  }

  return (
    <UI_ProfileScreen
      t={t}
      image={image}
      nickname={nickname}
      name={userInfo.name}
      surname={userInfo.surname}
      email={userInfo.email}
      handleChangePic={handleChangePic}
      handleSaveChanges={handleSaveChanges}
      handleActiveSave={handleActiveSave}
      createAlertLogout={createAlertLogout}
      createAlertDelete={createAlertDelete}
      setNickname={setNickname}
    />
  );
};

const emptyUserInfo = (): UserInfo => {
  return {
    name: '',
    surname: '',
    email: '',
    nickname: '',
    profileImage: '',
    googleId: '',
    status: false,
    token: '',
    enabled: false,
    username: '',
    password: '',
    authority: [],
    accountNonExpired: false,
    accountNonLocked: false,
    credentialsNonExpired: false,
    refreshToken: '',
    id: 0,
  };
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});

export default ProfileScreen;
