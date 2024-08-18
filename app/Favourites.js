import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Listing from '../components/Listing';

const Favourites = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.listingRow}>
          <Listing />
          <Listing />
        </View>
        <View style={styles.listingRow}>
          <Listing />
          <Listing />
        </View>
        <View style={styles.listingRow}>
          <Listing />
          <Listing />
        </View>
        <View style={styles.listingRow}>
          <Listing />
          <Listing />
        </View>
        <View style={styles.listingRow}>
          <Listing />
          <Listing />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 10,
  },
  listingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default Favourites;
