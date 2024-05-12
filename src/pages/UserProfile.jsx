import { useState, useRef, useEffect } from 'react';
import {
    Text,
    Input,
    Button,
    Avatar,
    AvatarGroup,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {AiOutlineCamera, AiOutlineUser} from "react-icons/ai";

export default function UserProfile() {
    const navigate = useNavigate();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [image, setImage] = useState("");
    const [isImageRemoved, setIsImageRemoved] = useState(false);
    const [userData, setUserData] = useState({
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        EmailAddress: "",
        PhoneNo: "",
        NIC: "",
        ProfilePicture: "",
    });

    const fetchUser = async () => {
        try {
            const username = sessionStorage.getItem("Username");
            if (username) {
                const response = await axios.get(`https://localhost:7265/api/Auth/userProfile?username=${username}`);
                const responseData = response.data;
                setUserData({
                    FirstName: responseData.firstName,
                    LastName: responseData.lastName,
                    DateOfBirth: responseData.dateOfBirth,
                    EmailAddress: responseData.emailAddress,
                    PhoneNo: responseData.phoneNo,
                    NIC: responseData.nic,
                    ProfilePicture: responseData.profilePicture,
                });
                setImage(responseData.profilePicture);
            } else {
                console.error("Username not found in session storage");
            }
        } catch (error) {
            console.error("Error fetching User details:", error);
        }
    };

    useEffect(() => {
        fetchUser().then();
    }, []);

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            setImage(base64String);
        };
        reader.readAsDataURL(file);
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (values) => {
        try {
            const username = sessionStorage.getItem("Username");
            const profilePicture = isImageRemoved ? "" : image;
            const response = await axios.put('https://localhost:7265/api/Auth/UpdateUser', {
                    Username: username,
                    FirstName: values.FirstName,
                    LastName: values.LastName,
                    DateOfBirth: values.DateOfBirth,
                    EmailAddress: values.EmailAddress,
                    PhoneNo: values.PhoneNo,
                    NIC: values.NIC,
                    ProfilePicture: profilePicture,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            if (response.status === 200) {
                setSuccessDialogMessage('User details updated successfully');
                onSuccessDialogOpen();
            } else {
                throw new Error('Failed to update User details');
            }
        } catch (error) {
            console.error('Error updating User details:', error);
            setDialogMessage(error.message || 'Failed to update User details');
            onDialogOpen();
        }
    };


    const handleRemoveImage = async () => {
        setIsImageRemoved(true);
        setImage("");
    };


    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/Dashboard');
    };

    const handleCancel = () => {
        navigate('/app/Dashboard');
    };

    return (
        <>
            <Text fontSize="4xl" color="#393970" mb="7" fontFamily="sans-serif">
                User Profile
            </Text>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    FirstName: userData.FirstName ?? "",
                    LastName: userData.LastName ?? "",
                    DateOfBirth: userData.DateOfBirth ?? "",
                    EmailAddress: userData.EmailAddress ?? "",
                    PhoneNo: userData.PhoneNo ?? "",
                    NIC: userData.NIC ?? "",
                    ProfilePicture: userData.profilePicture ?? "",
                }}
                onSubmit={handleSubmit}
            >
                {({errors, touched}) => (
                    <Form>
                        <div className="flex flex-grow gap-6">
                            <div className="w-1/5">

                                <AvatarGroup size="2xl" mb="4" mt="8" ml="12">
                                    {image ? (
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "inline-block",
                                                cursor: "pointer",
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.firstChild.nextSibling.style.opacity = 0.5}
                                            onMouseLeave={(e) => e.currentTarget.firstChild.nextSibling.style.opacity = 0}
                                            onClick={handleAvatarClick}
                                        >
                                            <Avatar
                                                src={`data:image/jpeg;base64,${image}`}
                                                cursor="pointer"
                                            />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                    opacity: 0,
                                                    transition: "opacity 0.5s ease",
                                                }}
                                            >
                                                <AiOutlineCamera size={24} />
                                            </div>
                                        </div>
                                    ) : (
                                        <Avatar
                                            size="lg"
                                            bg={theme.purple}
                                            icon={<AiOutlineUser fontSize='2rem' />}
                                            onClick={handleAvatarClick}
                                        />
                                    )}
                                </AvatarGroup>


                                {/*<AvatarGroup size="2xl" mb="4" mt="8" ml="12">*/}
                                {/*    {image ? (*/}
                                {/*        <div*/}
                                {/*            style={{*/}
                                {/*                position: "relative",*/}
                                {/*                display: "inline-block",*/}
                                {/*                cursor: "pointer",*/}
                                {/*            }}*/}
                                {/*            onMouseEnter={(e) => e.currentTarget.firstChild.style.opacity = 0.5}*/}
                                {/*            onMouseLeave={(e) => e.currentTarget.firstChild.style.opacity = 1}*/}
                                {/*            onClick={handleAvatarClick}*/}
                                {/*        >*/}
                                {/*            <Avatar*/}
                                {/*                src={`data:image/jpeg;base64,${image}`}*/}
                                {/*                cursor="pointer"*/}
                                {/*            />*/}
                                {/*            <div*/}
                                {/*                style={{*/}
                                {/*                    position: "absolute",*/}
                                {/*                    top: "50%",*/}
                                {/*                    left: "50%",*/}
                                {/*                    transform: "translate(-50%, -50%)",*/}
                                {/*                    opacity: 0,*/}
                                {/*                    transition: "opacity 0.3s ease",*/}
                                {/*                }}*/}
                                {/*            >*/}
                                {/*                <AiOutlineCamera size={24} />*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    ) : (*/}
                                {/*        <Avatar*/}
                                {/*            bg={theme.purple}*/}
                                {/*            icon={<AiOutlineUser fontSize='2rem' />}*/}
                                {/*            onClick={handleAvatarClick}*/}
                                {/*        />*/}
                                {/*    )}*/}
                                {/*</AvatarGroup>*/}

                                {/*<AvatarGroup size="2xl" mb="4" mt="8" ml="12">*/}
                                {/*    {image ? (*/}
                                {/*        <Avatar*/}
                                {/*            src={`data:image/jpeg;base64,${image}`}*/}
                                {/*            cursor="pointer"*/}
                                {/*            onClick={handleAvatarClick}*/}
                                {/*        />*/}
                                {/*    ):(*/}
                                {/*        <Avatar bg={theme.purple} icon={<AiOutlineUser fontSize='2rem' />} onClick={handleAvatarClick}/>*/}
                                {/*    )}*/}
                                {/*</AvatarGroup>*/}
                                <Input
                                    ref={fileInputRef}
                                    id="profilePicture"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{display: 'none'}}
                                />
                                {image && (
                                    <div className="flex justify-right">
                                        <Button
                                            mt="2"
                                            ml="6"
                                            size="sm"
                                            color={theme.purple}
                                            variant='link'
                                            w="180px"
                                            onClick={handleRemoveImage}
                                        >
                                            Remove Profile Image
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="w-4/5 flex flex-col">
                                <div className="flex gap-8 mt-6">
                                    <div className="w-2/5">
                                        <div>
                                            <p style={{marginBottom: "0.5rem"}}>First Name</p>
                                            <Field name="FirstName" validate={(value) => {
                                                let error;
                                                if (!value) {
                                                    error = "FirstName is required.";
                                                }
                                                return error;
                                            }}>
                                                {({field}) => (
                                                    <div>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            variant="filled"
                                                            borderRadius="md"
                                                            px={3}
                                                            py={2}
                                                            mt={1}
                                                            mb={3}
                                                            width="500px"
                                                            id="FirstName"
                                                            placeholder="First Name"
                                                        />
                                                        {errors.FirstName && touched.FirstName && (
                                                            <div className="text-red-500">{errors.FirstName}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: "0.5rem"}}>Date of Birth</p>
                                            <Field style={{margintop: "0.5rem"}} name="DateOfBirth"
                                                   validate={(value) => {
                                                       let error;
                                                       if (!value) {
                                                           error = "Date of Birth is required.";
                                                       }
                                                       return error;
                                                   }}>
                                                {({field}) => (
                                                    <div>
                                                        <Input
                                                            {...field}
                                                            type="datetime-local"
                                                            variant="filled"
                                                            borderRadius="md"
                                                            px={3}
                                                            py={2}
                                                            mt={1}
                                                            mb={3}
                                                            width="500px"
                                                            id="DateofBirth"
                                                            placeholder="Date of Birth"
                                                        />
                                                        {errors.DateOfBirth && touched.DateOfBirth && (
                                                            <div className="text-red-500">{errors.DateOfBirth}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: "0.5rem"}}>Phone Number</p>
                                            <Field name="PhoneNo" validate={(value) => {
                                                let error;
                                                if (!value) {
                                                    error = "Phone No is required.";
                                                }
                                                return error;
                                            }}>
                                                {({field}) => (
                                                    <div>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            variant="filled"
                                                            borderRadius="md"
                                                            px={3}
                                                            py={2}
                                                            mt={1}
                                                            mb={3}
                                                            width="500px"
                                                            id="PhoneNo"
                                                            placeholder="Phone No"
                                                        />
                                                        {errors.PhoneNo && touched.PhoneNo && (
                                                            <div className="text-red-500">{errors.PhoneNo}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="w-2/5">
                                        <div>
                                            <p style={{marginBottom: "0.5rem"}}>Last Name</p>
                                            <Field name="LastName" validate={(value) => {
                                                let error;
                                                if (!value) {
                                                    error = "Last Name is required.";
                                                }
                                                return error;
                                            }}>
                                                {({field}) => (
                                                    <div>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            variant="filled"
                                                            borderRadius="md"
                                                            px={3}
                                                            py={2}
                                                            mt={1}
                                                            mb={3}
                                                            width="500px"
                                                            id="LastName"
                                                            placeholder="Last Name"
                                                        />
                                                        {errors.LastName && touched.LastName && (
                                                            <div className="text-red-500">{errors.LastName}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: "0.5rem"}}>Email Address</p>
                                            <Field name="EmailAddress" validate={(value) => {
                                                let error;
                                                if (!value) {
                                                    error = "Last Name is required.";
                                                }
                                                return error;
                                            }}>
                                                {({field}) => (
                                                    <div>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            variant="filled"
                                                            borderRadius="md"
                                                            px={3}
                                                            py={2}
                                                            mt={1}
                                                            mb={3}
                                                            width="500px"
                                                            id="EmailAddress"
                                                            placeholder="Email Address"
                                                        />
                                                        {errors.EmailAddress && touched.EmailAddress && (
                                                            <div className="text-red-500">{errors.EmailAddress}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: "0.5rem"}}>NIC</p>
                                            <Field name="NIC" validate={(value) => {
                                                let error;
                                                if (!value) {
                                                    error = "NIC is required.";
                                                }
                                                return error;
                                            }}>
                                                {({field}) => (
                                                    <div>
                                                        <Input
                                                            {...field}
                                                            type="text"
                                                            variant="filled"
                                                            borderRadius="md"
                                                            px={3}
                                                            py={2}
                                                            mt={1}
                                                            mb={3}
                                                            width="500px"
                                                            id="NIC"
                                                            placeholder="NIC"
                                                        />
                                                        {errors.NIC && touched.NIC && (
                                                            <div className="text-red-500">{errors.NIC}</div>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-5/6 flex justify-end gap-6 mt-10">
                                    <Button
                                        bg="gray.400"
                                        _hover={{bg: "gray.500"}}
                                        color="#ffffff"
                                        variant="solid"
                                        w="210px"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        bg={theme.purple}
                                        _hover={{bg: theme.onHoverPurple}}
                                        color="#ffffff"
                                        variant="solid"
                                        w="210px"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <AlertDialog isOpen={isDialogOpen} onClose={onDialogClose} motionPreset="slideInBottom">
                <AlertDialogOverlay/>
                <AlertDialogContent
                    position="absolute"
                    top="30%"
                    left="50%"
                    transform="translate(-50%, -50%)">
                    <AlertDialogHeader>Error</AlertDialogHeader>
                    <AlertDialogBody>
                        {dialogMessage}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg={theme.purple} color="#FFFFFF" onClick={onDialogClose}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog isOpen={isSuccessDialogOpen} onClose={onSuccessDialogClose} motionPreset="slideInBottom">
                <AlertDialogOverlay/>
                <AlertDialogContent
                    position="absolute"
                    top="30%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                >
                    <AlertDialogHeader>Success</AlertDialogHeader>
                    <AlertDialogBody>
                        {successDialogMessage}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg={theme.purple} color="#FFFFFF" onClick={handleSuccessDialogClose}>Ok</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
