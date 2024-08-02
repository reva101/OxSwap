import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigationState, useRouter } from 'expo-router';

const NavBar = () => {

    const router = useRouter();

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/')}>
                <AntDesign name="home" size={24} color="black" />
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/Favourites')}>
                <Ionicons name="heart-circle-outline" size={24} color="black" />
                <Text>Favourites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/Messages')}>
                <Ionicons name="chatbubbles-outline" size={24} color="black" />
                <Text>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => router.push('/Profile')}>
                <Ionicons name="person-circle-outline" size={24} color="black" />
                <Text>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderColor: '#ccc',
      paddingVertical: 10,
      backgroundColor: '#fff',
    },
    menuButton: {
      alignItems: 'center',
    },
});

export default NavBar;