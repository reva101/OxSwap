import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListingUpload from './ListingUpload';
import { useState } from 'react';


const UploadButton = ({ onSubmit }) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
    <View style={styles.container}>
        <TouchableOpacity 
        style={styles.listing}
        onPress={() => setModalVisible(true)}
        >
        <Ionicons
                name='add-circle-outline'
                size={72}
                color='black'
                style={styles.icon}
        />   
        <Text style={styles.text}>Upload an item</Text> 
        </TouchableOpacity>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <ListingUpload onSubmit={onSubmit} onClose={() => setModalVisible(false)} />
                </View>
            </View>
        </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listing: {
      height: 200,
      backgroundColor: '#97bf75',
      margin: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadText: {
      marginTop: 10,
      fontSize: 18,
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '90%',
      height: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
});

export default UploadButton;