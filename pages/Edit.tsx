import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import Head from "next/head";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spacer,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { nikkiListState, nikkiItemState } from "../src/atoms/states";
import { changeDateFormat } from "../util/changeDateFormat";

type FormInput = {
  title: string;
  detail: string;
  sleeptimemokuhyou : string;
  sleeptimejisseki : string;
};

type nikkiItem = {
  id:  number;
  title:  string;
  sleeptimemokuhyou : string;
  sleeptimejisseki : string;
  createAt:  Date;
  updateAt:  Date;
};

type category = "all" | "draft" | "trash";


export default function Edit() {
  const [input, setInput] = useState("");
  const [nikkiList, setnikkiList] = useRecoilState<any>(nikkiListState);
  const [nikkiItem, setnikkiItem] = useRecoilState<any>(nikkiItemState);
  const onChangenikkiTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setnikkiItem({ ...nikkiItem, title: event.target.value });
  const onChangenikkiDetail = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setnikkiItem({ ...nikkiItem, detail: event.target.value });
  const onChangesleeptimeJisseki = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setnikkiItem({ ...nikkiItem, sleeptimejisseki: event.target.value });


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = ({ title, detail,sleeptimejisseki,sleeptimemokuhyou}) => {
    setnikkiItem((oldnikkiItem: nikkiItem) => ({
      ...oldnikkiItem,
      title,
      detail,
      sleeptimemokuhyou,
      sleeptimejisseki,
      updateAt: changeDateFormat(new Date()),
    }));

    const newArr = nikkiList.map((nikki: nikkiItem) =>
      nikki.id === nikkiItem.id
        ? {
            ...nikki,
            title: nikkiItem.title,
            detail: nikkiItem.detail,
            updateAt: changeDateFormat(new Date()),
            sleeptimejisseki: nikkiItem.sleeptimejisseki
          }
        : nikki
    );
    setnikkiList(newArr);
    router.push("/Top");
  };

  console.log(nikkiList.createAt);

  const resetButtonClick = () => {
    setInput("");
  };

  return (
    <>
      <Head>
        <title>nikki Edit</title>
      </Head>
      <Header />
      <Container mt="16px" p="0" w="84.375%" maxW="1080px">
        <VStack>
          <Flex w="100%">
            <Text
              fontSize="28px"
              fontWeight="bold"
              lineHeight="33px"
              color="blackAlpha.800"
            >
              日記編集ページ
            </Text>
            
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
              mr="0"
              ml="auto"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </Flex>
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.detail ? true : false}>
              <FormLabel
                // FormControlにmt:8pxがあるため、FormLabelのmtは16pxに設定
                m="16px 0 0 0"
                fontSize="24px"
                fontWeight="bold"
                lineHeight="24px"
                color="blackAlpha.800"
              >
                睡眠時間(実績)
              </FormLabel>
              <Textarea
                id="sleeptaimejisseki"
                h="30px"
                mt="4px"
                fontSize="24px"
                fontWeight="bold"
                color="blackAlpha.800"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                value={nikkiItem.sleeptimejisseki}
                {...register("sleeptimejisseki", {
                  required: "睡眠時間の入力は必須です",
                })}
                onChange={(e) => onChangesleeptimeJisseki(e)}
              />
              <FormErrorMessage>
                {errors.sleeptimejisseki && errors.sleeptimejisseki.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.title ? true : false}>
              <FormLabel
                m="0"
                fontSize="24px"
                fontWeight="bold"
                lineHeight="24px"
                color="blackAlpha.800"
                htmlFor="title"
              >
                TITLE
              </FormLabel>
              <Input
                id="title"
                h="36px"
                mt="4px"
                p="8px 16px"
                w="100%"
                fontSize="24px"
                fontWeight="bold"
                color="blackAlpha.800"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                type="Text"
                value={nikkiItem.title}
                {...register("title", {
                  required: "TITLEは必須です",
                })}
                onChange={(e) => onChangenikkiTitle(e)}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.detail ? true : false}>
              <FormLabel
                // FormControlにmt:8pxがあるため、FormLabelのmtは16pxに設定
                m="16px 0 0 0"
                fontSize="24px"
                fontWeight="bold"
                lineHeight="24px"
                color="blackAlpha.800"
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
                color="blackAlpha.800"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                value={nikkiItem.detail}
                {...register("detail", {
                  required: "DETAILは必須です",
                })}
                onChange={(e) => onChangenikkiDetail(e)}
              />
              <FormErrorMessage>
                {errors.detail && errors.detail.message}
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
                  {nikkiItem.createAt}
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
                  {nikkiItem.updateAt}
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
                mr="0"
                ml="auto"
              >
                UPDATE
              </Button>
            </Flex>
          </form>
        </VStack>
      </Container>
    </>
  );
}
