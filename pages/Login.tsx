import React from 'react';
//import { useState } from 'react';
import {auth} from '../firebase/firebaseConfig';
import Signup from './Signup';
import Link, { LinkProps } from 'next/link';

//import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Layout } from '../components/Layout';
import {
  Box,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useRouter } from 'next/router';

const login = () => {
  const router = useRouter();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    const { email, password } = event.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((user) => {
        console.log('ログイン成功=', user.user.uid)
        router.push("/Top");
      })
      .catch((error) => {
        console.error(error)
      })    
  };

  return (
    <Layout title="login">
      <form onSubmit={handleSubmit}>
      <Box mt="20" p="0" bg="green.100" h='300px' w="100%" borderWidth="1px"　borderRadius="3xl">

        <Input name="email" type="email" placeholder='Email' bg="white" mt="25" ml="50" mr="5px"  w="80%" borderRadius="3xl" />
        <Center>
          <Input name="password" type="password" placeholder='password' bg="white" mt="25" ml="50" mr="5px"  w="60%" borderRadius="3xl"/>
        </Center>
        <Center>
          <Button type="submit" w="25%" mt="5"　bgColor="#68D391" color="white" borderRadius="3xl">Login</Button>              
        </Center>  
      </Box>
      </form>
    </Layout>
  );
};

export default login