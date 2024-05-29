import { Input, Button, FormControl, FormLabel, Stack, FormErrorMessage, Box } from "@chakra-ui/react";
import { Field, Formik} from "formik";
import forgotPassword from "../assets/images/forgotPassword.png";
import theme from "../config/ThemeConfig.jsx";
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function ResetEmail() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    return (
        <>
            <p className="font-sans text-3xl text-[#393970] mb-10">Reset Password Verification</p>
            <img src={forgotPassword} alt="ResetPasswordConfirmation" className="w-1/2 mb-10"/>
            <Box textAlign="center" w="50%" fontSize="sm" marginBottom="10">
                <p>Enter your email address to continue.</p>
            </Box>
            <Formik
                initialValues={{
                    email: ""
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Email is required.";
                    }
                    return errors;
                }}
                onSubmit={async (values, { setFieldError }) => {
                    setLoading(true);

                    // Commented out actual backend implementation
                    /*
                    try {
                        console.log("Submitting form with values:", values);
                        const response = await fetch('https://localhost:7265/api/Auth/forgot-password', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({email: values.email})
                        });

                        if (!response.ok) {
                            throw new Error('Something went wrong');
                        }

                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.indexOf('application/json') !== -1) {
                            const responseData = await response.json();
                            console.log("Response data:", responseData);
                            if (responseData.status) {
                                navigate(`/auth/ResetPasswordConfirmation`, {state: {email: values.email}});
                            } else {
                                setFieldError('email', 'Email is not found');
                            }
                        } else {
                            throw new Error('Unexpected response format');
                        }
                    } catch (error) {
                        console.error('Error:', error.message);
                    } finally {
                        setLoading(false);
                    }
                    */

                    // Dummy data check for demonstration purposes
                    const dummyEmail = "user@example.com";

                    if (values.email === dummyEmail) {
                        navigate(`/auth/ResetPasswordConfirmation`, { state: { email: values.email } });
                    } else {
                        setFieldError('email', 'Email is not found');
                    }

                    setLoading(false);
                }}
            >
                {({handleSubmit, errors, touched}) => (
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
                            <Button className="mb-2"
                                    type="submit"
                                    bg={theme.purple}
                                    _hover={{bg: theme.onHoverPurple}}
                                    color="#ffffff"
                                    mt={5}
                                    isLoading={loading}
                                    loadingText='Sending'
                                    variant='outline'
                            >
                                Send Verification Code
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
            <div className="flex justify-end">
                <Link to="/auth/login">
                    <Button variant="link" className="mt-3">
                        Return to Login
                    </Button>
                </Link>
            </div>
        </>
    );
}
