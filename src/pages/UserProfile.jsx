import {useState, useRef, useEffect} from 'react';
import {
    Text,
    Input,
    Button,
    Avatar,
    AvatarGroup,
    Checkbox,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure
} from "@chakra-ui/react";
import {AiOutlineUser} from "react-icons/ai";
import theme from "../config/ThemeConfig.jsx";
import {Formik, Form, Field} from "formik";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
    const navigate = useNavigate();
    const {isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose} = useDisclosure();
    const {isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose} = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [userDetails, setUserDetails] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/Auth/chathuk");
            setUserDetails(response.data);
            console.log(setUserDetails);
        } catch (error) {
            console.error("Error fetching User details:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const [userData, setUserData] = useState({
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        EmailAddress: "",
        PhoneNo: "",
        NIC: "",
        EmergencyContact: "",
        profileImage: "",
        DriverLicenseNo: "",
        LicenseExpiryDate: "",
        BloodGroup: "",
        JobTitle: "",
        isActive: ""
    });

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserData((prevData) => ({
            ...prevData,
            profileImage: file
        }));
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('https://localhost:7265/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add User Details');
            }

            if (data.message && data.message.toLowerCase().includes('exist')) {
                setDialogMessage('User Details already exists');
                onDialogOpen();
            } else {
                setSuccessDialogMessage('User Details added successfully');
                onSuccessDialogOpen();
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setDialogMessage('Failed to connect to the server');
            } else {
                setDialogMessage(error.message || 'Failed to add User details');
            }
            onDialogOpen();
        }
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
                initialValues={{
                    FirstName: "",
                    LastName: "",
                    DateOfBirth: "",
                    EmailAddress: "",
                    PhoneNo: "",
                    NIC: "",
                    profileImage: "",
                    isActive: ""
                }}
                onSubmit={handleSubmit}
            >
                {({errors, touched}) => (
                    <Form>
                        <div className="flex flex-grow gap-6">
                            <div className="w-1/5">
                                <AvatarGroup size="2xl" mb="4" mt="8" ml="12">
                                    <Avatar
                                        bg="#393970"
                                        icon={<AiOutlineUser/>}
                                        cursor="pointer"
                                        onClick={handleAvatarClick}
                                    >
                                    </Avatar>
                                </AvatarGroup>
                                <Input
                                    ref={fileInputRef}
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{display: 'none'}}
                                />
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
                                                            type="date"
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
                                        <Field name="isActive">
                                            {({field, form}) => (
                                                <Checkbox
                                                    {...field}
                                                    size='lg'
                                                    defaultChecked={field.value}
                                                    className="mt-8"
                                                    onChange={e => form.setFieldValue(field.name, e.target.checked)}
                                                >
                                                    Is Active
                                                </Checkbox>
                                            )}
                                        </Field>
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
