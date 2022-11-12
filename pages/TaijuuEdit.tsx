import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import Head from "next/head";
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  Text,
  Textarea,
  VStack,
  Center,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { taijuuListState, taijuuItemState, taijuuItemType } from "../src/atoms/states";
import { changeDateFormat } from "../util/changeDateFormat";

type FormInput = {
  taijuu: string;
  detail: string;
};

export default function TaijuuEdit() {
  const [input, setInput] = useState("");
  const [taijuuList, settaijuuList] = useRecoilState(taijuuListState);
  const [taijuuItem, settaijuuItem] = useRecoilState(taijuuItemState);
  const onChangetaijuu = (event: ChangeEvent<HTMLInputElement>) =>
    settaijuuItem({ ...taijuuItem, taijuu: event.target.value });


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = ({ taijuu}) => {
    settaijuuItem((oldtaijuuItem: taijuuItemType) => ({
      ...oldtaijuuItem,
      taijuu,
      updateAt: changeDateFormat(new Date()),
    }));

    const newArr = taijuuList.map((taijuu: taijuuItemType) =>
      taijuu.id === taijuuItem.id
        ? {
            ...taijuu,
            taijuu: taijuuItem.taijuu,
            updateAt: changeDateFormat(new Date()),
          }
        : taijuu
    );
    settaijuuList(newArr);
    router.push("/toptaijuu");
  };



  const resetButtonClick = () => {
    setInput("");
  };

  return (
    <>
      <Head>
        <title>体重の編集ページ</title>
      </Head>
      <Header />
      <Box mt="16px" p="0" w="84.375%" maxW="1080px">
        <Center>
        <VStack>
          <Flex w="100%">
            <Text
              fontSize="28px"
              fontWeight="bold"
              lineHeight="33px"
              color="blackAlpha.800"
            >
              体重記録の編集ページ
            </Text>
            <Spacer />
            <Button
              w="112px"
              h="40px"
              mt="8px"
              fontSize="18px"
              fontWeight="bold"
              bg="green.300"
              color="blackAlpha.800"
              borderWidth="1px"
              borderColor="blackAlpha.800"
              borderRadius="50px"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </Flex>
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)} >
            <FormControl isInvalid={errors.taijuu ? true : false}>
            <FormLabel
                m="0"
                fontSize="24px"
                fontWeight="bold"
                lineHeight="24px"
                color="blackAlpha.800"
                htmlFor="title"
              >
                起床時間
              </FormLabel>             
              <Spacer/>
              <Input
                id="title"
                h="72px"
                mt="4px"
                p="8px 16px"
                fontSize="24px"
                fontWeight="bold"
                color="blackAlpha.800"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                type="Text"
                value={taijuuItem.taijuu}
                {...register("taijuu", {
                  required: "体重入力はは必須です",
                })}
                onChange={(e) => onChangetaijuu(e)}
              />
              <FormErrorMessage>
                {errors.taijuu && errors.taijuu.message}
              </FormErrorMessage>
            </FormControl>

            <Flex
              // Flexにmt:8pxがあるため、Buttonのmtは16pxに設定
              mt="16px"
            >
              <Flex direction="column">
                <Text
                  fontSize="16px"
                  fontWeight="bold"
                  lineHeight="16px"
                  color="blackAlpha.800"
                >
                  Create
                </Text>
                <Text
                  mt="4px"
                  fontSize="20px"
                  fontWeight="bold"
                  lineHeight="20px"
                  color="blackAlpha.800"
                >
                  {taijuuItem.createAt}
                </Text>
              </Flex>

              <Flex ml="27px" direction="column">
                <Text
                  fontSize="16px"
                  fontWeight="bold"
                  lineHeight="16px"
                  color="blackAlpha.800"
                >
                  Update
                </Text>
                <Text
                  mt="4px"
                  fontSize="20px"
                  fontWeight="bold"
                  lineHeight="20px"
                  color="blackAlpha.800"
                >
                  {taijuuItem.updateAt}
                </Text>
              </Flex>
            </Flex>

            <Flex w="100%" flexDirection="row-reverse">
              <Button
                type="submit"
                w="112px"
                h="40px"
                // Flexにmt:8pxがあるため、Buttonのmtは4pxに設定
                m="4px 0 0 8px"
                p="0"
                fontSize="18px"
                fontWeight="bold"
                bg="green.600"
                color="green.50"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="50px"
              >
                UPDATE
              </Button>
            </Flex>
          </form>
        </VStack>
        </Center>
      </Box>
    </>
  );
}
