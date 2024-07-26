import React from 'react';
import { StyleSheet, View } from 'react-native';

const Listing = () => {
  return (
    <View style={styles.listing}>
      {/* Content for the listing in here */}
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    flex: 1,
    height: 150,
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 5,
  },
});

export default Listing;
