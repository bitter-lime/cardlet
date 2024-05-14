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

function validate_email(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    email = String(email).toLowerCase();

    if (email.length <= 0) {
        return true; 
    }
    return re.test(email);
}

function validate_username(username) {
    if (username.length < 3 && username.length > 0) return false; 
    else { return true; }
}

function validate_password(password) {
    if (password.length <= 8 && password.length > 0) return false; 
    else { return true; }
}

function check_passwords(password, confirmation) {
    if (password == confirmation) return true; 
    else { return false; }
}

export default function EmailSignUpForm({setUserData, userData}) {
    function handleBlur(event, name) {
        const value = event.target.value; 
        let result;

        console.log(value);

        if (name == "email") {
            result = validate_email(value);
        }

        if (name == "username") {
            result = validate_username(value);
        }

        if (name == "password") {
            result = validate_password(value);
        }

        if (name == "confirmation") {
            result = check_passwords(userData.password.value, userData.confirmation.value)
        }

        setUserData(prevData => {
            return {
                ...prevData,
                [name]: {
                    ...prevData[name],
                    isValid: result
                }
            };
        });
    }

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
        <Stack direction={"column"} spacing={6}>
            <FormControl>
                <FormLabel mb={FORM_LABEL_MARGIN} textColor={userData.email.isValid == false ? "red.600" : "black"}>{userData.email.isValid == false ? "Invalid email address" : "Email"}</FormLabel>
                <Input 
                    placeholder='user@email.com'
                    id="email"
                    type="email"
                    pr='4.5rem'
                    required 
                    mb={3}
                    borderColor={userData.email.isValid == false ? "red.600" : "gray.200"}
                    _hover={{
                        borderColor: userData.email.isValid == false ? "red.700" : "gray.300"
                    }}
                    onBlur={(event) => handleBlur(event, "email")}
                    onChange={(event) => handleChange(event, "email")}
                />

                <FormLabel mb={FORM_LABEL_MARGIN} textColor={userData.username.isValid == false ? "red.600" : "black"}>{userData.username.isValid == false ? "Username is too short. The minimum length is 3 characters." : "Username"}</FormLabel>
                <Input 
                    placeholder='user123'
                    id="username"
                    type="text"
                    pr='4.5rem'
                    required 
                    mb={3}
                    backgroundColor={"white"}
                    borderColor={userData.username.isValid == false ? "red.600" : "gray.200"}
                    _hover={{
                        borderColor: userData.username.isValid == false ? "red.700" : "gray.300"
                    }}
                    onBlur={(event) => handleBlur(event, "username")}
                    onChange={(event) => handleChange(event, "username")}
                />

                <FormLabel mb={FORM_LABEL_MARGIN} textColor={userData.password.isValid == false ? "red.600" : "black"}>{userData.password.isValid == false ? "Password is too short. The minimum length is 8 characters." : "Password"}</FormLabel>
                <PasswordInput 
                    id="password"
                    borderColor={userData.password.isValid == false ? "red.600" : "gray.200"}
                    _hover={{
                        borderColor: userData.password.isValid == false ? "red.700" : "gray.300"
                    }}
                    onBlur={(event) => handleBlur(event, "password")}
                    onChange={(event) => handleChange(event, "password")} />

                <FormLabel mb={FORM_LABEL_MARGIN}>Confirm Password</FormLabel>
                <PasswordInput 
                    id="confirmation"
                    onBlur={(event) => handleBlur(event, "confirmation")}
                    onChange={(event) => handleChange(event, "confirmation")} />
            </FormControl>
        </Stack>
    );
}