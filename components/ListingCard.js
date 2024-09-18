import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  PanResponder,
  Animated,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListingCard = ({ onClose, onDelete, listing }) => {
  
  return (
    <View style={styles.modalContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
          {listing.images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
        </ScrollView>
        <Text style={styles.title}>{listing.title}</Text> 
        <Text style={styles.title}>£{listing.price}</Text>
        <Text style={styles.description}>{listing.description}</Text>
        <Text style={styles.detail}>Category: {listing.category}</Text> 
        { /* <Text style={styles.detail}>Size: {listing.size}</Text> */}
        <Text style={styles.detail}>Brand: {listing.brand}</Text> 
        <Text style={styles.detail}>Pick up from: {listing.location}</Text> 
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.messageButton}>
            <Text style={styles.buttonText}>Message Seller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deleteButton}>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete} >
            <Text style={styles.buttonText}>Delete Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#97bf75',
    paddingTop: StatusBar.currentHeight || 20, 
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  imageContainer: {
    height: 300,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  messageButton: {
    backgroundColor: '#002147',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  buyButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ListingCard;
