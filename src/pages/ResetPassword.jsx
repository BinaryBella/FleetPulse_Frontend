// import {
//     Button,
//     FormControl,
//     FormErrorMessage,
//     FormLabel,
//     IconButton,
//     Input,
//     InputGroup,
//     InputRightElement,
//     Stack
// } from '@chakra-ui/react';
// import ResetPass2 from "../assets/images/ResetPass2.png";
// import theme from "../config/ThemeConfig.jsx";
// import {Box} from "@chakra-ui/react";
// import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
// import {useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {Field, Formik} from "formik";
//
// export default function ResetPassword() {
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const handleShowPassword = () => {
//         setShowPassword(!showPassword);
//     };
//
//     return (
//         <>
//             <p className="font-sans text-3xl text-[#393970] mb-7">Reset Password</p>
//             <img src={ResetPass2} alt="ResetPassword" className="w-1/4 mb-4"/>
//             <Box textAlign="center" w="50%" fontSize="sm">
//                 <p className="text-2xl text-[#D49458] font-bold mb-4">Create new password</p>
//                 <p className="mb-4">Your new password must be different from the previously used password</p>
//             </Box>
//             <Formik
//                 initialValues={{
//                     newpassword: "",
//                     confirmpassword: ""
//                 }}
//                 validate={values => {
//                     const errors = {};
//                     if (values.newpassword !== values.confirmpassword) {
//                         errors.confirmpassword = "Passwords do not match";
//                     }
//                     return errors;
//                 }}
//                 onSubmit={(values) => {
//                     console.log(values); // For testing, you can remove this line
//                     navigate("/app/ResetPassSuccess");
//                 }}
//             >
//                 {({handleSubmit, errors, touched}) => (
//                     <form onSubmit={handleSubmit} className="w-1/2">
//                         <Stack spacing={3}>
//                             <FormControl isInvalid={!!errors.newpassword || touched.newpassword}>
//                                 <FormLabel htmlFor="newpassword">New Password</FormLabel>
//                                 <InputGroup>
//                                     <Field
//                                         as={Input}
//                                         id="newpassword"
//                                         name="newpassword"
//                                         type="password"
//                                         variant="filled"
//                                         placeholder="New Password"
//                                         validate={(value) => {
//                                             let error;
//
//                                             if (value === "") {
//                                                 error = "New Password is Required";
//                                             }
//
//                                             return error;
//                                         }}
//                                     />
//                                     <InputRightElement width="4.5rem">
//                                         <IconButton
//                                             h="1.75rem"
//                                             size="sm"
//                                             variant="ghost"
//                                             onClick={handleShowPassword}
//                                             icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>}
//                                             aria-label="password-icon"
//                                         />
//                                     </InputRightElement>
//                                 </InputGroup>
//                                 <FormErrorMessage>{errors.newpassword}</FormErrorMessage>
//                             </FormControl>
//                             <FormControl isInvalid={!!errors.confirmpassword || touched.confirmpassword}>
//                                 <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
//                                 <InputGroup>
//                                     <Field
//                                         as={Input}
//                                         id="confirmpassword"
//                                         name="confirmpassword"
//                                         type="password"
//                                         variant="filled"
//                                         placeholder="Confirm Password"
//                                         validate={(value) => {
//                                             let error;
//
//                                             if (value === "") {
//                                                 error = "Confirm Password is Required";
//                                             }
//
//                                             return error;
//                                         }}
//                                     />
//                                     <InputRightElement width="4.5rem">
//                                         <IconButton
//                                             h="1.75rem"
//                                             size="sm"
//                                             variant="ghost"
//                                             onClick={handleShowPassword}
//                                             icon={showPassword ? <ViewOffIcon/> : <ViewIcon/>}
//                                             aria-label="password-icon"
//                                         />
//                                     </InputRightElement>
//                                 </InputGroup>
//                                 <FormErrorMessage>{errors.confirmpassword}</FormErrorMessage>
//                             </FormControl>
//                             <Button
//                                 type="submit"
//                                 mt={5}
//                                 bg={theme.purple}
//                                 _hover={{bg: theme.onHoverPurple}}
//                                 color="#ffffff"
//                                 variant="solid">
//                                 Save
//                             </Button>
//                         </Stack>
//                     </form>
//                 )}
//             </Formik>
//         </>
//     );
// }


// import {
//     Button,
//     FormControl,
//     FormErrorMessage,
//     FormLabel,
//     IconButton,
//     Input,
//     InputGroup,
//     InputRightElement,
//     Stack
// } from '@chakra-ui/react';
// import ResetPass2 from "../assets/images/ResetPass2.png";
// import theme from "../config/ThemeConfig.jsx";
// import {Box} from "@chakra-ui/react";
// import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
// import {useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {Field, Formik} from "formik";
//
// export default function ResetPassword() {
//     const [showPassword1, setShowPassword1] = useState(false); // State for first password field
//     const [showPassword2, setShowPassword2] = useState(false); // State for second password field
//     const navigate = useNavigate();
//
//     const handleShowPassword1 = () => {
//         setShowPassword1(!showPassword1);
//     };
//
//     const handleShowPassword2 = () => {
//         setShowPassword2(!showPassword2);
//     };
//
//     return (
//         <>
//             <p className="font-sans text-3xl text-[#393970] mb-7">Reset Password</p>
//             <img src={ResetPass2} alt="ResetPassword" className="w-1/4 mb-4"/>
//             <Box textAlign="center" w="50%" fontSize="sm">
//                 <p className="text-2xl text-[#D49458] font-bold mb-4">Create new password</p>
//                 <p className="mb-4">Your new password must be different from the previously used password</p>
//             </Box>
//             <Formik
//                 initialValues={{
//                     newpassword: "",
//                     confirmpassword: ""
//                 }}
//                 validate={values => {
//                     const errors = {};
//                     if (values.newpassword !== values.confirmpassword) {
//                         errors.confirmpassword = "Passwords do not match";
//                     }
//                     return errors;
//                 }}
//                 onSubmit={(values) => {
//                     console.log(values); // For testing, you can remove this line
//                     navigate("/app/ResetPassSuccess");
//                 }}
//             >
//                 {({handleSubmit, errors, touched}) => (
//                     <form onSubmit={handleSubmit} className="w-1/2">
//                         <Stack spacing={3}>
//                             <FormControl isInvalid={!!errors.newpassword || touched.newpassword}>
//                                 <FormLabel htmlFor="newpassword">New Password</FormLabel>
//                                 <InputGroup>
//                                     <Field
//                                         as={Input}
//                                         id="newpassword"
//                                         name="newpassword"
//                                         type={showPassword1 ? "text" : "password"}
//                                         variant="filled"
//                                         placeholder="New Password"
//                                         validate={(value) => {
//                                             let error;
//
//                                             if (value === "") {
//                                                 error = "New Password is Required";
//                                             }
//
//                                             return error;
//                                         }}
//                                     />
//                                     <InputRightElement width="4.5rem">
//                                         <IconButton
//                                             h="1.75rem"
//                                             size="sm"
//                                             variant="ghost"
//                                             onClick={handleShowPassword1}
//                                             icon={showPassword1 ? <ViewOffIcon/> : <ViewIcon/>}
//                                             aria-label="password-icon"
//                                         />
//                                     </InputRightElement>
//                                 </InputGroup>
//                                 <FormErrorMessage>{errors.newpassword}</FormErrorMessage>
//                             </FormControl>
//                             <FormControl isInvalid={!!errors.confirmpassword || touched.confirmpassword}>
//                                 <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
//                                 <InputGroup>
//                                     <Field
//                                         as={Input}
//                                         id="confirmpassword"
//                                         name="confirmpassword"
//                                         type={showPassword2 ? "text" : "password"}
//                                         variant="filled"
//                                         placeholder="Confirm Password"
//                                         validate={(value) => {
//                                             let error;
//
//                                             if (value === "") {
//                                                 error = "Confirm Password is Required";
//                                             }
//
//                                             return error;
//                                         }}
//                                     />
//                                     <InputRightElement width="4.5rem">
//                                         <IconButton
//                                             h="1.75rem"
//                                             size="sm"
//                                             variant="ghost"
//                                             onClick={handleShowPassword2}
//                                             icon={showPassword2 ? <ViewOffIcon/> : <ViewIcon/>}
//                                             aria-label="password-icon"
//                                         />
//                                     </InputRightElement>
//                                 </InputGroup>
//                                 <FormErrorMessage>{errors.confirmpassword}</FormErrorMessage>
//                             </FormControl>
//                             <Button
//                                 type="submit"
//                                 mt={5}
//                                 bg={theme.purple}
//                                 _hover={{bg: theme.onHoverPurple}}
//                                 color="#ffffff"
//                                 variant="solid">
//                                 Save
//                             </Button>
//                         </Stack>
//                     </form>
//                 )}
//             </Formik>
//         </>
//     );
// }


import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack
} from '@chakra-ui/react';
import ResetPass2 from "../assets/images/ResetPass2.png";
import theme from "../config/ThemeConfig.jsx";
import {Box} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Field, Formik} from "formik";

