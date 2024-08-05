import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Listing from '../components/Listing';

const Favourites = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listingsContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listingsContainer: {
    flex: 1,
    padding: 10,
  },
});

export default Favourites;
