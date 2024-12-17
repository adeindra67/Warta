import React, {useEffect, useState} from 'react';
import { GluestackUIStyledProvider, Button, ButtonText } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider, Alert, FlatList, AlertText, Card, Image, Text, Heading, Link, HStack, LinkText, } from '@gluestack-ui/themed';
import {ActivityIndicator} from 'react-native';


const Berita = () =>{
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
        const response = await fetch('https://newsapi.org/v2/everything?q=sports&pageSize=5&apiKey=6d4b261c262e4a51a4408f2e839d5530');
        const json = await response.json();
        setData(json.articles);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);
    
    return (
        <>
        {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
                data={data}
                renderItem={({ item }) => (
                <Card p="$5" borderRadius="$lg" m="$3">
                    <Image
                    mb="$6"
                    h={240}
                    width="$full"
                    borderRadius="$md"
                    alt="image"
                    source={{
                    uri:'' + item.urlToImage+'',
                    }}
                />
                <Text
                    fontSize="$sm"
                    fontStyle="normal"
                    fontFamily="$heading"
                    fontWeight="$normal"
                    lineHeight="$sm"
                    mb="$2"
                    sx={{
                    color: '$textLight700',
                    _dark: {
                        color: '$textDark200',
                    },
                    }}
                >
                    {item.publishedAt}
                </Text>
                <Heading size="md" fontFamily="$heading" mb="$4">
                    {item.title}
                </Heading>
                <Link href={item.url} isExternal>
                    <HStack alignItems="center">
                    <LinkText
                        size="sm"
                        fontFamily="$heading"
                        fontWeight="$semibold"
                        color="$primary600"
                        $dark-color="$primary300"
                        textDecorationLine="none"
                    >
                        Read Blog
                    </LinkText>
                    {/* <Icon
                        as={ArrowRightIcon}
                        size="sm"
                        color="$primary600"
                        mt="$0.5"
                        ml="$0.5"
                        $dark-color="$primary300"
                    /> */}
                    </HStack>
                </Link>
                </Card>
            )}
            // keyExtractor={(item) => item.id}
        />
        )}
    </>
);}

const Home = () => {
  return (
    <GluestackUIProvider config={config}>
      {/* <Button>
        <ButtonText>Hello World</ButtonText>
      </Button> */}

        <Alert mx="$2.5" action="info" variant="outline">
        {/* <AlertIcon as={InfoIcon} mr="$3" /> */}
            <AlertText>
                We have updated our terms of service. Please review and accept to continue
                using our service.
            </AlertText>
        </Alert>
        <Berita />
    </GluestackUIProvider>
  )
}

export default Home;