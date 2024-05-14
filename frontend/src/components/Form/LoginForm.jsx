import { 
    ModalFooter, 
    ModalCloseButton, 
    Stack, 
    ModalBody, 
    FormControl, 
    FormLabel, 
    Input, 
    Button 
} from "@chakra-ui/react";

import PasswordInput from "../PasswordInput.jsx";

const FORM_LABEL_MARGIN = 0.25

export default function LoginForm({setUserData}) {
    function handleChange(event, name) {
        const value = event.target.value;
        setUserData(prevData => {
            return {
                ...prevData,
                [name]: {
                    ...prevData[name],
                    value: value
                }
            };
        });
    }

    return (
        <Stack direction={"column"} spacing={5}>
            <FormControl>
                <FormLabel mb={FORM_LABEL_MARGIN}>Email</FormLabel>
                <Input 
                    placeholder='Enter your email address or username'
                    id="email"
                    type="text"
                    pr='4.5rem'
                    required 
                    mb={3}
                    onChange={(event) => handleChange(event, "email")}
                />

                <FormLabel mb={FORM_LABEL_MARGIN}>Password</FormLabel>
                <PasswordInput 
                    placeholder="Enter your password" 
                    id="password" 
                    onChange={(event) => handleChange(event, "password")} />
            </FormControl>
        </Stack>
    );
}