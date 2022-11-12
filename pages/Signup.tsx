// firebase v9 auth, SignUp sample
import React from 'react';
import { useState } from 'react';
import {auth} from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Layout } from '../components/Layout';
import {
  Box,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
console.log(email, password);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(( userCredential) => {
      router.push("/Top");
      console.log('user created');
      console.log(userCredential)
    })
    .catch((error) => {
      alert(error.message)
      console.error(error)
    }); 
    console.log(email.value);
  };
  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <Layout title='Singup'>
    <Box mt="20" p="0" bg="green.100" h='300px' w="100%" borderWidth="1px"　borderRadius="3xl">
      <Box mt="5" ml="5px" bg="white" h='30px' w="100px" borderRadius="3xl" textAlign='center' color="green.500"> EMAIL</Box>
      <form onSubmit={handleSubmit}>
      <Input 
      bg="white"
       mt="25" ml="50" mr="5px"  w="80%"  
       name="email"
            type="email"
            placeholder="email"
            onChange={(event) => handleChangeEmail(event)}
            borderRadius="3xl"/>
        <Center>
          <Input
            bg="white"
            mt="2" w="40%"
            name="password"
            type="password"
            placeholder="password"
            onChange={(event) => handleChangePassword(event)}
          />
        </Center>

      <Center>
        <Button type='submit' w="25%" mt="5"　bgColor="#68D391" color="white" borderRadius="3xl">登録</Button>              
      </Center>
      </form> 
    </Box>
    </Layout>   
  );
};

export default Signup;