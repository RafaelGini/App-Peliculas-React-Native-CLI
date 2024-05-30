import React, { useState } from 'react'  
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

//Styling
import theme from '../../styles/theme';

const ProfileScreen = () => {
  const profile = {
    name: 'Miguel Martinez',
    nickname: 'MiguelMartinez01',
    email: 'miguelmartinez@example.com',
    bio: 'Software engineer and cat lover',
    photo: 'https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo.jpg?resize=180%2C180&ssl=1',
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

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: profile.photo }}
        />
        <TouchableOpacity style={styles.buttonEdit} onPress={handleChangePic}>
          <Ionicons name={"pencil"} size={18} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.name}>
          {profile.name}
          {"\n"}
          {profile.email}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.bodyContent}>

        <View style={styles.form}>
          <Text style={styles.label}>Nickname</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter nickname"
            value={nickname}
            onChangeText={setNickname}
          />          
          <Text style={styles.label}>Nombre y apellido</Text>
          <TextInput 
            style={styles.input}
            value={profile.name}
            editable={false}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            editable={false}
          />
        </View>

          <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerChanges]} onPress={handleSaveChanges}>
            <Text style={styles.textButton}>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerClose]} onPress={handleLogout}>
            <Text style={styles.textButton}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainerDefault, styles.buttonContainerDelete]} onPress={handleDeleteAccount}>
            <Text style={styles.textButton}>Eliminar cuenta</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    //flex: 1,
    marginTop: 100,
    height: 100,
  },
  form: {
    //width: '90%',
  },
  label: {
    marginTop: 10,
    fontSize: 10,
    color: theme.colors.text,
  },
  input: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 280,
    borderRadius: 25,
    borderColor: theme.colors.text_light,
    color: theme.colors.text_light,
    borderWidth: 1,
    padding: 10,
    fontSize: 14,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 20,
  },
  name: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '600',
    marginTop: 30,
  },
  body: {
    marginTop: 55,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textButton: {
    fontSize: 12,
    color: theme.colors.background,
  },
  buttonEdit: {
    marginTop: 50,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 35,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  buttonContainerDefault: {
    marginTop: 10,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    borderRadius: 30,
  },
  buttonContainerChanges: {
    backgroundColor: theme.colors.primary,
    marginTop: 20,
    width: 170,
  },
  buttonContainerClose: {
    backgroundColor: theme.colors.grey,
    width: 130,
  },
  buttonContainerDelete: {
    backgroundColor: theme.colors.red,
  },
})


export default ProfileScreen;