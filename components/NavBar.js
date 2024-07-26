import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const NavBar = () => {
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuButton}>
                <AntDesign name="home" size={24} color="black" />
                <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="person-circle-outline" size={24} color="black" />
                <Text>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="chatbubbles-outline" size={24} color="black" />
                <Text>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="heart-circle-outline" size={24} color="black" />
                <Text>Favourites</Text>
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