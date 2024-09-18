import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import UploadButton from '../components/uploadButton'; 
import Listing from '../components/Listing'; 
const Profile = () => {
    const [listings, setListings] = useState([]);
    const [profilePicture, setProfilePicture] = useState(null);
    const [name, setName] = useState('Henry VIII'); 
    const [college, setCollege] = useState('Christ Church');
    const [tab, setTab] = useState('items');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const storedListings = await AsyncStorage.getItem('listings');
                if (storedListings) {
                    setListings(JSON.parse(storedListings));
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
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

    const saveDetails = async () => {
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

    const handleDelete = async (index) => {
        try {
            const updatedListings = [...listings];
            updatedListings.splice(index, 1);
            setListings(updatedListings);
            await AsyncStorage.setItem('listings', JSON.stringify(updatedListings));
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    };
        
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.details}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.info}>College: {college}</Text>
                    <Text style={styles.info}>Member since: 05/08/2024</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.editButtonText}>Edit Details</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={profilePicture ? { uri: profilePicture } : require('../assets/icon.png')}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>
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
                    <View>
                        <UploadButton onSubmit={(newListing) => setListings([...listings, newListing])} />
                        {listings.map((listing, index) => (
                            <Listing key={index} listing={listing} onDelete={() => handleDelete(index)}/>
                        ))}
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
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Profile Details</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="College"
                            value={college}
                            onChangeText={setCollege}
                        />
                        <Button title="Save" onPress={saveDetails} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editButton: {
        marginTop: 10,
    },
    editButtonText: {
        fontSize: 16,
        color: 'blue',
    },
    tabs: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: 'blue',
    },
    tabText: {
        fontSize: 16,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    reviews: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    },
    listing: {
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default Profile;