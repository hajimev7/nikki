import { useEffect, useState } from "react";
import { Header } from '../components/Header'
import {
  Center,
  Container,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Select,
  IconButton,
  TableContainer,
  Tr,
  Thead,
  Table,
  Th,
  Button,
  Td,
  Tbody,
  ButtonProps,
} from "@chakra-ui/react";
import { todoListState, todoItemState } from "../src/atoms/states";
import { filterTodoList } from "../util/filterTodoList";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Paginator,
  Previous,
  Next,
  PageGroup,
  usePaginator,
} from "chakra-paginator";
import { useRouter } from 'next/router'
import StatusButton from "../components/StatusButton";
import PrioritySelect from "../components/PrioritySelect";


export default function Top() {
  const [createtimeinput, setcreatetimeinput] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [input, setInput] = useState("");
  const [statusSelect, setStatusSelect] = useState("");
  const [prioritySelect, setPrioritySelect] = useState("");
  const [todoList, settodoList] = useRecoilState(todoListState);
  const setTodoItem = useSetRecoilState(todoItemState);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const filterTodos = filterTodoList(
    input,
    statusSelect,
    prioritySelect,
    todoList
  );

  const router = useRouter();
  const handleSelectTodo = (
    id: number,
    title: string,
    detail: string,
    status: 0 | 1 | 2,
    priority: string,
    createAt: string,
    updateAt: string,
    path: string
  ) => {
    setTodoItem({
      id,
      title,
      detail,
      createAt,
      updateAt,
    });
    router.push(path);
  };
  
  console.log(todoList)
  //削除処理、TRASHページへ遷移
  const deleteItem = (id: number) => {
    //topから削除処理
    const deletetodo = todoList.filter(
      (todo: { id: number }) => todo.id !== id
    );

    settodoList(deletetodo);
  };

  const resetButtonClick = () => {
    setInput("");
    setcreatetimeinput("");
  };

  const pagesQuantity = 5;
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  const normalStyles: ButtonProps = {
    w: "40px",
    fontSize: "sm",
    _hover: {
      bg: "green.300",
    },
  };

  const activeStyles: ButtonProps = {
    w: "40px",
    fontSize: "sm",
    _hover: {
      bg: "green.300",
    },
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: "green.200",
  };
 


  return (
    <>
    <Header />
      <Container mt={`16px`}>
      <Flex w="100%">
        <Text
          fontSize="28px"
          fontWeight="bold"
          lineHeight="33px"
          color="blackAlpha.800"
          mb={`15px`}
        >
          TODO LIST
          </Text>
          <Spacer/>
          <Button
            w="140px"
            h="40px"
            mt="8px"
            fontSize="18px"
            fontWeight="bold"
            bg="#68D391"
            borderRadius="50px"
            onClick={() => router.push("TopTaijuu")}
            >体重管理ページ
          </Button>
          <Button
            w="140px"
            h="40px"
            mt="8px"
            fontSize="18px"
            fontWeight="bold"
            bg="#68D391"
            borderRadius="50px"
            onClick={() => router.push("Top")}
            >日記ページ
          </Button>
        </Flex>
        <Center>
          <VStack>
            <Flex w={`1080px`} mb={`33px`}>
              <Stack>
                <Flex w={`624px`}>
                  <Text fontSize={`18px`} fontWeight={`bold`} w={`180px`}>
                    SEARCH
                  </Text>
                  <Text fontSize={`18px`} fontWeight={`bold`} w={`180px`}>
                    日付
                  </Text>
                </Flex>
                <Flex>
                  <HStack spacing={4}>
                    <InputGroup>
                      <InputRightElement pointerEvents="none">
                      
                      </InputRightElement>
                      <Input
                        value={input}
                        type={`text`}
                        onChange={(e) => setInput(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputRightElement pointerEvents="none">
                      
                      </InputRightElement>
                      <Input
                        value={createtimeinput}
                        type={`text`}
                        onChange={(e) => setcreatetimeinput(e.target.value)}
                      />
                    </InputGroup>
               
                  </HStack>
                  <Button
                    color={`blackAlpha.800`}
                    variant={`outline`}
                    bgColor={`blackAlpha.500`}
                    w={`104px`}
                    h={`40px`}
                    borderRadius={`3xl`}
                    borderColor={`black.800`}
                    fontSize={`18px`}
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    ml={`24px`}
                    onClick={resetButtonClick}
                  >
                    RESET
                  </Button>
                </Flex>
              </Stack>
            <Stack spacing={`16px`} direction="row" align="center">
              <IconButton
                bgColor="yellow.300"
                aria-label="Delete"
                icon={<DeleteIcon />}
                borderRadius={`full`}
                variant={`outline`}
                borderColor={`gray.400`}
                h={`40px`}
                w={`40px`}
                //onClick={() => router.push("/trash")}
              />
              <IconButton
                aria-label="Edit"
                bgColor="pink.100"
                h={`40px`}
                w={`40px`}
                borderRadius={`full`}
                variant={`outline`}
                borderColor={`gray.400`}
                icon={<EditIcon />}
                onClick={() => router.push("/TodoEdit")}
              />
              <IconButton
                aria-label="New"
                bgColor="green.300"
                h={`40px`}
                w={`40px`}
                borderRadius={`full`}
                variant={`outline`}
                borderColor={`gray.400`}
                icon={<ExternalLinkIcon />}
               onClick={() => router.push("/CreateTodo")}
              />
            </Stack>
          </Flex>
       
        <TableContainer w={`1080px`}>
          <Table variant="simple" mb={`16px`} >
              <Thead bgColor={`#68D391`}>
                <Tr >
                  <Th
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha.800`}
                    py={`19px`}
                  >
                    Task
                  </Th>
                  <Th
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha.800`}
                    py={`19px`}
                  >
                    Status
                  </Th>
                  <Th
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha.800`}
                    py={`19px`}
                  >
                    Priority
                  </Th>
                  <Th
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha.800`}
                    py={`19px`}
                  >
                    Create
                  </Th>
                  <Th
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha.800`}
                    py={`19px`}
                  >
                    Update
                  </Th>
                <Th
                  fontFamily={`roboto`}
                  fontWeight={`bold`}
                  fontSize={`24px`}
                  color={`blackAlpha.800`}
                  py={`19px`}
                >
                  Action
                </Th>
                </Tr>
              </Thead>
        
              {isClient && (
                 <Tbody>
                 {filterTodos.map((todo) => {
                   return (
                     <Tr key={todo.id}>
                       <Td
                         fontWeight={`bold`}
                         w={`384px`}
                         _hover={{
                           cursor: "pointer",
                         }}
                         onClick={() =>
                           handleSelectTodo(
                             todo.id,
                             todo.title,
                             todo.detail,
                             todo.status,
                             todo.priority,
                             todo.createAt,
                             todo.updateAt,
                             "/show"
                           )
                         }
                       >
                         {todo.title}
                       </Td>
                       <Td
                         w={`139.2px`}
                         p={`0`}
                         textAlign={`center`}
                         lineHeight={`56px`}
                       >
                         <StatusButton
                           todoId={todo.id}
                           defaultValue={todo.status}
                         />
                       </Td>
                       <Td w={`139.2px`} p={`0`} lineHeight={`56px`}>
                         <PrioritySelect
                           todoId={todo.id}
                           defaultValue={todo.priority}
                         />
                       </Td>
                       <Td w={`139.2px`}>{todo.createAt}</Td>
                       <Td w={`139.2px`}>{todo.updateAt}</Td>
                       <Td w={`139.2px`}>
                         <HStack w={`56px`} mx={`auto`}>
                           <EditIcon
                             h={`24px`}
                             w={`24px`}
                             _hover={{
                               cursor: "pointer",
                             }}
                             onClick={() =>
                               handleSelectTodo(
                                 todo.id,
                                 todo.title,
                                 todo.detail,
                                 todo.status,
                                 todo.priority,
                                 todo.createAt,
                                 todo.updateAt,
                                 "/TodoEdit"
                               )
                             }
                           />
                           <DeleteIcon
                             h={`24px`}
                             w={`24px`}
                             _hover={{
                               cursor: "pointer",
                             }}
                             onClick={() => deleteItem(todo.id)}
                           />
                         </HStack>
                       </Td>
                     </Tr>
                   );
                 })}
               </Tbody>
              )}
              </Table>
            </TableContainer>
            <Paginator
              pagesQuantity={pagesQuantity}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              activeStyles={activeStyles}
              normalStyles={normalStyles}
              separatorStyles={separatorStyles}
            >
              <Flex
                alignItems={`center`}
                justifyContent={`space-between`}
                w={`352px`}
                p={`12px`}
              >
                <Previous>
                  <ChevronLeftIcon />
                </Previous>
                <PageGroup isInline align={`center`} />
                <Next>
                  <ChevronRightIcon />
                </Next>
              </Flex>
            </Paginator>
          </VStack>
        </Center>
      </Container>
    </>
  )
}
