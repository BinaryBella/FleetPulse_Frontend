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
                onSubmit={(values) => {
                    const data = {email: values.email}
                    navigate(`/app/ResetPasswordConfirmation`, {state: {data} });
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
