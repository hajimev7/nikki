import { useEffect, useState ,useMemo } from "react";
import { Header } from '../components/Header'
import {
  Center,
  Container,
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
  Flex,
} from "@chakra-ui/react";
import { nikkiListState, nikkiItemState } from "../src/atoms/states";
import { filterNikkiList } from "../util/filterNikkiLit";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useRouter } from 'next/router'
import {
  Paginator,
  Previous,
  Next,
  PageGroup,
  usePaginator,
} from "chakra-paginator";
import { Layout } from "../components/Layout";

export default function Top() {
  const [createtimeinput, setcreatetimeinput] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [input, setInput] = useState("");
  const [nikkiList, setNikkiList] = useRecoilState(nikkiListState);
  const setNikkiItem = useSetRecoilState(nikkiItemState);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const filterNikkis = filterNikkiList(
    input,
    nikkiList,
    createtimeinput,
  );

  const router = useRouter();
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

  //ページネーション機能
  const pagination = useMemo(() => {
    const startNumber = 0 + 6 * (currentPage - 1);

    const endNumber = 5 + 6 * (currentPage - 1);

    return filterNikkis.slice(startNumber, endNumber);
  }, [currentPage, filterNikkis]);
  


  const handleSelectNikki = (
    id: number,
    title: string,
    detail: string,
    createAt: string,
    updateAt: string,
    sleeptimemokuhyou : string,
    sleeptimejisseki : string,
    path: string
  ) => {
    setNikkiItem({
      id,
      title,
      detail,
      createAt,
      updateAt,
      sleeptimemokuhyou,
      sleeptimejisseki,
    });
    router.push(path);
  };
  
  console.log(nikkiList)
  //削除処理、TRASHページへ遷移
  const deleteItem = (id: number) => {
    //topから削除処理
    const deleteNikki = nikkiList.filter(
      (nikki: { id: number }) => nikki.id !== id
    );

    setNikkiList(deleteNikki);
  };

  const resetButtonClick = () => {
    setInput("");
    setcreatetimeinput("");
  };

  return (
    <Layout title="TOP">
      <Container mt={`16px`}>
      <Flex w="100%">
        <Text
          fontSize="28px"
          fontWeight="bold"
          lineHeight="33px"
          color="blackAlpha.800"
          mb={`15px`}
        >
          日記 LIST
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
            onClick={() => router.push("TopTodo")}
            >TODOページ
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
                onClick={() => router.push("/Edit")}
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
               onClick={() => router.push("/Create")}
              />
            </Stack>
          </Flex>
       
        <TableContainer w={`1080px`}>
          <Table variant="simple" mb={`16px`} >
              <Thead bgColor={`#68D391`}>
                <Tr >
                  <Th
                    textAlign={`center`}
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha`}
                    py={`19px`}                 
                  >
                    Title
                  </Th>
                  <Th
                    textAlign={`center`}
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha`}
                    py={`19px`}
                  >
                    Create
                  </Th>
                  <Th
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha`}
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
                  睡眠時間(目標)
                </Th>
                <Th
                  fontFamily={`roboto`}
                  fontWeight={`bold`}
                  fontSize={`24px`}
                  color={`blackAlpha.800`}
                  py={`19px`}
                >
                 睡眠時間(実績)
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
                  {pagination.map((nikki:any)=>{
                    return(
                      <Tr key={nikki.id}>
                        <Td
                          fontWeight={`bold`}
                          w={`150px`}
                          textAlign="center"
                          _hover={{
                            cursor:"pointer"
                          }}>
                            {nikki.title}
                          </Td>
                          <Td
                            w={`139.2px`}
                            p={`0`}
                            textAlign={`center`}
                            lineHeight={`56px`}
                          >
                            {nikki.createAt}
                          </Td>
                          <Td
                            w={`139.2px`}
                            p={`0`}
                            textAlign={`center`}
                            lineHeight={`56px`}
                          >
                            {nikki.updateAt}
                          </Td>
                          <Td
                            w={`139.2px`}
                            p={`0`}
                            textAlign={`center`}
                            lineHeight={`56px`}
                          >
                            {nikki.sleeptimemokuhyou}
                          </Td>
                          <Td
                            w={`139.2px`}
                            p={`0`}
                            textAlign={`center`}
                            lineHeight={`56px`}
                          >
                            {nikki.sleeptimejisseki}
                          </Td>

                          <Td w={`139.2px`}>
                          <Flex w="100%"　ml="auto">
                            <HStack w={`56px`} mx={`auto`}>
                              <EditIcon
                                h={`24px`}
                                w={`24px`}
                                _hover={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleSelectNikki(
                                    nikki.id,
                                    nikki.title,
                                    nikki.detail,
                                    nikki.createAt,
                                    nikki.updateAt,
                                    nikki.sleeptimemokuhyou,
                                    nikki.sleeptimejisseki,
                                    "/Edit"
                                  )
                                }                            
                              />
                              <DeleteIcon
                                h={`24px`}
                                w={`24px`}
                                _hover={{
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteItem(nikki.id)}
                              />
                            </HStack>
                            </Flex>
                          </Td>
                      </Tr>
                    )
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
    </Layout>
  )
}

