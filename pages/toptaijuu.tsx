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
import taijuu from "./taijuu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function toptaijuu() {
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

  const labels = filterTaijuus.map((taijuu) => {taijuu.createAt});

  const data = {
    labels,
    datasets: [
      {
        label: "データ1",
        data: filterTaijuus.map((taijuu) => {taijuu.taijuu}) ,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  console.log(taijuu)
  console.log(filterTaijuus)



  return (
    <>
    <Header />
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
                  日記 LIST
                </Text>
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
               onClick={() => router.push("/create")}
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
                  {filterTaijuus.map((taijuu)=>{
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
                                //onClick={() =>
                                  //handleSelectTaijuu(
                                    //taijuu.id,
                                    //taijuu.createAt,
                                    //taijuu.updateAt,
                                    //"/Edit"
                                  //)
                                //}                            
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
          </VStack>
        </Center>
      </Container>
    </>
  )
}
