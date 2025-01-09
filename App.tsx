import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Home';
import Berita from './src/Berita';
import Onboarding from './src/Onboarding';
import Popup from './src/Popup';
import ProfilScreen from './src/ProfilScreen';

// Tipe parameter untuk navigasi stack
type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Berita: { article: any };
  Profil: undefined;
  Popup: undefined; // Tambahkan tipe untuk Popup
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Berita"
          component={Berita}
          options={{ title: 'Halaman Berita' }}
        />
        <Stack.Screen
          name="Profil"
          component={ProfilScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen  // Tambahkan screen untuk Popup
          name="Popup"
          component={Popup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;