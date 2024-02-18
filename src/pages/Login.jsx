import { IconButton, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import Logo from './../assets/images/Logo.jpg';
import { useState } from "react";
import theme from "../config/ThemeConfig.jsx";
import { Link } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="flex w-screen h-screen">
            <div className="bg-[#393970] w-1/2 flex items-center justify-center">
                <img src={Logo} alt="Logo" className="w-1/2"/>
            </div>
            <div className="bg-[#E1E4EB] w-1/2 flex flex-col items-center justify-center">
                <p className="font-sans text-3xl text-[#393970] mb-10">Login</p>
                <form className="w-1/2">
                    <Stack spacing={3}>
                        <p>Username</p>
                        <Input
                            variant='filled'
                            placeholder='Username'
                        />
                        <p>Password</p>
                        <InputGroup size='md'>
                            <Input
                                variant='filled'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                            />
                            <InputRightElement width='4.5rem'>
                                <IconButton
                                    h="1.75rem"
                                    size="sm"
                                    variant='ghost'
                                    onClick={handleShowPassword}
                                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                 aria-label="password-icon"/>
                            </InputRightElement>
                        </InputGroup>
                        <div className="flex justify-end">
                            <Link to="/path">
                                <Button variant="link" className="mb-10" >Reset Password</Button>
                            </Link>
                        </div>
                        <Button
                            bg={theme.purple}
                            _hover={{ bg: theme.onHoverPurple }}
                            color="#ffffff"
                            variant="solid">
                            Login
                        </Button>
                    </Stack>
                </form>
            </div>
        </div>
    );
}
