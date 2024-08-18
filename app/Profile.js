import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Listing from '../components/Listing';
import * as ImagePicker from 'expo-image-picker';

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tab, setTab] = useState('items');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    loadProfileDetails();
  }, []);

  const loadProfileDetails = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const storedCollege = await AsyncStorage.getItem('college');
      const storedProfilePicture = await AsyncStorage.getItem('profilePicture');

      if (storedName !== null) setName(storedName);
      if (storedCollege !== null) setCollege(storedCollege);
      if (storedProfilePicture !== null) setProfilePicture(storedProfilePicture);
    } catch (error) {
      console.error('Failed to load profile details:', error);
    }
  };

  const saveDetails = async () => { // currently stored locally to be changed ?
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('college', college);
      await AsyncStorage.setItem('profilePicture', profilePicture);
      setModalVisible(false);
    } catch (error) {
      console.error('Failed to save profile details:', error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.info}>College: {college}</Text>
          <Text style={styles.info}>Member since: 05/08/2024</Text>
        </View>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require('../assets/icon.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.editButtonText}>Edit Details</Text>
      </TouchableOpacity>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, tab === 'items' && styles.activeTab]} onPress={() => setTab('items')}>
          <Text style={styles.tabText}>My Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'reviews' && styles.activeTab]} onPress={() => setTab('reviews')}>
          <Text style={styles.tabText}>Reviews</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {tab === 'items' ? (
          <View style={styles.listings}>
            <Listing />
            <Listing />
            <Listing />
            <Listing />
          </View>
        ) : (
          <View style={styles.reviews}>
            <Text>No reviews yet</Text>
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.info}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.info}>College:</Text>
            <TextInput
              style={styles.input}
              placeholder="College"
              value={college}
              onChangeText={setCollege}
            />
            <Button title="Save" onPress={saveDetails} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
    padding: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 4,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  listings: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reviews: {
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Profile;
