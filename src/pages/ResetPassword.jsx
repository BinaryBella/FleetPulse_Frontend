import {Button, IconButton, Input, InputGroup, InputRightElement, Stack} from '@chakra-ui/react';
import Logo from "../assets/images/Logo.jpg";
import ResetPass2 from "../assets/images/ResetPass2.png";
import theme from "../config/ThemeConfig.jsx";
import { Box } from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useState} from "react";

export default function ResetPassword(){
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return(
        <div className="flex w-screen h-screen">
            <div className="bg-[#393970] w-1/2 flex items-center justify-center">
                <img src={Logo} alt="Logo" className="w-1/2"/>
            </div>
            <div className="bg-[#E1E4EB] w-1/2 flex flex-col items-center justify-center">
                <p className="font-sans text-3xl text-[#393970] mb-7">Reset Password</p>
                <img src={ ResetPass2 } alt="ResetPassword" className="w-1/4 mb-4"/>
                <Box Box textAlign="center" w="50%" fontSize="sm">
                    <p className="text-2xl text-[#D49458] font-bold mb-4">Create new password</p>
                    <p className="mb-4">Your New password must be different from previous used password</p>
                </Box>
                <form className="w-1/2">
                    <Stack spacing={3}>
                        <p>New Password</p>
                        <InputGroup size='md'>
                            <Input
                                variant='filled'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='New Password'
                            />
                            <InputRightElement width='4.5rem'>
                                <IconButton
                                    h="1.75rem"
                                    size="sm"
                                    variant='ghost'
                                    onClick={handleShowPassword}
                                    icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>}
                                    aria-label="password-icon"/>
                            </InputRightElement>
                        </InputGroup>
                        <p>Confirm Password</p>
                        <InputGroup size='md'>
                            <Input
                                variant='filled'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Confirm Password'
                            />
                            <InputRightElement width='4.5rem'>
                                <IconButton
                                    h="1.75rem"
                                    size="sm"
                                    variant='ghost'
                                    onClick={handleShowPassword}
                                    icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>}
                                    aria-label="password-icon"/>
                            </InputRightElement>
                        </InputGroup>
                        <Button
                            mt={5}
                            bg={theme.purple}
                            _hover={{bg: theme.onHoverPurple}}
                            color="#ffffff"
                            variant="solid">
                            Save
                        </Button>
                    </Stack>
                </form>
            </div>
        </div>
    );
}