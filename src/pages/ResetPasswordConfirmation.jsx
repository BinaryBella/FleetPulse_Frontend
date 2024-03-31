import { Button, Stack, FormControl } from '@chakra-ui/react';
import ResetPass1 from "../assets/images/ResetPass1.png";
import theme from "../config/ThemeConfig.jsx";
import { Box } from "@chakra-ui/react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import VerificationInput from "react-verification-input";
import './ResetPasswordConfirmation.css';
import { useLocation } from "react-router-dom";

export default function ResetPasswordConfirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [pinValue, setPinValue] = useState("");
    const { data } = location.state;

    const handleChange = (value) => {
        // Handle change of pin value
        setPinValue(value);
    };

    return (
        <>
            <p className="font-sans text-3xl text-[#393970] mb-10">Reset Password Verification</p>
            <img src={ResetPass1} alt="ResetPasswordConfirmation" className="w-1/4 mb-10" />
            <Box textAlign="center" w="50%" fontSize="sm">
                <p className="mb-10">We want to make sure its really you. In order to verify your identity, enter the verification code that was sent to {data.email} </p>
            </Box>
            <Formik
                initialValues={{ pinValue: "" }}

                validate={()=> {
                    const errors = {};
                    const pinText = pinValue === undefined ? "" : pinValue.toString();
                    if (pinText.length < 6) {
                        errors.pinValue = "Pin number should contain 6 numbers";
                    }
                    return errors;
                }}


                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    if (pinValue.toString().length === 6) {
                        navigate("/app/ResetPassword");
                    }
                    setSubmitting(false);
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form className="w-1/2" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <FormControl isInvalid={errors.pinValue && touched.pinValue}>
                                <p className="mb-6">Verification Code</p>
                                <VerificationInput
                                    validChars="0-9"
                                    inputProps={{ inputMode: "numeric" }}
                                    value={pinValue}
                                    onChange={handleChange}
                                    classNames={{
                                        container: "container",
                                        character: "character",
                                        characterFilled: "character--filled"
                                    }}
                                />
                                {errors.pinValue && (
                                    <p className="text-red-500">{errors.pinValue}</p>
                                )}
                            </FormControl>
                            <Button
                                bg={theme.purple}
                                _hover={{ bg: theme.onHoverPurple }}
                                color="#ffffff"
                                variant="solid"
                                type="submit"
                            >
                                Verify
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </>
    );
}
