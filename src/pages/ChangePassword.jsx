import { useState, useEffect } from 'react';
import {
    Button,
    Input,
    Alert,
    AlertIcon,
    FormControl,
    FormLabel,
    InputGroup,
    FormErrorMessage,
    InputRightElement,
    IconButton,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Password from "../assets/images/Password.png";
import './ChangePassword.css'
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
    const [error, setError] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const navigate = useNavigate();

    const handleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const handleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const handleShowPassword3 = () => {
        setShowPassword3(!showPassword3);
    };

    const handleAlertClose = () => {
        setIsAlertOpen(false);
    };

    const handleSubmit = async (values) => {
        try {
            const storedUsername = sessionStorage.getItem('Username');
            if (!storedUsername) {
                setError('Username not found in session storage.');
                return;
            }

            const response = await fetch('https://localhost:7265/api/Auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    username: storedUsername,
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                })
            });

            if (response.ok) {
                setIsAlertOpen(true);
            } else {
                if (response.status === 401) {
                    setIsAlertOpen(false);
                } else {
                    const data = await response.json();
                    setError(data.message || 'An error occurred. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError('An error occurred. Please try again.');
        }
    };

    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleCancel = () => {
        navigate('/app/Dashboard');
    };

    useEffect(() => {
        sessionStorage.getItem('Username');
    }, []);

    return (
        <>
            <PageHeader title="Change Password"/>
            <div className="flex justify-between vertical-container">
                <div className="flex flex-col gap-8">
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={{
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: ""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.oldPassword) {
                                errors.oldPassword = "Please enter your old password.";
                            }
                            if (!values.newPassword) {
                                errors.newPassword = "Please enter your new password.";
                            }else if (!isStrongPassword(values.newPassword)) {
                                errors.newPassword = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
                            }
                            if (!values.confirmPassword) {
                                errors.confirmPassword = "Please confirm your new password.";
                            }
                            if (values.oldPassword === values.newPassword) {
                                errors.newPassword = "New password must be different from old password.";
                            }
                            if (values.newPassword !== values.confirmPassword) {
                                errors.confirmPassword = "Passwords do not match with new password.";
                            }
                            return errors;
                        }}
                    >
                        {({handleSubmit, errors, touched}) => (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <FormControl isInvalid={!!errors.oldPassword || (error && error.includes("Old password does not match the stored password."))}>
                                    <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                                    <InputGroup>
                                        <Field
                                            as={Input}
                                            id="oldPassword"
                                            name="oldPassword"
                                            type={showPassword3 ? "text" : "password"}
                                            variant="filled"
                                            placeholder="Old Password"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <IconButton
                                                h="1.75rem"
                                                size="sm"
                                                variant="ghost"
                                                onClick={handleShowPassword3}
                                                icon={showPassword3 ? <ViewOffIcon/> : <ViewIcon/>}
                                                aria-label="password-icon"
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.oldPassword || (error && error.includes("Old password does not match the stored password."))}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.newPassword && touched.newPassword}>
                                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                                    <InputGroup>
                                        <Field
                                            as={Input}
                                            id="newPassword"
                                            name="newPassword"
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
                                    <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                    <InputGroup>
                                        <Field
                                            as={Input}
                                            id="confirmPassword"
                                            name="confirmPassword"
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
                                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                                {error && (
                                    <Alert status="error">
                                        <AlertIcon/>
                                        {error}
                                    </Alert>
                                )}
                                <div className="flex gap-4 mt-10">
                                    <Button
                                        bg="gray.400"
                                        _hover={{bg: "gray.500"}}
                                        color="#ffffff"
                                        variant="solid"
                                        w="240px"
                                        gap="18"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={theme.purple}
                                        _hover={{bg: theme.onHoverPurple}}
                                        color="#ffffff"
                                        variant="solid"
                                        w="240px"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="flex items-end">
                    <img src={Password} alt="Change Password" width="400" height="400" className="opacity-70 mr-14"/>
                </div>
            </div>
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={undefined}
                onClose={handleAlertClose}
                isCentered
            >
                <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                {error ? "Password Change Failed" : "Password Changed Successfully"}
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                {error ? error : "Your password has been changed successfully."}
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
