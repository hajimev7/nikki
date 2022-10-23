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
import { taijuuListState } from "../src/atoms/states";
import taijuu, {} from "../pages/taijuu"
import {filterTaijuuList} from "../util/fileterTaijuuList"
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Graph = () => {
  const [input, setInput] = useState("");
  const [TaijuuList, setTaijuuList] = useRecoilState(taijuuListState);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const handleSelectTaijuu = (
    id: number,
    createAt: string,
    path: string
  ) =>{
    router.push(path);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filterTaijuus = filterTaijuuList(
    input,
    TaijuuList,
  );
  const options = {
    responsive: true,
    Plugin: {
      title: {
        display:true,
        text:"グラフタイトル",
      }
    }
  }

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ]

  const data = {
    labels,
    datasets: [
      {
        label: "データ1",
        data: [10, 40, 30, 40, 50, 80, 120],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ]
  }
  {isClient && (
    <Tbody>
      {filterTaijuus.map((taijuu) => {
        return(
          <Tr key={taijuu.id}>
            <Td
            fontWeight={`bold`}
            w={`384px`}
            _hover={{
              cursor: "pointer",
            }}
            onClick={() =>
              handleSelectTaijuu(
                taijuu.id,
                taijuu.createAt,
                "/show"
              )
            }
          >
            {taijuu.taijuu}
            </Td>
        </Tr>
        )
      })}
    </Tbody>
  )}
   
}


export default Graph;