export default function ResetPassword() {
    const [showPassword1, setShowPassword1] = useState(false); // State for first password field
    const [showPassword2, setShowPassword2] = useState(false); // State for second password field
    const navigate = useNavigate();

    const handleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const handleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <>
            <p className="font-sans text-3xl text-[#393970] mb-7">Reset Password</p>
            <img src={ResetPass2} alt="ResetPassword" className="w-1/4 mb-4"/>
            <Box textAlign="center" w="50%" fontSize="sm">
                <p className="text-2xl text-[#D49458] font-bold mb-4">Create new password</p>
                <p className="mb-4">Your new password must be different from the previously used password</p>
            </Box>
            <Formik
                initialValues={{
                    newpassword: "",
                    confirmpassword: ""
                }}
                validate={values => {
                    const errors = {};
                    if (!values.newpassword) {
                        errors.newpassword = "New Password is Required";
                    }
                    if (!values.confirmpassword) {
                        errors.confirmpassword = "Confirm Password is Required";
                    }
                    if (values.newpassword !== values.confirmpassword) {
                        errors.confirmpassword = "Passwords do not match";
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    console.log(values); // For testing, you can remove this line
                    navigate("/app/ResetPassSuccess");
                }}
            >
                {({handleSubmit, errors, touched}) => (
                    <form onSubmit={handleSubmit} className="w-1/2">
                        <Stack spacing={3}>
                            <FormControl isInvalid={!!errors.newpassword || touched.newpassword}>
                                <FormLabel htmlFor="newpassword">New Password</FormLabel>
                                <InputGroup>
                                    <Field
                                        as={Input}
                                        id="newpassword"
                                        name="newpassword"
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
                                <FormErrorMessage>{errors.newpassword}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.confirmpassword || touched.confirmpassword}>
                                <FormLabel htmlFor="confirmpassword">Confirm Password</FormLabel>
                                <InputGroup>
                                    <Field
                                        as={Input}
                                        id="confirmpassword"
                                        name="confirmpassword"
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
                                <FormErrorMessage>{errors.confirmpassword}</FormErrorMessage>
                            </FormControl>
                            <Button
                                type="submit"
                                mt={5}
                                bg={theme.purple}
                                _hover={{bg: theme.onHoverPurple}}
                                color="#ffffff"
                                variant="solid">
                                Save
                            </Button>
                        </Stack>
                    </form>
                )}
            </Formik>
        </>
    );
}
