import { useState } from "react";
import { FormControl, FormErrorMessage, FormLabel, Text } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { IconButton, Input, InputGroup, InputRightElement, Stack, Button } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import first from "../assets/images/login.png";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state
    const [resetClicked, setResetClicked] = useState(false);
    const [backendError, setBackendError] = useState("");

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleResetClick = () => {
        setResetClicked(true);
    };

    return (
        <>
            <p className="font-sans text-3xl text-[#393970]">Login</p>
            <img src={first} alt="login" width="300" height="300" />
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={(values) => {
                    setLoading(true); // Set loading to true when submitting form
                    fetch('https://localhost:7265/api/Auth/Login', {
                        method: 'POST',
                        body: JSON.stringify({
                            username: values.username,
                            password: values.password
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        }
                    }).then(response => response.json())
                        .then(data => {
                            if (!data.status) {
                                if (data.message === "Unauthorized: Only Admin or Staff can login") {
                                    navigate("/unauthorized");
                                } else {
                                    setBackendError(data.message);
                                }
                            } else {
                                const { token, jobTitle } = data.data;
                                if (jobTitle === "Admin" || jobTitle === "Staff") {
                                    sessionStorage.setItem('Username', values.username);
                                    localStorage.setItem('Token', token);
                                    sessionStorage.setItem('UserRole', jobTitle);                                    navigate('/app/Dashboard');
                                } else {
                                    navigate("/unauthorized");
                                }
                            }
                        }).catch(() => {
                        setBackendError('Login failed. Please try again.');
                    }).finally(() => {
                        setLoading(false); // Set loading to false when request is completed
                    });
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="w-2/4">
                        <Stack spacing={2}>
                            <FormControl isInvalid={errors.username && touched.username}>
                                <FormLabel htmlFor="username" fontSize="sm">Username</FormLabel>
                                <Field
                                    as={Input}
                                    id="username"
                                    name="username"
                                    type="text"
                                    variant="filled"
                                    placeholder="Username"
                                    fontSize="sm"
                                    size="sm"
                                    borderRadius="md"
                                    padding="2"
                                    validate={(value) => {
                                        if (!value) {
                                            return "Username is required.";
                                        }
                                    }}
                                />
                                <FormErrorMessage fontSize="xs">{errors.username}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.password && touched.password}>
                                <FormLabel htmlFor="password" fontSize="sm">Password</FormLabel>
                                <InputGroup>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        variant="filled"
                                        placeholder="Password"
                                        fontSize="sm"
                                        size="sm"
                                        borderRadius="md"
                                        padding="2"
                                        validate={(value) => {
                                            if (!value) {
                                                return "Password is required.";
                                            }
                                        }}
                                    />
                                    <InputRightElement width="3rem">
                                        <IconButton
                                            h="1.3rem"
                                            size="xs"
                                            variant="ghost"
                                            onClick={handleShowPassword}
                                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            aria-label="password-icon"
                                            margin-top="5px"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage fontSize="xs">{errors.password}</FormErrorMessage>
                            </FormControl>
                            <div className="flex justify-end">
                                {!resetClicked && (
                                    <Link to="/auth/ResetEmail" onClick={handleResetClick}>
                                        <Button variant="link" className="mb-4" fontSize="sm">
                                            Reset Password
                                        </Button>
                                    </Link>
                                )}
                            </div>
                            {backendError && (
                                <Text color="red.500" fontSize="xs" align="center">
                                    {backendError}
                                </Text>
                            )}
                            {/* Conditional rendering of loading spinner */}
                            <Button
                                bg={theme.purple}
                                _hover={{ bg: theme.onHoverPurple }}
                                color="#ffffff"
                                variant="solid"
                                type="submit"
                                size="sm"
                                isLoading={loading} // Add isLoading prop
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </>
    );
}
