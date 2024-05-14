import { Card, CardBody, Heading, Box, Flex, VStack, Container, IconButton, Button, HStack, Text, Spacer } from "@chakra-ui/react";

import { StarIcon } from "@chakra-ui/icons";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { color } from "framer-motion";

import { useState } from "react";


export default function FlashCard({content, onClick, onStarClick, isStarred, label}) {

    return (
        <Box flexShrink={0}>
            <Card
                borderRadius={"md"}
                width={{ md: 800 }}
                height={{ md: 500, sm: 400 }}
                textAlign={"center"}
            >
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top={7}
                    right={5}
                    left={5}
                    >
                    <Text>
                        {label}
                    </Text>
                </Flex>
                <Flex justifyContent="flex-end" alignItems="center" pos={"fixed"} top={5} right={5} width={"100%"}>                    
                    <HStack spacing={2}>
                        <IconButton 
                            icon={<MdOutlineModeEditOutline size={18} />}
                            isRound
                            bgColor={"white"}
                            _hover={{bgColor: "gray.200"}}
                            />
                        <IconButton 
                            icon={<StarIcon />}
                            isRound 
                            p={5} 
                            boxSize={4} 
                            bgColor={"white"}
                            _hover={{bgColor: isStarred ? "yellow.200" : "gray.200" }}
                            color={isStarred ? "yellow.400" : "gray.400"}
                            onClick={onStarClick} />
                    </HStack>
                </Flex>
                <CardBody onClick={onClick}>
                    <Container boxSize={"100%"} alignContent={"center"}>
                        <Heading textAlign="center">
                            {content}
                        </Heading>
                    </Container>
                </CardBody>
            </Card>
        </Box>
    );
}