import Logo from "../assets/images/Logo.jpg";
import ResetPass3 from "../assets/images/ResetPass3.png";
import {Box, Button, Stack} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

export default function ResetPassSuccess() {
    return (
        <div>
            <div className="flex w-screen h-screen">
                <div className="bg-[#393970] w-1/2 flex items-center justify-center">
                    <img src={Logo} alt="Logo" className="w-1/2"/>
                </div>
                <div className="bg-[#E1E4EB] w-1/2 flex flex-col items-center justify-center">
                    <p className="font-sans text-3xl text-[#393970] mb-7">Reset Password</p>
                    <img src={ResetPass3} alt="ResetPassword" className="w-1/4 mb-4"/>
                    <Box Box textAlign="center" w="50%" fontSize="sm">
                        <p className="text-2xl text-[#D49458] font-bold mb-4">Password Updated</p>
                        <p className="mb-6">Your password has been updated</p>
                    </Box>
                    <form className="w-1/2">
                        <Stack>
                            <Button
                                bg={theme.purple}
                                _hover={{bg: theme.onHoverPurple}}
                                color="#ffffff"
                                variant="solid">
                                Login
                            </Button>
                        </Stack>
                    </form>
                </div>
            </div>
        </div>
    );
}
