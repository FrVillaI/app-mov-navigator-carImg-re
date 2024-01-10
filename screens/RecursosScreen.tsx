import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/Config';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

export default function RecursosScreen() {
  const [imagen, setImagen] = useState('');

  const cargarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  async function subirImagen(nombre:string) {
    const storageRef = ref(storage, 'test/' + nombre);

    try {
        const response = await fetch(imagen);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob, {
            contentType: 'image/jpg'
        });

        console.log('La imagen se subió con éxito');
        Alert.alert('Mensaje', 'La imagen se subió con éxito');

        // Descomentar estas líneas si necesitas la URL de la imagen
        // const imageURL = await getDownloadURL(storageRef);
        // console.log('URL de descarga de la imagen', imageURL);
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir Imagen desde la Galería</Text>
      <Button title='Seleccionar Imagen' onPress={() => cargarImagen()} />
      {imagen && <Image source={{ uri: imagen }} style={styles.img} />}
      <Button title='Cargar Imagen' onPress={() => subirImagen('avatar1')} />
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