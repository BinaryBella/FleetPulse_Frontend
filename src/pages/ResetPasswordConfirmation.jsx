import {Button, Input, Stack} from '@chakra-ui/react';
import Logo from "../assets/images/Logo.jpg";
import ResetPass1 from "../assets/images/ResetPass1.png";
import theme from "../config/ThemeConfig.jsx";
import { Box } from "@chakra-ui/react";

export default function ResetPasswordConfirmation(){
    return(
        <div className="flex w-screen h-screen">
            <div className="bg-[#393970] w-1/2 flex items-center justify-center">
                <img src={Logo} alt="Logo" className="w-1/2"/>
            </div>
            <div className="bg-[#E1E4EB] w-1/2 flex flex-col items-center justify-center">
                <p className="font-sans text-3xl text-[#393970] mb-10">Reset Password Verification</p>
                <img src={ ResetPass1 } alt="ResetPasswordConfirmation" className="w-1/4 mb-10"/>
                <Box textAlign="center" w="50%" fontSize="sm">
                    <p className="mb-10">We want to make sure it's really you. In order to verify, your identity, enter the
                        verification code that was sent to johndoe@gmail.com</p>
                </Box>
                <form className="w-1/2">
                    <Stack spacing={3}>
                        <p>Verification Code</p>
                        <Input
                            variant='filled'
                            placeholder='Enter Verification Code'
                            mb={10}
                        />
                        <Button
                            bg={theme.purple}
                            _hover={{bg: theme.onHoverPurple}}
                            color="#ffffff"
                            variant="solid">
                            Verify
                        </Button>
                    </Stack>
                </form>
            </div>
        </div>
    );
}