import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';


export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [camposLimpios, setCamposLimpios] = useState(false);

  const limpiarCampos = () => {
    setCorreo('');
    setContraseña('');
    setCamposLimpios(true);
  };

  function login() {
    signInWithEmailAndPassword(auth, correo, contraseña)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Drawer_Welcome');
        limpiarCampos();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/invalid-credential':
            Alert.alert('ERROR, CREDENCIALES INCORRECTAS');
            break;
          case 'auth/missing-password':
            Alert.alert('ERROR, Ingrese la contraseña');
            break;
          default:
            Alert.alert('ERROR, REVISE SUS CREDENCIALES');
            break;
        }
      });
  }

  return (
    <ImageBackground source={{ uri: 'https://w.forfun.com/fetch/5a/5af7c68bbc518b9e566d6895a1f3906e.jpeg?h=600&r=0.5' }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresar email"
          keyboardType="email-address"
          placeholderTextColor="black"
          onChangeText={(texto) => setCorreo(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder="Ingresar contraseña"
          secureTextEntry
          placeholderTextColor="black"
          onChangeText={(texto) => setContraseña(texto)}
        />
        <Button title="Ingresar" onPress={() => login()} />

        <Text style={styles.registerText} onPress={() => navigation.navigate('Registro')}>
          👉 Regístrate aquí 👈
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
    color: 'white',
  },
  registerText: {
    marginTop: 16,
    fontSize: 16,
    color: 'white',
  },
});