import React from 'react'
import { Header } from '../components/Header'
import Head from "next/head";
import { Center, Container, Flex, Stack, VStack, Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {useRecoilState, useSetRecoilState} from 'recoil'
import { taijuuListState} from "../src/atoms/states"
import { changeDateFormat } from "../util/changeDateFormat";
import { useRouter } from "next/router";


  type Inputs = {
    id: string;
    taijuu: string;
  }
  
  type Taijuu = {
    id: null | number;
    taijuu: null | string;
  }
  export default function taijuu() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
   } = useForm<Inputs>()

   const [TaijuuiList, setTaijuuList] = useRecoilState<any>(taijuuListState)
   const router = useRouter();
   const onSubmit : SubmitHandler<Inputs> = ({taijuu}) =>{
    setTaijuuList((oldTaijuuList: Array<Taijuu>) => [
      ...oldTaijuuList,
      {
        id: Math.floor(Math.random() * 1000).toString(16),
        taijuu,
        createAt: changeDateFormat(new Date()),
        updateAt: changeDateFormat(new Date()),
      }
    ])
    router.push("/Top");
  }
  
    return (
        <>
          <Header />
          <Container>
            <Center>
                <VStack>
                    <Stack>
                    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
                      <FormControl>
                        <FormLabel 
                          m="0"
                          fontSize="24px"
                          lineHeight="24px"
                          color="blackAlpha.800"
                          htmlFor='taijuu'
                        >
                          体重入力
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
                      </FormControl>  
                      </form>    
                    </Stack>  
                </VStack>
            </Center>
          </Container>
        </>
    )
}
