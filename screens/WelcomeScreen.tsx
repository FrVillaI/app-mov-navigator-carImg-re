import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
// FireBase
import { getAuth, signOut } from 'firebase/auth';

export default function WelcomeScreen({ navigation }: any) {

  function cerrarSesion() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Cierre de sesión exitoso.
      navigation.navigate('Login');
    }).catch((error) => {
      // Se produjo un error.
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WelcomeScreen</Text>
      <Button title="CERRAR SESIÓN" onPress={() => cerrarSesion()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Color de fondo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Espaciado inferior
  },
  button: {
    marginTop: 20, // Espaciado superior
  },
});