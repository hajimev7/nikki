import React from 'react'
import { Header } from '../components/Header'
import Head from "next/head";
import { VStack, Container, Text, Spacer, Button, Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {useRecoilState, useSetRecoilState} from 'recoil'
import { TaijuuListType, taijuuListState} from "../src/atoms/states"
import { useRouter } from "next/router";
import { changeDateFormat } from "../util/changeDateFormat";

export default function Taijuu() {
  type Inputs = {
    id: string;
    taijuu: string;
  }

  const [TaijuuiList, setTaijuuList] = useRecoilState(taijuuListState)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
   } = useForm<Inputs>()

   const onSubmit : SubmitHandler<Inputs> = ({taijuu}) =>{
    setTaijuuList((oldTaijuuList: Array<TaijuuListType>) => [
      ...oldTaijuuList,
      {
        id: Math.floor(Math.random() * 1000),
        taijuu,
        createAt: changeDateFormat(new Date()),
        updateAt: changeDateFormat(new Date()),
      }
    ])
    router.push("/TopTaijuu");
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
        <title>体重入力ページ</title>
      </Head>
      <Header/>
      <Container mt="16px" p="0" w="84.3755%" maxW="1080px">    
        <VStack>
          <Flex w="100%">
            <Text>体重入力ページ</Text>
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
            <FormControl>
              <FormLabel 
                m="0"
                fontSize="24px"
                lineHeight="24px"
                color="blackAlpha.800"
                htmlFor='taijuu'
              >
                体重を入力していください
              </FormLabel>
              <Input
                id="taijuu"
                w="100%"
                h="18px"
                mt="4px"
                p="8px 16px"
                fontSize="24px"
                fontWeight="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                {...register("taijuu", {
                  required: "体重入力は必須です",
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
