import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ListingUpload = ({ onSubmit, onClose }) => {
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');


    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos.");
        return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1, 

        });

        if (!result.canceled) {
            setImages([...images, ...result.assets.map(asset => asset.uri)]);
        }
    };

    const handleSubmit = async () => {
        const newListing = {
            images,
            title,
            description,
            category, 
            brand, 
            price,
            location,
        };

        try {
          const existingListings = await AsyncStorage.getItem('listings');
          const listings = existingListings ? JSON.parse(existingListings) : [];
          listings.push(newListing);
          await AsyncStorage.setItem('listings', JSON.stringify(listings));
          onSubmit();
        } catch (error) {
            console.error('Error saving listing:', error);
        }
        onClose();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Upload New Listing</Text>
    
          <View style={styles.imageContainer}>
            <Button title="Add Photos" onPress={pickImage} />
            <ScrollView horizontal style={styles.imageScrollView}>
                    {images.map((uri, index) => (
                        <Image key={index} source={{ uri }} style={styles.image} />
                ))}
            </ScrollView>
          </View>
    
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          <TextInput
            style={styles.input}
            placeholder="Brand"
            value={brand}
            onChangeText={setBrand}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Pick Up Location"
            value={location}
            onChangeText={setLocation}
          />
    
          {/* Buttons */}
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Close" onPress={onClose} />
        </ScrollView>
    );
    
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    submitButton: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    image: {
      width: 100,
      height: 100,
      margin: 5,
    },
    imageScrollView: {
      marginTop: 10,
   },
});

export default ListingUpload;

  
