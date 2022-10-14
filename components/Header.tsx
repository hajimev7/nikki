import { Flex, Heading } from '@chakra-ui/react'
import React from 'react'

export const Header = () => {
    
    return (
      <Flex h="80px" bgColor="#68D391" alignItems="center">
        <Heading 
          color="RGBA(0, 0, 0, 0.80)" ml="99px" 
          fontSize="48px" fontWeight="bold"
          _hover={{
          cursor: "pointer"
          }}
        >
            日記
        </Heading>
      </Flex>
    )
}
