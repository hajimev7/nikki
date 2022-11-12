import React from "react";
import { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig';
import Link from 'next/link'

export const Header = () => {
  const router = useRouter();
  const date = new Date();
  const formatDate =
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
  
  const [isLogin, setIsLogin] = useState<null | boolean>(null)
  const clickLogout = async function (){
    signOut(auth).then(()=>{
      console.log("ログアウトしました");
      router.push("/Login")
    })
    .catch( (error)=>{
      console.log(`ログアウト時にエラーが発生しました (${error})`);
    });
  } 
  
  useEffect(() => {
    let isMounted = true;
    auth.onAuthStateChanged((user) => {
      if (isMounted) {
        user ? setIsLogin(true) : setIsLogin(false);
      }
    })
    return () => { isMounted = false };
  }, [])
    
  return (
    <Flex h="80px" bgColor="#68D391" alignItems="center">
      <Heading
        color="blackAlpha.800"
        ml="99px"
        fontSize="48px"
        fontWeight="bold"
        _hover={{
          cursor: "pointer",
        }}
        onClick={() => router.push("/Top")}
      >
        日記 & 体重管理
      </Heading>
      <Spacer />
          
        {isLogin
        ? <Button mr="10" className="btn-s is-orange" onClick={clickLogout}>ログアウト</Button>
        : <Button mr="10" onClick={() => router.push("/Login")}><a className="btn-s is-orange">ログイン</a></Button>
      }
    </Flex>
  );
};
