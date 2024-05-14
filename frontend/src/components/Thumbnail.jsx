import { Box, Card, CardBody, HStack, Text, VStack, Image } from "@chakra-ui/react";

export default function Thumbnail({setName, numberOfTerms, name}) {
    return (
        <Card width={345} height={200} m={1} className={"thumbnail"} p={0} m={0} my={2}>
            <CardBody>
                <VStack spacing={2} justifyContent={"space-between"} alignItems={"flex-start"} height="100%">
                    <VStack spacing={2} alignItems={"flex-start"}>
                        <Text fontSize={"lg"} fontWeight={"bold"}>{setName}</Text>
                        <Box bgColor={"gray.200"} p={1} borderRadius={"md"}>
                            <Text fontSize={"sm"} fontWeight={"medium"}>{numberOfTerms} terms</Text>
                        </Box>
                    </VStack>
                    <HStack spacing={2}>
                        <Image
                            borderRadius='full'
                            boxSize='12'
                            src='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                            />
                        <Text ml={2} fontWeight={"semibold"} color={"green"}>
                            {name}
                        </Text>
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
}