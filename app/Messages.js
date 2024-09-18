import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Messages = () => {
  return (
    <View style={styles.container}>
      <Text>Messages Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default Messages;
