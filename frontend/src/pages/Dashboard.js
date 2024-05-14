import { Flex, VStack, Heading, HStack, Container, Avatar, Box } from "@chakra-ui/react";

import { useState } from "react";

import { EXAMPLE_DATA } from "../data.js";
import Thumbnail from "../components/Thumbnail";

export default function DashboardLayout() {

    return (
        <Flex 
            bgColor={"background.bg"} 
            minH="100vh" 
            width={"100%"} 
            justifyContent={"flex-start"} 
            alignContent={"flex-start"}
            py={8}
            px={10}
            overflow="hidden"
            direction={"column"}
            >
            <Box mb={2}>
                <Heading width={"max-content"} textAlign={"left"}>
                Recent
                </Heading>
            </Box>
            <VStack 
                align="flex-start" 
                spacing={4} 
                maxW="100%" 
                overflowX="auto"
                _hover={{
                    '&::-webkit-scrollbar': {
                        borderRadius: '8px',
                        backgroundColor: 'gray.200',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '8px',
                        backgroundColor: 'gray.300',
                    },
                  }}
                >
                <HStack spacing={3} overflowX="scroll">
                    {EXAMPLE_DATA.map((item) => (
                    <Thumbnail key={item.id} setName={item.name} numberOfTerms={item.data.length} name={item.owner} />
                    ))}
                </HStack>
            </VStack>
        </Flex>
    );
}