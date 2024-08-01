import React from 'react';
import { StyleSheet, View, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Listing from '../components/Listing';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Find your next ballgown..."
        />
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="black" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.listingsContainer}>
        <View style={styles.listingRow}>
          <Listing />
          <Listing />
        </View>
        <View style={styles.listingRow}>
          <Listing />
          <Listing />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  listingsContainer: {
    flex: 1,
    padding: 10,
  },
  listingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
