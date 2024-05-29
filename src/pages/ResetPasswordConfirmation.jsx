import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Stack, FormControl, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import ResetPass1 from "../assets/images/ResetPass1.png";
import theme from "../config/ThemeConfig.jsx";
import { Box } from "@chakra-ui/react";
import VerificationInput from "react-verification-input";
import './ResetPasswordConfirmation.css';

export default function ResetPasswordConfirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationCode, setVerificationCode] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { email } = location.state;

    const handleChange = (value) => {
        setVerificationCode(value);
    };

    const handleAlertClose = () => {
        setIsAlertOpen(false);
    };

    return (
        <>
            <p className="font-sans text-3xl text-[#393970] mb-10">Reset Password Verification</p>
            <img src={ResetPass1} alt="ResetPasswordConfirmation" className="w-1/4 mb-10" />
            <Box textAlign="center" w="50%" fontSize="x-small">
                <p className="mb-10">We want to make sure it's really you. In order to verify your identity, enter the verification code that was sent to {email} </p>
            </Box>
            <Formik
                initialValues={{ pinValue: "" }}
                validate={() => {
                    const errors = {};
                    const pinText = verificationCode === undefined ? "" : verificationCode.toString();
                    if (pinText.length < 6) {
                        errors.pinValue = "Pin number should contain 6 numbers.";
                    }
                    return errors;
                }}
                onSubmit={() => {
                    try {
                        if (verificationCode.toString().length === 6) {
                            // Commented out actual backend implementation
                            /*
                            fetch('https://localhost:7265/api/Auth/validate-verification-code', {
                                method: 'POST',
                                body: JSON.stringify({
                                    email: email,
                                    code: verificationCode
                                }),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                }
                            }).then(response => {
                                return response.json();
                            }).then(data => {
                                console.log(data);
                                if (data.status === true) {
                                    navigate(`/auth/ResetPassword`, { state: { email: email } });
                                } else {
                                    setIsAlertOpen(true);
                                }
                            })
                            */

                            // Dummy data check for demonstration purposes
                            const dummyCode = "123456";

                            if (verificationCode === dummyCode) {
                                navigate(`/auth/ResetPassword`, { state: { email: email } });
                            } else {
                                setIsAlertOpen(true);
                            }
                        } else {
                            alert("Please enter a valid 6-digit PIN.");
                        }
                    } catch (error) {
                        console.error('Error:', error.message);
                    }
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
                                    value={verificationCode}
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
                                width="400px"
                                style={{ transform: 'scale(0.75)' }}
                            >
                                Verify
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={undefined}
                onClose={handleAlertClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Invalid Verification Code
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            The verification code you entered is invalid. Please try again.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={handleAlertClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
