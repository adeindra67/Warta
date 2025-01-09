import React from 'react';
import { GluestackUIProvider, Button, ButtonText, Box, Center, Image } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 

const { width } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
  return (
    <GluestackUIProvider config={config}>
      <Box flex={1} bg="$white" justifyContent="center" alignItems="center" py="$10">
        {/* Logo */}
        <Center flex={1} justifyContent="center">
          <Image
            source={require('../assets/images/logo_warta.png')} 
            alt="Warta Logo"
            h={300}
            w={400}
          />
        </Center>

        {/* Tombol Akses */}
        <Box width="100%" alignItems="center" mb="$8">
          <LinearGradient colors={['#00036d', '#0081ff']} style={{ borderRadius: 100 }}> {/* Tambahkan LinearGradient */}
            <Button
              onPress={() => navigation.replace('Home')}
              bg="$transparent"  
              borderRadius="$full"
              h="$12"
              width={width * 0.9}
            >
              <ButtonText color="$white" fontSize="$md">
                Akses Warta
              </ButtonText>
            </Button>
          </LinearGradient>
        </Box>
      </Box>
    </GluestackUIProvider>
  );
};

export default Onboarding;