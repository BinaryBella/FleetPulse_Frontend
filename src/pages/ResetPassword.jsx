import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, Stack, Button, Alert, AlertIcon } from "@chakra-ui/react";
import ResetPass2 from "../assets/images/ResetPass2.png";
import theme from "../config/ThemeConfig.jsx";
import { Box } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field, Formik } from "formik";
import { useLocation } from "react-router-dom";

export default function ResetPassword() {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state;

    const handleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const handleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('https://localhost:7265/api/Auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    newPassword: values.newpassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/auth/ResetPassSuccess");
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <p className="font-sans text-3xl text-[#393970] mb-7">Reset Password</p>
            <img src={ResetPass2} alt="ResetPassword" className="w-1/4 mb-4"/>
            <Box textAlign="center" w="50%" fontSize="sm">
                <p className="text-2xl text-[#D49458] font-bold mb-4">Create new password</p>
                <p className="mb-4">Your new password must be different from the previously used password</p>
            </Box>
            <Formik
                initialValues={{
                    newpassword: "",
                    confirmpassword: ""
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.newpassword) {
                        errors.newpassword = "New Password is Required";
                    }
                    if (!values.confirmpassword) {
                        errors.confirmpassword = "Confirm Password is Required";
                    }
                    if (values.newpassword !== values.confirmpassword) {
                        errors.confirmpassword = "Passwords do not match";
                    }
                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="w-1/2">
                        <Stack spacing={3}>
                            {error && ( // Display error message if error state is not empty
                                <Alert status="error" mb={4}>
                                    <AlertIcon />
                                    {error}
                                </Alert>
                            )}
                            <FormControl isInvalid={!!errors.newpassword || touched.newpassword}>
                                <FormLabel htmlFor="newpassword">New Password</FormLabel>
                                <InputGroup>
                                    <Field
                                        as={Input}
                                        id="newpassword"
                                        name="newpassword"
                                        type={showPassword1 ? "text" : "password"}
                                        variant="filled"
                                        placeholder="New Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <IconButton
                                            h="1.75rem"
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleShowPassword1}
                                            icon={showPassword1 ? <ViewOffIcon/> : <ViewIcon/>}
                                            aria-label="password-icon"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.newpassword}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.confirmpassword || touched.confirmpassword}>
                                <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
                                <InputGroup>
                                    <Field
                                        as={Input}
                                        id="confirmpassword"
                                        name="confirmpassword"
                                        type={showPassword2 ? "text" : "password"}
                                        variant="filled"
                                        placeholder="Confirm Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <IconButton
                                            h="1.75rem"
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleShowPassword2}
                                            icon={showPassword2 ? <ViewOffIcon/> : <ViewIcon/>}
                                            aria-label="password-icon"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.confirmpassword}</FormErrorMessage>
                            </FormControl>
                            <Button
                                type="submit"
                                mt={5}
                                bg={theme.purple}
                                _hover={{bg: theme.onHoverPurple}}
                                color="#ffffff"
                                variant="solid">
                                Save
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </>
    );
}
