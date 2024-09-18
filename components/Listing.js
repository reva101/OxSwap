{ /* import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListingCard from './ListingCard';


const Listing = (listing, onDelete) => {
  const [isFavourited, setIsFavourited] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const setFav = () => {
    setIsFavourited(!isFavourited);
  };

  const openDetails = () => {
    setShowDetail(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDetails} style={styles.listing}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} // replace w actual image
          style= {styles.image}
        />
        <Text style={styles.price}>£20</Text> 
        <TouchableOpacity onPress={setFav} style={styles.heartIcon}>
          <Ionicons 
            name={isFavourited ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavourited ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal 
        animationType="slide"
        transparent={false}
        visible={showDetail}
        onRequestClose={() => setShowDetail(false)}
      >
        <ListingCard onClose={() => setShowDetail(false)} />
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
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  price: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Listing; */}

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ListingCard from './ListingCard';

const Listing = ({ listing, onDelete }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);

  const toggleFavourite = () => {
    setIsFavourited(!isFavourited);
  };

  if (!listing) {
    return null; // or some fallback UI
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDetail(true)} style={styles.listing}>
        <View style={styles.imageContainer}>
          <ScrollView horizontal pagingEnabled contentContainerStyle={styles.scrollViewContent}>
              {listing.images.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.image} />
              ))}
          </ScrollView>
        </View>
        <Text style={styles.title}>{listing.title} </Text>
        <Text style={styles.price}>£{listing.price}</Text>
        <TouchableOpacity onPress={toggleFavourite} style={styles.heartIcon}>
          <Ionicons
            name={isFavourited ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavourited ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal 
        animationType="slide"
        transparent={false}
        visible={showDetail}
        onRequestClose={() => setShowDetail(false)}
      >
        <ListingCard 
          onClose={() => setShowDetail(false)} 
          onDelete={onDelete} 
          listing={listing} 
        />
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
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '70%',
    height: '70%',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
    // width: '100%',
    // height: '80%',
  },
  price: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Listing;