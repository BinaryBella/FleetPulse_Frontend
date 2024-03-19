import { useState } from "react";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { IconButton, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [resetClicked, setResetClicked] = useState(false);

    const handleResetClick = () => {
        setResetClicked(true);
    };

    return (
        <>
            <p className="font-sans text-3xl text-[#393970] mb-10">Login</p>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={() => {
                    navigate("/app/Dashboard");
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit} className="w-1/2">
                        <Stack spacing={3}>
                            <FormControl isInvalid={!!errors.username || touched.username}>
                                <FormLabel htmlFor="Username">Username</FormLabel>
                                <Field
                                    as={Input}
                                    id="Username"
                                    name="username"
                                    type="text"
                                    variant="filled"
                                    placeholder="Username"
                                    validate={(value) => {
                                        let error;

                                        if (value === ""){
                                            error = "Username is Required";
                                        }

                                        return error;
                                    }}
                                />
                                <FormErrorMessage>{errors.username}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.password || touched.password}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        variant="filled"
                                        placeholder="Password"
                                        validate={(value) => {
                                            let error;

                                            if (value === "") {
                                                error = "Password is Required";
                                            }

                                            return error;
                                        }}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <IconButton
                                            h="1.75rem"
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleShowPassword}
                                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                            aria-label="password-icon"
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                            </FormControl>
                            <div className="flex justify-end">
                                {!resetClicked && (
                                    <Link to="/app/ResetEmail" onClick={handleResetClick}>
                                        <Button variant="link" className="mb-10">
                                            Reset Password
                                        </Button>
                                    </Link>
                                )}
                            </div>
                            <Button
                                bg={theme.purple}
                                _hover={{ bg: theme.onHoverPurple }}
                                color="#ffffff"
                                variant="solid"
                                type="submit"
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