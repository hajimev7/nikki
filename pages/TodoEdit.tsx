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
import { todoListState, todoItemState } from "../src/atoms/states";
import { changeDateFormat } from "../util/changeDateFormat";


type FormInput = {
  title: string;
  detail: string;
  priority: string;
};

type TodoItem = {
  id: null | number;
  title: null | string;
  detail: null | string;
  // 0:NOT STARTED、1:DOING、2:DONE
  status: null | 0 | 1 | 2;
  priority: null | string;
  createAt: null | Date;
  updateAt: null | Date;
  // all:TOPページ等に表示されるTODO LIST、draft:DRAFTページ、trash:trashページ
  category: "all" | "draft" | "trash";
};

type category = "all" | "draft" | "trash";

export default function TodoEdit() {
  const [category, setCategory] = useState<category>("all");
  const [todoList, setTodoList] = useRecoilState<any>(todoListState);
  const [todoItem, setTodoItem] = useRecoilState<any>(todoItemState);
  const onChangeTodoTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setTodoItem({ ...todoItem, title: event.target.value });
  const onChangeTodoDetail = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setTodoItem({ ...todoItem, detail: event.target.value });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInput> = ({ title, detail, priority }) => {
    setTodoItem((oldTodoItem: TodoItem) => ({
      ...oldTodoItem,
      title,
      detail,
      status: 0,
      priority,
      updateAt: changeDateFormat(new Date()),
    }));

    const newArr = todoList.map((todo: TodoItem) =>
      todo.id === todoItem.id
        ? {
            ...todo,
            title: todoItem.title,
            detail: todoItem.detail,
            updateAt: changeDateFormat(new Date()),
          }
        : todo
    );
    setTodoList(newArr);
    
    if (category === "draft") {
      router.push("/draft");
    } else {
      router.push("/TopTodo");
    }
  };

  console.log(todoList.createAt);

  return (
    <>
      <Head>
        <title>Todo Edit</title>
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
              EDIT TODO
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
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
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
                h="72px"
                mt="4px"
                w="100%"
                p="8px 16px"
                fontSize="24px"
                fontWeight="bold"
                color="blackAlpha.800"
                borderWidth="1px"
                borderColor="blackAlpha.800"
                borderRadius="10px"
                type="Text"
                value={todoItem.title}
                {...register("title", {
                  required: "TITLEは必須です",
                })}
                onChange={(e) => onChangeTodoTitle(e)}
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
                value={todoItem.detail}
                {...register("detail", {
                  required: "DETAILは必須です",
                })}
                onChange={(e) => onChangeTodoDetail(e)}
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
                  {todoItem.createAt}
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
                  {todoItem.updateAt}
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
                onClick={() => setCategory("all")}
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
