import { useEffect, useState, useMemo } from "react";
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
import { nikkiListState, nikkiItemState, taijuuListState, taijuuItemState } from "../src/atoms/states";
import { filterNikkiList } from "../util/filterNikkiLit";
import { filterTaijuuList } from "../util/fileterTaijuuList";
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
//
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Paginator,
  Previous,
  Next,
  PageGroup,
  usePaginator,
} from "chakra-paginator";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TopTaijuu() {
  const [createtimeinput, setcreatetimeinput] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [input, setInput] = useState("");
  const [taijuuList, setTaijuuList] = useRecoilState(taijuuListState);
  const setTaijuuItem = useSetRecoilState(taijuuItemState);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const filterTaijuus = filterTaijuuList(
    input,
    taijuuList,
    createtimeinput,
  );

  const router = useRouter();
  const handleSelectTaijuu = (
    id: number,
    taijuu: string,
    createAt: string,
    updateAt: string,
    path: string
  ) => {
    setTaijuuItem({
      id,
      taijuu,
      createAt,
      updateAt,
    });
    router.push(path);
  };
  
  //console.log(nikkiList)
  //削除処理、TRASHページへ遷移
  const deleteItem = (id: number) => {
    //topから削除処理
    const deleteTaijuu = taijuuList.filter(
      (taijuu: { id: number }) => taijuu.id !== id
    );

    setTaijuuList(deleteTaijuu);
  };

  const resetButtonClick = () => {
    setInput("");
    setcreatetimeinput("");
  };

  //
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "グラフタイトル",
      },
    },
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

  //ページネーション機能
  const pagination = useMemo(() => {
    const startNumber = 0 + 7 * (currentPage - 1);

    const endNumber = 7 + 8 * (currentPage - 1);

    return filterTaijuus.slice(startNumber, endNumber);
  }, [currentPage, filterTaijuus]);

  const labels = pagination.map(taijuu => taijuu.createAt);

  const data = {
    labels,
    datasets: [
      {
        label: "データ1",
        data: pagination.map(taijuu => taijuu.taijuu) ,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };


  console.log(taijuuList)
  console.log(filterTaijuus)


  
  return (
    <>
    <Header />
    <Flex w="100%">
        <Spacer/>
        <Button
          w="112px"
          h="40px"
          mt="8px"
          fontSize="18px"
          fontWeight="bold"
          bg="#68D391"
          borderRadius="50px"
          onClick={() => router.push("/Top")}
          >Topページへ
        </Button>
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
    <Line options={options} data={data} />
      <Container mt={`16px`}>
     
        <Center>
          <VStack>
            <Flex w={`1080px`} mb={`33px`}>
              <Stack>
                <Text
                  fontSize="28px"
                  fontWeight="bold"
                  lineHeight="33px"
                  color="blackAlpha.800"
                  mb={`15px`}
                >
                  体重 LIST
                </Text>
                <Flex w={`624px`}>
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
            <Spacer />
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
                onClick={() => router.push("/TaijuuEdit")}
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
               onClick={() => router.push("/Taijuu")}
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
                    体重
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
                  <Th></Th>
                  <Th
                    fontFamily={`roboto`}
                    fontWeight={`bold`}
                    fontSize={`24px`}
                    color={`blackAlpha`}
                    py={`19px`}
                  >
                    ACTION
                  </Th>
                </Tr>
              </Thead>
        
              {isClient && (
                <Tbody>
                  {pagination.map((taijuu)=>{
                    return(
                      <Tr key={taijuu.id}>
                        <Td
                          fontWeight={`bold`}
                          w={`150px`}
                          textAlign="center"
                          _hover={{
                            cursor:"pointer"
                          }}>
                            {taijuu.taijuu}
                          </Td>
                          <Td
                            w={`139.2px`}
                            p={`0`}
                            textAlign={`center`}
                            lineHeight={`56px`}
                          >
                            {taijuu.createAt}
                          </Td>
                          <Td w={`139.2px`}>{taijuu.updateAt}</Td>
                          <Td w={`139.2px`}></Td>
                          <Td w={`139.2px`}>
                            <HStack w={`56px`} mx={`auto`}>
                              <EditIcon
                                h={`24px`}
                                w={`24px`}
                                _hover={{
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handleSelectTaijuu(
                                    taijuu.id,
                                    taijuu.taijuu,
                                    taijuu.createAt,
                                    taijuu.updateAt,
                                    "/TaijuuEdit"
                                  )
                                }                            
                              />
                              <DeleteIcon
                                h={`24px`}
                                w={`24px`}
                                _hover={{
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteItem(taijuu.id)}
                              />
                            </HStack>
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
    </>
  )
}
