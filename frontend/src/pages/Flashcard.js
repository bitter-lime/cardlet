import { VStack, Flex, Button, Icon, Heading, HStack, Text } from "@chakra-ui/react";
import { Progress } from '@chakra-ui/react';

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IoMdExpand } from "react-icons/io";

import { useState } from "react";
import ReactCardFlip from "react-card-flip";

import { EXAMPLE_DATA } from "../data.js";
import Flashcard from "../components/Flashcard.jsx";
import api from "../api.js";

export default function FlashcardLayout() {
    const FLASHCARDS_DATA = EXAMPLE_DATA[0];
    const DATA = FLASHCARDS_DATA.data
    const DATA_SIZE = DATA.length -1; 
  
    const [index, setIndex] = useState(0);
    const [flip, setFlip] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
  
    function handleIndexUpdate(location, dataSize) {
      if (location === "right" && index < dataSize) {
        setIndex(index + 1);
      } else if (location === "left" && index > 0) {
        setIndex(index - 1);
      } 
      
      setFlip(false);
    }
  
    function handleCardClick() {
        setFlip((wasFlip) => !wasFlip); 
    }

    function handleStarClick() {
        setIsStarred((wasStarred) => (!wasStarred))
    }

    // try aspect ratio for the flashcard itself and any thing else that has a manual size 
    return (
        <Flex justifyContent={"center"} bgColor={"background.bg"} minH="100vh">
            <VStack p={4} display={{ md: "flex" }} boxSize={"fit-content"}>
                <Flex boxSize={"100%"}>
                    <Heading my={4}>
                        {FLASHCARDS_DATA.name}
                    </Heading>
                </Flex>
                <Flex boxSize={"100%"} justifyContent={"center"} mb={4}>
                    <HStack spacing={10}>
                        {studyTools.map((name, index) => (
                            <Button key={index} width={{ md: 145.5 }} bgColor={"background.btn"}>{name}</Button>
                        ))}
                        <Button width={"fit-content"}>
                            <Icon as={IoMdExpand} boxSize={6}/>
                        </Button>
                    </HStack>
                </Flex>
                <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                    <Flashcard 
                        content={DATA[index].question}
                        onClick={handleCardClick} 
                        onStarClick={handleStarClick}
                        isStarred={isStarred}
                        label={"Question"}
                        />
                    <Flashcard 
                        content={DATA[index].answer}
                        onClick={handleCardClick} 
                        onStarClick={handleStarClick}
                        isStarred={isStarred}
                        label={"Answer"}
                        />
                </ReactCardFlip>
                
                <Flex boxSize={"100%"}>
                    <Progress
                        sx={{ flex: "1" }}
                        borderRadius={"md"}
                        height='8px'
                        bgColor='yellow.200'
                        value={(index / DATA_SIZE) * 100}
                        colorScheme='yellow'
                    />
                </Flex>
                <Flex justifyContent={"center"}>
                    <HStack mt={{base: 2, md:2}}>
                        <Button borderRadius={"md"} onClick={() => handleIndexUpdate("left", DATA_SIZE)}>
                            <Icon as={ChevronLeftIcon} boxSize={6} />
                        </Button>
                        <Text mx={2} fontStyle={""}>
                            {index+1} / {DATA_SIZE+1}
                        </Text>
                        <Button borderRadius={"md"} onClick={() => handleIndexUpdate("right", DATA_SIZE)}>
                            <Icon as={ChevronRightIcon} boxSize={6} />
                        </Button>
                    </HStack>
                </Flex>
            </VStack>
        </Flex>
    );
}

const studyTools = [
    "Learn",
    "Test",
    "Quiz",
    "Speed Run"
]