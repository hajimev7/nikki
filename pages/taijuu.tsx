import React from 'react'
import { Header } from '../components/Header'
import Head from "next/head";
import { VStack, Container, Text, Spacer, Button, Flex, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {useRecoilState, useSetRecoilState} from 'recoil'
import { taijuuListState} from "../src/atoms/states"
import { useRouter } from "next/router";
import { changeDateFormat } from "../util/changeDateFormat";

function taijuu() {
  type Inputs = {
    id: string;
    taijuu: string;
  }

  type TaijuuList = {
    id: null | number;
    taijuu: null | string;
    createAt: null | string;
    updateAt: null | string;
  }

  const [TaijuuiList, setTaijuuList] = useRecoilState<any>(taijuuListState)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
   } = useForm<Inputs>()

   const onSubmit : SubmitHandler<Inputs> = ({taijuu}) =>{
    setTaijuuList((oldTaijuuList: Array<TaijuuList>) => [
      ...oldTaijuuList,
      {
        id: Math.floor(Math.random() * 1000).toString(16),
        taijuu,
        createAt: changeDateFormat(new Date()),
        updateAt: changeDateFormat(new Date()),
      }
    ])
    router.push("/toptaijuu");
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
        <title>Taijuu New</title>
      </Head>
      <Header/>
      <Container mt="16px" p="0" w="84.3755%" maxW="1080px">    
        <VStack>
          <Flex w="100%">
            <Text>NEW Taijuu</Text>
              <Spacer/>
              <Button
                w="112px"
                h="40px"
                mt="8px"
                fontSize="18px"
                fontWeight="bold"
                bg="#68D391"
                borderRadius="50px"
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
                htmlFor='title'
              >
                TAIJUU
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

export default taijuu
