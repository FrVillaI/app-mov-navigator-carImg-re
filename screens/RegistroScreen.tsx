import { Alert, Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../config/Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nick, setnick] = useState('');
  const [edad, setedad] = useState('')

  function registro() {
    createUserWithEmailAndPassword(auth, correo, contraseña)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        //console.log("REGISTRO CORRECTO")
        Alert.alert('REGISTRO CORRECTO, INICIE SECION');
        navigation.navigate('Login')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        switch (errorCode) {
          case 'auth/invalid-email':
            Alert.alert('ERROR, EMAIL NO VALIDO');
            break;
          case 'auth/missing-password':
            Alert.alert('ERROR, Ingrese la contraseña');
            break;
          case 'auth/weak-password':
            Alert.alert('ERROR, CONTRASEÑA MUY DEVIL MINIMO 6 CARACTERES')
            break;
          case 'auth/email-already-in-use':
            Alert.alert('ERROR, EMAIL YA UTILIZADO');
            break;
          default:
            Alert.alert('ERROR, REVISE LOS DATOS');
            break;
        }
      });
  }

  return (
    <ImageBackground source={{ uri: 'https://w.forfun.com/fetch/5a/5af7c68bbc518b9e566d6895a1f3906e.jpeg?h=600&r=0.5' }} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresar email"
        keyboardType="email-address"
        onChangeText={(texto) => setCorreo(texto)}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresar contraseña"
        secureTextEntry
        onChangeText={(texto) => setContraseña(texto)}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresar su nick"
        secureTextEntry
        onChangeText={(texto) => setnick(texto)}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingresar su edad"
        secureTextEntry
        onChangeText={(texto) => setedad(texto)}
      />

      <Button title="Registrarse" onPress={() => registro()} />
      <Text style={styles.registerText} onPress={() => navigation.navigate('Login')}>
        👉 Inicia Secion aquí 👈
      </Text>

    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  registerText: {
    marginTop: 16,
    fontSize: 16,
  },
})