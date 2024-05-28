/* import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Perfil</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
*/

import React from 'react'  
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

const ProfileScreen = () => {
  const profile = {
    name: 'Miguel Martinez',
    nickname: 'miguel-user',
    email: 'miguelmartinez@example.com',
    bio: 'Software engineer and cat lover',
    photo: 'https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo.jpg?resize=180%2C180&ssl=1',
  }
  return (

    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: profile.photo }}
          //'https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo.jpg?resize=180%2C180&ssl=1' }}
      />
      <View style={styles.body}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.name}>{profile.email}</Text>
        <View style={styles.bodyContent}>
          <TouchableOpacity style={styles.buttonContainerChanges}>
            <Text>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainerDelete}>
            <Text>Eliminar cuenta</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F1D2B',
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  header: {
    backgroundColor: '#1F1D2B',
    height: 100,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 63,
    borderWidth: 4,
    //borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 20,
  },
  name: {
    alignSelf: 'center',
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  body: {
    marginTop: 115,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#696974',
  },
  buttonContainerChanges: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
      backgroundColor: '#12CDD9',
    },
  buttonContainerDelete: {
      marginTop: 10,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
      backgroundColor: '#FB4141',
    },
})


export default ProfileScreen;