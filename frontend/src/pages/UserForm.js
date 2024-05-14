import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Stack,
    Button,
    ModalBody,
    ModalCloseButton,
    Box, 
    Text,
    Heading,
    Flex,
    Icon
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import { FaGoogle } from "react-icons/fa";

import { useState, useEffect } from 'react';
import { Form, Link } from 'react-router-dom';

import EmailSignUpForm from '../components/Form/EmailSignUpForm.jsx';
import LoginForm from '../components/Form/LoginForm.jsx';
import { useLogin } from '../hooks/authHooks.jsx';
import { useCreateUser } from '../hooks/userHooks.jsx';
import { MdErrorOutline } from 'react-icons/md';

const USER_DATA = {
    email: {
        value: "",
        isValid: null,
    },
    username: {
        value: "",
        isValid: null,
    },
    password: {
        value: "",
        isValid: null,
    },
    confirmation: {
        value: "",
        isValid: null,
    },
} 

export default function UserFormLayout({handleSignIn, isOpen, onClose, method}) {
    const [generalEmail, setGeneralEmail] = useState(false); 
    const [isSignUp, setIsSignUp] = useState(handleSignIn);

    const [userData, setUserData] = useState(USER_DATA);

    const { mutate: login, data: loginData, error: loginError } = useLogin();
    const { mutate: createUser, data: signupData, error: signupError } = useCreateUser();

    function handleGeneralEmailClick() {
        setGeneralEmail((wasGeneralEmail) => !wasGeneralEmail);
    }

    function handleSignInClick() {
        setIsSignUp((wasSignUp) => !wasSignUp);
    }

    function handleClose() {
        setGeneralEmail(false);
        setUserData(USER_DATA);
    }

    useEffect(() => {
        setIsSignUp(handleSignIn);
    }, [handleSignIn]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSignUp) {
            const fieldsToCheck = ['email', 'username', 'password', 'confirmation']; 
            const allFieldsValid = fieldsToCheck.every(
                field => USER_DATA[field].isValid === true 
            );
            const email = userData.email.value; 
            const username = userData.username.value;
            const password = userData.password.value;
    
            createUser({email, username, password, allFieldsValid});
        } else { 
            const email = userData.email.value;
            const password = userData.password.value;
            login({email, password}); 
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay bg={"green.100"} />
            <ModalContent w={600} h={"fit-content"} p={6} pb={8}>
                <ModalCloseButton onClick={handleClose} />
                <ModalHeader>
                    <Stack direction={"column"} spacing={4}>
                        <Flex>
                            <Text fontSize={"3xl"} mr={2}>
                               {isSignUp ? "Welcome to": "Login to"}
                            </Text>
                            <Heading
                                fontFamily={'heading'}
                                color={"logo.100"}>
                                STACKED
                            </Heading>
                        </Flex>
                        <Button>
                            { isSignUp ? "Sign Up " : "Log In " }
                            with Google 
                            <Icon as={FaGoogle} ml={2} />
                        </Button>
                        <Button 
                            onClick={handleGeneralEmailClick}
                            colorScheme={generalEmail ? "green" : "gray"}>
                            { isSignUp ? "Sign Up " : "Log In " }
                            with Email
                            <EmailIcon ml={2} />
                        </Button>
                        {
                            isSignUp ? 
                            <Text fontSize={"md"}>
                                Already have an account?
                                <Button 
                                    variant={"link"} 
                                    ml={2} 
                                    color={"logo.100"}
                                    onClick={handleSignInClick}>
                                    Log In
                                </Button>
                            </Text> : 
                            <Text fontSize={"md"}>
                                Don't have an account?
                                <Button 
                                    variant={"link"} 
                                    ml={2} 
                                    color={"logo.100"}
                                    onClick={handleSignInClick}>
                                    Sign Up
                                </Button>
                            </Text>
                        }
                    </Stack>
                </ModalHeader>
                {
                    generalEmail && 
                    <ModalBody>
                        <Form onSubmit={handleSubmit} noValidate>
                            <input type="hidden" name="formType" value={isSignUp ? "signup" : "login"} />
                            {isSignUp ? 
                                <>
                                    <EmailSignUpForm setUserData={setUserData} userData={userData} /> 
                                    {signupError.isError && (
                                        <Box
                                            borderWidth={2}
                                            borderRadius={4}s
                                            borderColor={"red.300"}
                                            textColor={"red.400"}
                                            padding={2.5}
                                            mb={3}>
                                            {signupError.message}
                                        </Box>
                                    )}
                                </>
                                : 
                                <>
                                    <LoginForm setUserData={setUserData} />
                                    {loginError.isError && (
                                        <Box
                                            borderWidth={2}
                                            borderRadius={4}s
                                            borderColor={"red.300"}
                                            textColor={"red.400"}
                                            padding={2.5}
                                            mb={3}>
                                            {loginError.message}
                                        </Box>
                                    )}
                                </>
                            }
                            <Button w={"100%"} type='submit'>{ isSignUp ? "Sign Up" : "Log In"}</Button>
                        </Form>
                    </ModalBody>
                }
            </ModalContent>
        </Modal>
    );
}