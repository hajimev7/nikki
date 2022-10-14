import React from 'react'
import { Header } from '../components/Header'
import Head from "next/head";
import { Center, Container, Flex, Stack, VStack, Text } from '@chakra-ui/react';


export default function Taijuu() {

    return (
        <>
          <Header />
          <Container>
            <Center>
                <VStack>
                    <Stack>
                    <Text
                      fontSize="28px"
                      fontWeight="bold"
                      lineHeight="33px"
                      color="blackAlpha.800"
                      mb={`15px`}
                    >
                      体重入力
                    </Text> 
                    </Stack>
                </VStack>
            </Center>
          </Container>
        </>
    )
}
