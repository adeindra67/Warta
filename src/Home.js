import React, { useEffect, useState } from 'react';
import { GluestackUIStyledProvider, Button, ButtonText, View, ScrollView, Input } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Card, Image, Text, Heading, Link, HStack, LinkText, Tabs, Tab } from '@gluestack-ui/themed';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

const categories = ['Kesehatan', 'Bisnis', 'Seni', 'Olahraga'];

const Home = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('Semua'); 
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    const getNews = async (category, searchTerm = '') => {
        try {
            let query = searchTerm ? searchTerm : category;
            const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&pageSize=5&apiKey=6d4b261c262e4a51a4408f2e839d5530`);
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

    const resetCategory = () => {
      setCategory('Semua');
      setSearchTerm('');
    };

    return (
        <GluestackUIProvider config={config}>
            <View style={{ flex: 1 }}>
                {/* Header with Logo and Search */}
                <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Image
                        source={require('../assets/images/logo_warta.png')}
                        alt="Warta Logo"
                        style={{ width: 100, height: 50 }}
                    />
                    <Input 
                        placeholder="Search News"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                        style={{ flex: 1, marginLeft: 10, paddingHorizontal: 10 }}
                    />
                </View>

                {/* Category Navigation */}
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
                    {categories.map((cat) => (
                        <Button key={cat} onPress={() => {
                            setCategory(cat);
                            setSearchTerm(''); // Clear search when selecting a category
                        }} style={{ padding: 10, borderRadius: 20, backgroundColor: category === cat ? '#007AFF' : 'white' }}>
                            <ButtonText style={{ color: category === cat ? 'white' : 'black' }}>{cat}</ButtonText>
                        </Button>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={resetCategory}> {/* Wrap the Image in TouchableOpacity */}
                    <Image 
                        source={require('../assets/images/home.png')} 
                        style={{ width: 25, height: 25 }} 
                    />
                </TouchableOpacity>
                <Text onPress={resetCategory} style={{ fontSize: 20, marginHorizontal: 10 }}>|</Text>
                <Image 
                    source={require('../assets/images/profile.png')} 
                    style={{ width: 25, height: 25 }} 
                />
            </View>
        </GluestackUIProvider>
    );
};

export default Home;