import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';

export default function GeneralScreen() {
  const [imagen, setimagen] = useState('');

  const abrirCamara = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setimagen(result.assets[0].uri);
    }
  };

  // Sube una imagen a Firebase
  async function subirImagen(nombre: string) {
    const storageRef = ref(storage, 'test/' + nombre);

    try {
      const response = await fetch(imagen);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpg',
      });

      console.log('La imagen se subió con éxito');
      Alert.alert('Mensaje', 'La imagen se subió con éxito');

      // Obtiene la URL de la imagen
      const imageURL = await getDownloadURL(storageRef);
      console.log('URL de desacarga de la imagen', imageURL);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir una foto desde la cámara</Text>
      <Button title="Abrir Cámara" onPress={() => abrirCamara()} />
      {imagen && <Image source={{ uri: imagen }} style={styles.img} />}
      <Button title="Cargar Foto" onPress={() => subirImagen('avatar2')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  img: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginTop: 16,
  },
});