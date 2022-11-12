import React from 'react'
import { Header } from '../components/Header'
import Head from "next/head";
import { VStack, Container, Text, Spacer, Button, Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {useRecoilState, useSetRecoilState} from 'recoil'
import { nikkiListState} from "../src/atoms/states"
import { useRouter } from "next/router";
import { changeDateFormat } from "../util/changeDateFormat";

export default function Create() {
  type Inputs = {
    id: string;
    title: string;
    detail: string;
    sleeptimemokuhyou: string;
    sleeptimejisseki : string;
  }

  type NikkiList = {
    id: number;
    title: string;
    detail: string;
    createAt: string;
    updateAt: string;
    sleeptimemokuhyou : string;
    sleeptimejisseki : string;
  }

  const [NikkiList, setNikkiList] = useRecoilState<any>(nikkiListState)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
   } = useForm<Inputs>()

   const onSubmit : SubmitHandler<Inputs> = ({title,detail,sleeptimemokuhyou,sleeptimejisseki}) =>{
    setNikkiList((oldNikkiList: Array<NikkiList>) => [
      ...oldNikkiList,
      {
        id: Math.floor(Math.random() * 1000).toString(16),
        title,
        detail,
        sleeptimemokuhyou,
        sleeptimejisseki,
        createAt: changeDateFormat(new Date()),
        updateAt: changeDateFormat(new Date()),
      }
    ])
    router.push("/Top");
  }

  // const addNikki = (data: Inputs) => {
  //   setNikkiList((oldNikkiList: Array<NikkiList>) => [
  //     ...oldNikkiList,
  //     data,
  //   ])
  // }
  // console.log(NikkiList)



  return (
    <>
      <Head>
        <title>Nikki New</title>
      </Head>
      <Header/>
      <Container mt="16px" p="0" w="84.3755%" maxW="1080px">    
        <VStack>
          <Flex w="100%">
            <Text>NEW NIKKI</Text>
              <Spacer/>
              <Button
                w="112px"
                h="40px"
                mt="8px"
                fontSize="18px"
                fontWeight="bold"
                bg="#68D391"
                borderRadius="50px"
                onClick={() => router.back()}
                >Back
              </Button>
          </Flex>
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)} >
          <Flex w="100%" bg="yellow">
          <FormControl>
              <FormLabel 
                m="0"
                fontSize="24px"
                lineHeight="24px"
                color="blackAlpha.800"
                htmlFor='title'
              >
                起床時間 : 
              
              <Input
                id="sleeptimemokuhyou"
                w="30%"
                h="18px"
                mt="4px"
                p="8px 16px"
                fontSize="24px"
                fontWeight="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                placeholder='目標'
                {...register("sleeptimemokuhyou", {
                  required: "sleeptimemokuhyouは必須です",
                })}
              />
              
              <Input
                id="sleeptimemojisseki"
                w="30%"
                h="18px"
                mt="4px"
                p="8px 16px"
                fontSize="24px"
                fontWeight="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                placeholder='実績'
                {...register("sleeptimejisseki", {
                  required: false,
                })}
              />
             </FormLabel>
            </FormControl>
            </Flex>
            <FormControl>
              <FormLabel 
                m="0"
                fontSize="24px"
                lineHeight="24px"
                color="blackAlpha.800"
                htmlFor='title'
              >
                TITLE
              </FormLabel>
              <Input
                id="title"
                w="100%"
                h="18px"
                mt="4px"
                p="8px 16px"
                fontSize="24px"
                fontWeight="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                {...register("title", {
                  required: "TITLEは必須です",
                })}
              />
            </FormControl>
            <FormControl>
            <FormLabel 
                m="0"
                mt="10"
                fontSize="24px"
                lineHeight="24px"
                color="blackAlpha.800"
                htmlFor='title'
              >
                DETAIL
              </FormLabel>
              <Textarea
                id="detail"
                h="208px"
                mt="4px"
                w="100%"
                fontSize="24px"
                fontWeight="bold"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                {...register("detail",{
                  required:"DETAILは必須です",
                })}
              />
            </FormControl>
            <Flex w="100%">
            <Button
              type="submit"
              w="112"
              h="40px"
              m="4px 0 0 8px"
              p="0"
              fontSize="18px"
              fontWeight="bold"
              bg="#68D391"
              color="green.50"
              borderWidth="1px"
              borderColor="blackAlpha.800"
              borderRadius="50px"
              justifyContent="flex-end"
              mr="0"
              ml="auto"
            >
              CREATE
            </Button>
            </Flex>
          </form>    
        </VStack>
      </Container>
    </>
  )
}
