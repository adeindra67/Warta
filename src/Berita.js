import React from 'react';
// import { GluestackUIProvider, View, Text, Image, ScrollView } from '@gluestack-ui/themed';
import { GluestackUIProvider, Card, Image, Text, Heading, Link, HStack, LinkText } from '@gluestack-ui/themed';
import { GluestackUIStyledProvider, Button, ButtonText, View, ScrollView } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

const Berita = ({ route }) => {
    const { article } = route.params;

    return (
        <GluestackUIProvider config={config}>
            <ScrollView>
                <View style={{ padding: 20 }}>
                    <Image 
                        source={{ uri: article.urlToImage }}
                        style={{ width: '100%', height: 200, marginBottom: 20, borderRadius: 10 }}
                        alt={article.title}
                    />
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{article.title}</Text>
                    <Text style={{ fontSize: 14, color: 'gray', marginBottom: 20 }}>{article.publishedAt}</Text>
                    <Text style={{ fontSize: 16, lineHeight: 24 }}>{article.description || article.content}</Text>
                    <Text style={{ }}></Text>
                    <Text style={{ }}>Source:</Text>
                    <Link href={article.url} isExternal>
                        <HStack>
                            <LinkText style={{ color: '#007AFF', textDecorationLine: 'none', fontWeight: 'bold' }}> {article.url}</LinkText>
                        </HStack>
                    </Link>
                </View>
            </ScrollView>
        </GluestackUIProvider>
    );
};

export default Berita;