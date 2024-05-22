import {useState, useEffect, useRef} from 'react';
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
import {Field, Formik} from "formik";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Password from "../assets/images/Password.png";
import './ChangePassword.css';
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import PasswordStrengthBar from 'react-password-strength-bar';
import {useNavigate} from "react-router-dom";
import $ from "jquery";
import axios from "axios";

export default function ChangePassword() {
    const [error, setError] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [resetPasswordResponse, setResetPasswordResponse] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const cancelRef = useRef();
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
        navigate('/app/Dashboard');
    };

    const handleSubmit = async (values) => {
        try {
            const storedUsername = sessionStorage.getItem('Username');

            if (!storedUsername) {
                navigate("/auth/login");
                return;
            }

            const response = await axios.post('https://localhost:7265/api/Auth/change-password', {
                    username: storedUsername,
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );

            if (response.data.status) {
                setIsAlertOpen(true);
                setResetPasswordResponse(response.data.message);
            } else {
                if (response.data.error === "Old password is incorrect.") {
                    setError(response.data.error);
                } else {
                    setIsAlertOpen(true);
                    setResetPasswordResponse(response.data.error);
                }
            }

        } catch (error) {
            console.error('Error:', error.message);
            setError('An error occurred. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/app/Dashboard');
    };

    useEffect(() => {
        sessionStorage.getItem('Username');

        // Password strength meter style
        $(".pwd-meter > div").children().each(function () {
            $(this).css({"height": "5px", "border-radius": "5px"})
        });

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
                        {({handleSubmit, errors, touched, values}) => (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <FormControl
                                    isInvalid={!!errors.oldPassword || (error && error === "Your old password is incorrect.")}>
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
                                        {errors.oldPassword || (error && error === "Your old password is incorrect.")}
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
                                            mb="10px"
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
                                    <PasswordStrengthBar className="pwd-meter" password={values.newPassword}/>
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
                    <img src={Password} alt="Change Password" width="400" height="400" className=" mr-14"/>
                </div>
            </div>
            <AlertDialog
                isOpen={isAlertOpen}
                leastDestructiveRef={cancelRef}
                onClose={handleAlertClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Password Reset
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {resetPasswordResponse}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={handleAlertClose} ref={cancelRef}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
