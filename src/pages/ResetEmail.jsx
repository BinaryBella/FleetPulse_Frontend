import {Input, Button, FormControl, FormLabel, Stack} from "@chakra-ui/react";
import Logo from "../assets/images/Logo.jpg";
import forgotPassword from "../assets/images/forgotPassword.png";
import theme from "../config/ThemeConfig.jsx";
import {Box} from "@chakra-ui/react";
import {useState} from "react";

export default function ResetEmail() {
    const [email, setEmail] = useState("");
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log("Submitted email:", email);
    };

    return (
        <div className="flex w-screen h-screen">
            <div className="bg-[#393970] w-1/2 flex items-center justify-center">
                <img src={Logo} alt="Logo" className="w-1/2"/>
            </div>
            <div className="bg-[#E1E4EB] w-1/2 flex flex-col items-center justify-center">
                <p className="font-sans text-3xl text-[#393970] mb-10">Reset Password Verification</p>
                <img src={forgotPassword} alt="ResetPasswordConfirmation" className="w-1/4 mb-10"/>
                <Box textAlign="center" w="50%" fontSize="sm">
                    <p className="mb-10">Enter your email starting with john******.com to continue</p>
                </Box>
                <form className="w-1/2" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                variant='filled'
                                onChange={handleEmailChange}
                                placeholder="Enter Your Email"
                                mb={10}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            bg={theme.purple}
                            _hover={{bg: theme.onHoverPurple}}
                            color="#ffffff"
                            variant="solid"
                        >
                            Send Verification Code
                        </Button>
                    </Stack>
                </form>
            </div>
        </div>
    );
}
