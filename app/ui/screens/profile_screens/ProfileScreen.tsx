import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import theme from '../../styles/theme';
import checkConnection from '../../../utils/checkConnection';
import noInternetScreen from '../../../utils/noInternetScreen';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import useUserInfo from '../../../hooks/useUserInfo';
import UserInfo from '../../../interfaces/UserInfo';

const ProfileScreen = () => {
  const userInfo: UserInfo | null = useUserInfo()
  console.log(userInfo)


  const {t} = useTranslation();

  const [nickname, setNickname] = useState(userInfo.nickname);
  const [image, setImage] = useState(userInfo.profileImage);

  const handleChangePic = () => {
    // Lógica para guardar los cambios en el servidor
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
      
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImage(imageUri);
        //Post nueva imagen perfil
      }
    });
    console.log('Cambiar foto');
  };

  const handleSaveChanges = () => {
    // Lógica para guardar los cambios en el servidor
    console.log('Cambios guardados');
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
  };

  const handleDeleteAccount = () => {
    // Lógica para eliminar la cuenta
    console.log('Cuenta eliminada');
  };

  const handleActiveSave = (currentNick: string, initialNick: string) => {
    if(!currentNick) {return true};
    return (currentNick == initialNick);
  };

  const createAlertLogout = () => 
    Alert.alert(t('ALERT_LOGOUT_TITLE'), t('ALERT_LOGOUT_TEXT'), [
      {text: t('ALERT_CANCEL')},
      {text: t('ALERT_CONTINUE'), onPress: handleLogout},
    ],
    {cancelable: true});

  const createAlertDelete = () => 
    Alert.alert(t('ALERT_DELETE_TITLE'), t('ALERT_DELETE_TEXT'), [
      {text: t('ALERT_CANCEL')},
      {text: t('ALERT_CONTINUE'), onPress: handleDeleteAccount},
    ],
    {cancelable: true});

  if (checkConnection() === false) {
    return (
      <View style={styles.container}>
        {noInternetScreen()}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{uri: image}}
        />
        <TouchableOpacity style={styles.changeAvatarButton} onPress={handleChangePic}>
          <Text style={styles.changeAvatarButtonText}>{t('BUTTON_CHANGE_PIC')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>{t('LABEL_NICKNAME')}</Text>
        <TextInput
          style={[styles.input, styles.inputEdit]}
          placeholder={t('PLACEHOLDER_NICKNAME')}
          placeholderTextColor={theme.colors.red}
          value={nickname}
          onChangeText={setNickname}
        />
        <Text style={styles.label}>{t('LABEL_NAME')}</Text>
        <TextInput
          style={styles.input}
          value={userInfo.name+' '+userInfo.surname}
          editable={false}
        />
        <Text style={styles.label}>{t('LABEL_EMAIL')}</Text>
        <TextInput
          style={styles.input}
          value={userInfo.email}
          editable={false}
        />
        <TouchableOpacity style={handleActiveSave(nickname, userInfo.nickname) ? [styles.buttonContainerDefault, styles.buttonContainerInactive] : [styles.buttonContainerDefault, styles.buttonContainerChanges]} 
                          onPress={handleSaveChanges} disabled={handleActiveSave(nickname, userInfo.nickname)}>
          <Text style={styles.buttonText}>{t('BUTTON_SAVE_CHANGES')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerLogout]} onPress={createAlertLogout}>
          <Text style={styles.buttonText}>{t('BUTTON_LOGOUT')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerDelete]} onPress={createAlertDelete}>
          <Text style={styles.buttonText}>{t('BUTTON_DELETE_ACCOUNT')}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  form: {
    justifyContent: 'center',
    width: '80%',
  },
  label: {
    marginTop: 14,
    color: theme.colors.text,
  },
  input: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 3,
    height: 40,
    padding: 10,
    fontSize: 16,
    color: theme.colors.text_light,
  },
  inputEdit: {
    color: theme.colors.text,
  },
  buttonContainerDefault: {
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    width: 170,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonContainerChanges: {
    backgroundColor: theme.colors.primary,
    marginTop: 20,
  },
  buttonContainerInactive: {
    backgroundColor: theme.colors.primary_inactive,
    marginTop: 20,
  },
  buttonContainerLogout: {
    backgroundColor: theme.colors.grey,
  },
  buttonContainerDelete: {
    backgroundColor: theme.colors.red,
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 12,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  changeAvatarButton: {
    marginTop: 5,
  },
  changeAvatarButtonText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
});

export default ProfileScreen;