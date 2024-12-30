import React, { useState, useEffect } from 'react';
import { View, Text, Button, BackHandler } from 'react-native';
import Home from './src/Home';
import Berita from './src/Berita';
import Onboarding from './src/Onboarding';
import Popup from './src/Popup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

// Tipe parameter untuk navigasi stack
type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: { name: string; id: string };
  About: undefined;
  Berita: { article: any };
};

// Komponen BeritaScreen
type BeritaScreenProps = NativeStackScreenProps<RootStackParamList, 'Berita'>;

// Deklarasi Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Komponen Utama App
const App = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (isPopupVisible) {
        setPopupVisible(false); // Tutup pop-up jika sedang terbuka
      } else {
        setPopupVisible(true); // Tampilkan pop-up
      }
      return true; // Mencegah aplikasi keluar langsung
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isPopupVisible]);

  const handleExit = () => {
    BackHandler.exitApp(); // Keluar dari aplikasi
  };

  const handleCancel = () => {
    setPopupVisible(false); // Tutup pop-up
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ headerShown: false }} // Hilangkan header untuk splash screen
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
      </Stack.Navigator>

      {/* Pop-up konfirmasi keluar */}
      <Popup visible={isPopupVisible} onCancel={handleCancel} onExit={handleExit} />
    </NavigationContainer>
  );
};

export default App;