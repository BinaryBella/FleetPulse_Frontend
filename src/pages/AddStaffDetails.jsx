import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
    Button,
    Checkbox,
    Input,
    Select,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import theme from "../config/ThemeConfig.jsx";

export default function AddStaffDetails() {
    const navigate = useNavigate();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        nationalId: "",
        email: "",
        contactNo: "",
        emergencyContactNo: "",
        jobTitle: "",
        username: "",
        password: "",
        confirmPassword: "",
        isActive: true, 
    });

    const breadcrumbs = [
        { label: 'Staff', link: '/' },
        { label: 'Staff Details', link: '/app/StaffDetails' },
        { label: 'Add Staff Details', link: '/app/AddStaffDetails' }
    ];

    useEffect(() => {
        // Simulated fetch function; replace with actual API call
        const fetchStaffData = async () => {
            setIsLoading(true);
            try {
                // Replace with your API endpoint
                const response = await fetch('https://api.example.com/staff-details'); // Example API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                // Set initial form values from fetched data
                setInitialValues({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dob: data.dob,
                    nationalId: data.nationalId,
                    email: data.email,
                    contactNo: data.contactNo,
                    emergencyContactNo: data.emergencyContactNo,
                    jobTitle: data.jobTitle,
                    username: data.username,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                    isActive: data.isActive,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error state or show an error message
            } finally {
                setIsLoading(false);
            }
        };

        
        fetchStaffData();
    }, []);

    const handleSubmit = async (values, actions) => {
        try {
            console.log(values); 
            
            await new Promise((resolve) => setTimeout(resolve, 1000));

            
            setDialogMessage("Staff details saved successfully.");
            onDialogOpen();

            
            actions.resetForm();
        } catch (error) {
            
            setDialogMessage("Failed to save staff details.");
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        navigate('/app/StaffDetails');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/StaffDetails');
    };


    return (
        <>
            <PageHeader title="Add Staff Details" breadcrumbs={breadcrumbs} />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="grid grid-cols-2 gap-10 mt-8">
                            <div className="flex flex-col gap-3">
                                <p>First Name</p>
                                <Field name="firstName">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="firstName"
                                            placeholder="First Name"
                                        />
                                    )}
                                </Field>
                                {errors.firstName && touched.firstName && (
                                    <div className="text-red-500">{errors.firstName}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Last Name</p>
                                <Field name="lastName">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="lastName"
                                            placeholder="Last Name"
                                        />
                                    )}
                                </Field>
                                {errors.lastName && touched.lastName && (
                                    <div className="text-red-500">{errors.lastName}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Date of Birth</p>
                                <Field name="dob">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="date"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="dob"
                                            placeholder="Date of Birth"
                                        />
                                    )}
                                </Field>
                                {errors.dob && touched.dob && (
                                    <div className="text-red-500">{errors.dob}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>National Identity Card No</p>
                                <Field name="nationalId">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="nationalId"
                                            placeholder="National Identity Card No"
                                        />
                                    )}
                                </Field>
                                {errors.nationalId && touched.nationalId && (
                                    <div className="text-red-500">{errors.nationalId}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Email Address</p>
                                <Field name="email">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="email"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="email"
                                            placeholder="Email Address"
                                        />
                                    )}
                                </Field>
                                {errors.email && touched.email && (
                                    <div className="text-red-500">{errors.email}</div>
                                )}
                            </div>
                           
                            <div className="flex flex-col gap-3">
                                <p>Contact Number</p>
                                <Field name="contactNo">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="tel"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="contactNo"
                                            placeholder="Contact Number"
                                        />
                                    )}
                                </Field>
                                {errors.contactNo && touched.contactNo && (
                                    <div className="text-red-500">{errors.contactNo}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Emergency Contact No</p>
                                <Field name="emergencyContactNo">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="tel"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="emergencyContactNo"
                                            placeholder="Emergency Contact No"
                                        />
                                    )}
                                </Field>
                                {errors.emergencyContactNo && touched.emergencyContactNo && (
                                    <div className="text-red-500">{errors.emergencyContactNo}</div>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <p>Job Title</p>
                                <Field name="jobTitle">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="tel"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="jobTitle"
                                            placeholder="Job Title"
                                        />
                                    )}
                                </Field>
                                {errors.jobTitle && touched.jobTitle && (
                                    <div className="text-red-500">{errors.jobTitle}</div>
                                )}
                            </div>
                            
                            <div className="flex flex-col gap-3">
                                <p>Username</p>
                                <Field name="username">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="text"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="username"
                                            placeholder="Username"
                                        />
                                    )}
                                </Field>
                                {errors.username && touched.username && (
                                    <div className="text-red-500">{errors.username}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Password</p>
                                <Field name="password">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="password"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="password"
                                            placeholder="Password"
                                        />
                                    )}
                                </Field>
                                {errors.password && touched.password && (
                                    <div className="text-red-500">{errors.password}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Confirm Password</p>
                                <Field name="confirmPassword">
                                    {({ field }) => (
                                        <Input
                                            {...field}
                                            type="password"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="confirmPassword"
                                            placeholder="Confirm Password"
                                        />
                                    )}
                                </Field>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <div className="text-red-500">{errors.confirmPassword}</div>
                                )}
                            </div>
                            {/* Checkbox for Is Active */}
                            <div className="flex flex-col gap-3">
                                <Checkbox name="isActive" size="lg" defaultChecked>
                                    Is Active
                                </Checkbox>
                            </div>
                            <div className="flex w-5/6 justify-end gap-10">
                                <Button
                                    bg="gray.400"
                                    _hover={{ bg: "gray.500" }}
                                    color="#ffffff"
                                    variant="solid"
                                    w="230px"
                                    marginTop="10"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    bg={theme.purple}
                                    _hover={{ bg: theme.onHoverPurple }}
                                    color="#ffffff"
                                    variant="solid"
                                    w="230px"
                                    marginTop="10"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}

            {/* Dialog for showing error message */}
            <AlertDialog isOpen={isDialogOpen} onClose={onDialogClose} motionPreset="slideInBottom">
                <AlertDialogOverlay />
                <AlertDialogContent position="absolute" top="30%" left="50%" transform="translate(-50%, -50%)">
                    <AlertDialogHeader>Error</AlertDialogHeader>
                    <AlertDialogBody>{dialogMessage}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg={theme.purple} color="#FFFFFF" onClick={onDialogClose}>
                            Close
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
