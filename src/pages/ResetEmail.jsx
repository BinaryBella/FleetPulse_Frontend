import { Input, Button, FormControl, FormLabel, Stack, FormErrorMessage, Box } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import forgotPassword from "../assets/images/forgotPassword.png";
import theme from "../config/ThemeConfig.jsx";
import { useNavigate } from 'react-router-dom';

export default function ResetEmail() {
    const navigate = useNavigate();

    return (
        <>
            <p className="font-sans text-3xl text-[#393970] mb-10">Reset Password Verification</p>
            <img src={forgotPassword} alt="ResetPasswordConfirmation" className="w-1/4 mb-10" />
            <Box textAlign="center" w="50%" fontSize="sm">
                <p className="mb-10">Enter your email Address to continue</p>
            </Box>
            <Formik
                initialValues={{
                    email: ""
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Email is Required";
                    }
                    return errors;
                }}
                onSubmit={async (values) => {
                    try {
                        console.log("Submitting form with values:", values);
                        const response = await fetch('https://localhost:7265/api/Auth/forgot-password', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email: values.email })
                        });

                        if (!response.ok) {
                            throw new Error('Something went wrong');
                        }

                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.indexOf('application/json') !== -1) {
                            const responseData = await response.json();
                            console.log("Response data:", responseData);
                            if (responseData.status) {
                                navigate(`/app/ResetPasswordConfirmation`, { state: { email: values.email } });
                            } else {
                                console.error(responseData.message);
                            }
                        } else {
                            throw new Error('Unexpected response format');
                        }
                    } catch (error) {
                        console.error('Error:', error.message);
                    }
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form className="w-1/2" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <FormControl isInvalid={errors.email && touched.email}>
                                <FormLabel>Email Address</FormLabel>
                                <Field
                                    as={Input}
                                    id="email"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                    placeholder="Enter Your Email Address"
                                    mb={3}
                                />
                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                            <Button className="mb-10"
                                    type="submit"
                                    bg={theme.purple}
                                    _hover={{ bg: theme.onHoverPurple }}
                                    color="#ffffff"
                                    mt={5}
                            >
                                Send Verification Code
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </>
    );
}
