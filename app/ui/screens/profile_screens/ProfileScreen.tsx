import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../styles/theme';

const ProfileScreen = () => {
  const profile = {
    googleId: 'string',
    name: 'Miguel',
    surname: 'Martinez',
    email: 'miguelmartinez@example.com',
    nickname: 'MiguelMartinez01',
    profileImage: 'https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo.jpg?resize=180%2C180&ssl=1',
  }

  const [nickname, setNickname] = useState(profile.nickname);

  const handleChangePic = () => {
    // Lógica para guardar los cambios en el servidor
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

  const handleActiveSave = (currentNick, initialNick) => {
    if(!currentNick) {return true};
    return (currentNick == initialNick);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{uri: profile.profileImage}}
        />
        <TouchableOpacity style={styles.changeAvatarButton} onPress={handleChangePic}>
          <Text style={styles.changeAvatarButtonText}>Cambiar foto de perfil</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Nickname</Text>
        <TextInput
          style={[styles.input, styles.inputEdit]}
          placeholder="*Ingrese un nombre de usuario*"
          placeholderTextColor={theme.colors.red}
          value={nickname}
          onChangeText={setNickname}
        />
        <Text style={styles.label}>Nombre y apellido</Text>
        <TextInput
          style={styles.input}
          value={profile.name+' '+profile.surname}
          editable={false}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          editable={false}
        />
        <TouchableOpacity style={handleActiveSave(nickname, profile.nickname) ? [styles.buttonContainerDefault, styles.buttonContainerInactive] : [styles.buttonContainerDefault, styles.buttonContainerChanges]} 
                          onPress={handleSaveChanges} disabled={handleActiveSave(nickname, profile.nickname)}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerLogout]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerDelete]} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Eliminar cuenta</Text>
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
    marginTop: 7,
    color: theme.colors.text,
  },
  input: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 25,
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