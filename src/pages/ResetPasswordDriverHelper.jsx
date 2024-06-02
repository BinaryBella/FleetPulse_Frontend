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

const PasswordField = ({ fieldId, label, showPassword, handleShowPassword, placeholder, error }) => (
    <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={fieldId}>{label}</FormLabel>
        <InputGroup>
            <Field
                as={Input}
                id={fieldId}
                name={fieldId}
                type={showPassword ? "text" : "password"}
                variant="filled"
                placeholder={placeholder}
                size="sm"
                borderRadius="md"
            />
            <InputRightElement width="4.5rem">
                <IconButton
                    h="1.75rem"
                    size="sm"
                    variant="ghost"
                    onClick={handleShowPassword}
                    icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>}
                    aria-label="password-icon"
                />
            </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
);

export default function ResetPasswordDriverHelper() {
    const [error, setError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPasswordResponse, setResetPasswordResponse] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const cancelRef = useRef();
    const navigate = useNavigate();

    const handleShowPassword = (setter) => () => setter(prev => !prev);

    const handleAlertClose = () => {
        setIsAlertOpen(false);
        navigate('/app/Dashboard');
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const storedUsername = sessionStorage.getItem('Username');
            if (!storedUsername) {
                navigate("/auth/login");
                return;
            }

            const response = await axios.post('https://localhost:7265/api/Auth/reset-password-driverhelper', {
                username: storedUsername,
                newPassword: values.newPassword
            }, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

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
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/app/Dashboard');
    };

    useEffect(() => {
        sessionStorage.getItem('Username');
        $(".pwd-meter > div").children().each(function () {
            $(this).css({"height": "5px", "border-radius": "5px"})
        });
    }, []);

    return (
        <>
            <PageHeader title="Reset Password" className="mb-14"/>
            <div className="flex justify-between vertical-container">
                <div className="flex flex-col gap-8 mt-5">
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={{
                            newPassword: "",
                            confirmPassword: ""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.newPassword) {
                                errors.newPassword = "Please enter your new password.";
                            }
                            if (!values.confirmPassword) {
                                errors.confirmPassword = "Please confirm your new password.";
                            }
                            if (values.newPassword !== values.confirmPassword) {
                                errors.confirmPassword = "Passwords do not match with new password.";
                            }
                            return errors;
                        }}
                    >
                        {({ handleSubmit, errors, touched, values, isSubmitting }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-4/5">
                                <PasswordField
                                    fieldId="newPassword"
                                    label="New Password"
                                    showPassword={showNewPassword}
                                    handleShowPassword={handleShowPassword(setShowNewPassword)}
                                    placeholder="New Password"
                                    error={errors.newPassword}
                                />
                                <PasswordStrengthBar className="pwd-meter" password={values.newPassword}/>
                                <PasswordField
                                    fieldId="confirmPassword"
                                    label="Confirm Password"
                                    showPassword={showConfirmPassword}
                                    handleShowPassword={handleShowPassword(setShowConfirmPassword)}
                                    placeholder="Confirm Password"
                                    error={errors.confirmPassword}
                                />
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
                                        w="200px"
                                        gap="18"
                                        onClick={handleCancel}
                                        isDisabled={isSubmitting}
                                        size="sm"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={theme.purple}
                                        _hover={{bg: theme.onHoverPurple}}
                                        color="#ffffff"
                                        variant="solid"
                                        w="200px"
                                        type="submit"
                                        isLoading={isSubmitting}
                                        size="sm"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
                <div className="flex items-end">
                    <img src={Password} alt="Change Password" width="400" height="400" className="mr-14"/>
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
