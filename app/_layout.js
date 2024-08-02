import React from 'react';
import { Stack, Screen } from 'expo-router';
import NavBar from '../components/NavBar';
import { SafeAreaView, StyleSheet} from 'react-native';

const Layout = () =>  {
  return (
    <SafeAreaView style={styles.container}>
      <Stack />
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Layout;