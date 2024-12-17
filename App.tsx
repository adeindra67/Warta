import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import Home from './src/Home';
import HomeApi from './src/Home_api';
import Halaman2 from './src/Halaman2';
import Layout from './src/Layout';
import FlexBasic from './src/FlexBasic';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

// Tipe parameter untuk navigasi stack
type RootStackParamList = {
  Home: undefined;
  Profile: { name: string; id: string };
  About: undefined;
};

// Komponen AboutScreen
const AboutScreen = () => {
  return (
    <View>
      <Text style={{ fontSize: 50 }}>This is the About Page</Text>
    </View>
  );
};

// Komponen App1, App2 untuk tambahan fungsi
const App1 = () => {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text style={{ fontSize: 50 }}>Hello ARS</Text>
      <Text style={{ fontSize: 30 }}>You clicked {count} times</Text>
      <Button onPress={() => setCount(count + 1)} title="Click me!" />
    </View>
  );
};

const App2 = () => {
  return (
    <>
      <FlexBasic />
    </>
  );
};

// Komponen HomeScreen
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View>
      <Text style={{ fontSize: 50 }}>Ini halaman home</Text>
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile', { name: 'Erfian', id: '123' })}
      />
      <Button
        title="About"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
};

// Komponen ProfileScreen
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen = ({ route }: ProfileScreenProps) => {
  return (
    <View>
      <Text style={{ fontSize: 50 }}>
        This is {route.params.name}'s profile ID: {route.params.id}
      </Text>
    </View>
  );
};

// Deklarasi Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Komponen Utama App
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Halaman Profile' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Halaman About' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
