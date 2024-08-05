import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const Layout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = 'home';
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'person-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Messages') {
            iconName = 'chatbubbles-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Favourites') {
            iconName = 'heart-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
    />
  );
};

export default Layout;
