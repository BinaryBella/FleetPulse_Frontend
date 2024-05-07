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

    // Toggle password visibility
    const togglePasswordVisibility = (passwordNumber) => {
        switch (passwordNumber) {
            case 1:
                setShowPassword1(!showPassword1);
                break;
            case 2:
                setShowPassword2(!showPassword2);
                break;
            case 3:
                setShowPassword3(!showPassword3);
                break;
            default:
                break;
        }
    };

    // Handle form submission
    const handleSubmit = async (values) => {
        try {
            if (!validateFields(values)) {
                return;
            }

            // Retrieve username from session storage
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
                    username: storedUsername, // Use storedUsername retrieved from session storage
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                })
            });
            const data = await response.json();

            if (response.ok) {
                setIsAlertOpen(true);
            } else {
                setError(data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError('An error occurred. Please try again.');
        }
    };

    // Validate form fields
    const validateFields = (values) => {
        const errors = {};
        if (!values.oldPassword) {
            errors.oldPassword = "Please enter your old password.";
        }
        if (!values.newPassword) {
            errors.newPassword = "Please enter your new password.";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Please confirm your new password.";
        }
        if (values.oldPassword === values.newPassword) {
            errors.newPassword = "New password must be different from old password.";
        }
        if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }
        return errors;
    };

    // Handle cancel button click
    const handleCancel = () => {
        navigate('/app/Dashboard');
    };

    // Handle closing alert dialog
    const handleAlertClose = () => {
        setIsAlertOpen(false);
    };

    // useEffect to retrieve username from session storage
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
                    >
                        {({ handleSubmit, errors, touched }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <FormControl isInvalid={!!errors.oldPassword && touched.oldPassword}>
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
                                                onClick={() => togglePasswordVisibility(3)}
                                                icon={showPassword3 ? <ViewOffIcon /> : <ViewIcon />}
                                                aria-label="password-icon"
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.oldPassword}</FormErrorMessage>
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
                                                onClick={() => togglePasswordVisibility(1)}
                                                icon={showPassword1 ? <ViewOffIcon /> : <ViewIcon />}
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
                                                onClick={() => togglePasswordVisibility(2)}
                                                icon={showPassword2 ? <ViewOffIcon /> : <ViewIcon />}
                                                aria-label="password-icon"
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                </FormControl>
                                {error && (
                                    <Alert status="error">
                                        <AlertIcon />
                                        {error}
                                    </Alert>
                                )}
                                <div className="flex gap-4 mt-10">
                                    <Button
                                        bg="gray.400"
                                        _hover={{ bg: "gray.500" }}
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
                                        _hover={{ bg: theme.onHoverPurple }}
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
                    <img src={Password} alt="Change Password" width="400" height="400" className="opacity-70 mr-14" />
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
                            Password Changed Successfully
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Your password has been changed successfully.
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
