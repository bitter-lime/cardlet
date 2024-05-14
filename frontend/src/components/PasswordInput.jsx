import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";

import { useState } from "react";

export default function PasswordInput({...props}) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow((wasShow) => (!wasShow))

    return (
        <InputGroup size='md' mb={3}>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Password'
                {...props}
                required
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}