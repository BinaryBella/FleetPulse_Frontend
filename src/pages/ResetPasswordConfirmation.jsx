// import { Button, Stack, FormControl } from '@chakra-ui/react';
// import ResetPass1 from "../assets/images/ResetPass1.png";
// import theme from "../config/ThemeConfig.jsx";
// import { Box } from "@chakra-ui/react";
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Formik } from 'formik';
// import VerificationInput from "react-verification-input";
// import './ResetPasswordConfirmation.css';
// import { useLocation } from "react-router-dom";
//
// export default function ResetPasswordConfirmation() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [pinValue, setPinValue] = useState("");
//     const {email} = location.state;
//
//     const handleChange = (value) => {
//         setPinValue(value);
//     };
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//
//         try {
//             const response = await fetch('https://localhost:7265/api/Auth/ValidateVerificationCode', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     pin: pinValue
//                 })
//             });
//
//             if (!response.ok) {
//                 throw new Error('Something went wrong');
//             }
//
//             const responseData = await response.json();
//
//             if (responseData.isValid) {
//                 navigate(`/app/ResetPassword?email=${email}&pin=${pinValue}`);
//             } else {
//                 alert("Incorrect verification code. Please try again.");
//             }
//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//
//         return (
//             <>
//                 <p className="font-sans text-3xl text-[#393970] mb-10">Reset Password Verification</p>
//                 <img src={ResetPass1} alt="ResetPasswordConfirmation" className="w-1/4 mb-10"/>
//                 <Box textAlign="center" w="50%" fontSize="sm">
//                     <p className="mb-10">We want to make sure its really you. In order to verify your identity, enter
//                         the verification code that was sent to {email} </p>
//                 </Box>
//                 <Formik
//                     initialValues={{pinValue: ""}}
//
//                     validate={() => {
//                         const errors = {};
//                         const pinText = pinValue === undefined ? "" : pinValue.toString();
//                         if (pinText.length < 6) {
//                             errors.pinValue = "Pin number should contain 6 numbers";
//                         }
//                         return errors;
//                     }}
//
//
//                     onSubmit={(values, {setSubmitting}) => {
//                         console.log(values);
//                         if (pinValue.toString().length === 6) {
//                             navigate("/app/ResetPassword");
//                         }
//                         setSubmitting(false);
//                     }}
//                 >
//                     {({handleSubmit, errors, touched}) => (
//                         <form className="w-1/2" onSubmit={handleSubmit}>
//                             <Stack spacing={3}>
//                                 <FormControl isInvalid={errors.pinValue && touched.pinValue}>
//                                     <p className="mb-6">Verification Code</p>
//                                     <VerificationInput
//                                         validChars="0-9"
//                                         inputProps={{inputMode: "numeric"}}
//                                         value={pinValue}
//                                         onChange={handleChange}
//                                         classNames={{
//                                             container: "container",
//                                             character: "character",
//                                             characterFilled: "character--filled"
//                                         }}
//                                     />
//                                     {errors.pinValue && (
//                                         <p className="text-red-500">{errors.pinValue}</p>
//                                     )}
//                                 </FormControl>
//                                 <Button
//                                     bg={theme.purple}
//                                     _hover={{bg: theme.onHoverPurple}}
//                                     color="#ffffff"
//                                     variant="solid"
//                                     type="submit"
//                                 >
//                                     Verify
//                                 </Button>
//                             </Stack>
//                         </form>
//                     )}
//                 </Formik>
//             </>
//         );
//     }
// }
//

import {Button, Stack, FormControl} from '@chakra-ui/react';
import ResetPass1 from "../assets/images/ResetPass1.png";
import theme from "../config/ThemeConfig.jsx";
import {Box} from "@chakra-ui/react";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Formik} from 'formik';
import VerificationInput from "react-verification-input";
import './ResetPasswordConfirmation.css';
import {useLocation} from "react-router-dom";

export default function ResetPasswordConfirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationCode, setVerificationCode] = useState("");
    const {email} = location.state;

    const handleChange = (value) => {
        setVerificationCode(value);
    };

    return (
        <>
            <p className="font-sans text-3xl text-[#393970] mb-10">Reset Password Verification</p>
            <img src={ResetPass1} alt="ResetPasswordConfirmation" className="w-1/4 mb-10"/>
            <Box textAlign="center" w="50%" fontSize="sm">
                <p className="mb-10">We want to make sure its really you. In order to verify your identity, enter
                    the verification code that was sent to {email} </p>
            </Box>
            <Formik
                initialValues={{pinValue: ""}}
                validate={() => {
                    const errors = {};
                    const pinText = verificationCode === undefined ? "" : verificationCode.toString();
                    if (pinText.length < 6) {
                        errors.pinValue = "Pin number should contain 6 numbers";
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    try {
                        if (verificationCode.toString().length === 6) {
                            fetch('https://localhost:7265/api/Auth/validate-verification-code', {
                                method: 'POST',
                                body: JSON.stringify({
                                    email : email,
                                    code : verificationCode
                                }),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                }
                            }).then(response => {
                                return response.json();
                            }).then(data => {
                                console.log(data);
                                if (data.status === true) {
                                    navigate(`/app/ResetPassword?email=${email}&pin=${verificationCode}`);
                                } else {
                                    //todo - add popup confirmation
                                    alert("Incorrect verification code. Please try again.");
                                }
                            })
                        } else {
                            alert("Please enter a valid 6-digit PIN.");
                        }
                    } catch (error) {
                        console.error('Error:', error.message);
                    }
                }}
            >
                {({handleSubmit, errors, touched}) => (
                    <form className="w-1/2" onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <FormControl isInvalid={errors.pinValue && touched.pinValue}>
                                <p className="mb-6">Verification Code</p>
                                <VerificationInput
                                    validChars="0-9"
                                    inputProps={{inputMode: "numeric"}}
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
                                _hover={{bg: theme.onHoverPurple}}
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
