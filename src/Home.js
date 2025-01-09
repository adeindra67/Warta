import React, { useEffect, useState } from 'react';
import { GluestackUIStyledProvider, Button, ButtonText, View, ScrollView, Input } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { TextInput } from 'react-native';
import { GluestackUIProvider, Card, Image, Text, Heading, Link, HStack, LinkText } from '@gluestack-ui/themed';
import { ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Popup from './Popup';
import LinearGradient from 'react-native-linear-gradient'; 

const categories = ['Kesehatan', 'Bisnis', 'Seni', 'Olahraga'];

const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('Semua'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false); 
  const localNavigation = useNavigation();

  const getNews = async (category, searchTerm = '') => {
    try {
      let query = searchTerm ? searchTerm : category;
      const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=6d4b261c262e4a51a4408f2e839d5530`);
      const json = await response.json();
      setData(json.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews(category, searchTerm);
  }, [category, searchTerm]);

  useEffect(() => {
    const backAction = () => {
      const currentRoute = localNavigation.getState()?.routes[localNavigation.getState()?.index || 0];
      if (currentRoute?.name === 'Home') {
        setIsPopupVisible(true);
      } else if (currentRoute) {
        localNavigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation, localNavigation]);

  const resetCategory = () => {
    setCategory('Semua');
    setSearchTerm('');
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleExit = () => {
    BackHandler.exitApp();
  };

  return (
    <GluestackUIProvider config={config}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Header with Logo and Search */}
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <Image
            source={require('../assets/images/logo_warta.png')}
            alt="Warta Logo"
            style={{ width: 100, height: 50 }}
          />
          <TextInput
            placeholder="Cari Berita"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{ flex: 1, marginLeft: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 20, paddingLeft: 25 }}
          />
        </View>

        {/* Category Navigation */}
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => {
                  setCategory(cat);
                  setSearchTerm('');
                }} 
                style={{
                  borderWidth: 2,     
                  borderColor: category === cat ? '#FD670A' : '#0061ff', 
                  marginHorizontal: 1,
                  borderRadius: 20,
                }} 
              >
                <LinearGradient
                  colors={category === cat ? ['#00036d', '#0081ff'] : ['white', 'white']}
                  style={{ 
                    paddingVertical: 5, 
                    paddingHorizontal: 18, 
                    borderRadius: 18,  
                    padding: 5,
                  }}
                >
                  <Text style={{ color: category === cat ? 'white' : 'black' }}>{cat}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
        </View>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            {data.map((item, index) => (
              <Card key={index} style={{ margin: 15, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                <Image
                  alt="Header Berita" 
                  source={{ uri: typeof item.urlToImage === 'string' ? item.urlToImage : 'https://via.placeholder.com/200' }}
                  style={{ width: '100%', height: 200, borderRadius: 10 }}
                />
                <Text style={{ padding: 10, fontSize: 12 }}>{item.publishedAt}</Text>
                <Heading style={{ padding: 10, fontSize: 16 }}>{item.title}</Heading>
                <Link onPress={() => navigation.navigate('Berita', { article: item })}>
                  <HStack alignItems="center">
                    <LinkText style={{ padding: 10, color: '#007AFF', textDecorationLine: 'none', fontWeight: 'bold' }}>Read More</LinkText>
                  </HStack>
                </Link>
              </Card>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Tombol navigasi dan Popup */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={resetCategory}>
          <Image 
            source={require('../assets/images/home.png')} 
            style={{ width: 25, height: 25 }} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profil')}> 
          <Image 
            source={require('../assets/images/profile.png')} 
            style={{ width: 25, height: 25 }} 
          />
        </TouchableOpacity>
      </View>
      <Popup visible={isPopupVisible} onCancel={handleCancel} onExit={handleExit} /> 
  
  </GluestackUIProvider>
  );
};

export default Home;