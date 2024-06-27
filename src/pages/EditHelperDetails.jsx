import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
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
    useDisclosure
} from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import theme from "../config/ThemeConfig.jsx";

export default function EditHelperDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        nationalId: "",
        email: "",
        contactNumber: "",
        emergencyContact: "",
        bloodGroup: "",
        userName: "",
        // password: "",
        // confirmPassword: "",
        isActive: false,
    });

    const breadcrumbs = [
        { label: 'Helper', link: '/' },
        { label: 'Helper Details', link: '/app/HelperDetails' },
        { label: 'Edit Helper Details', link: '/app/EditHelperDetails' }
    ];

    useEffect(() => {
        fetchHelperData(id);
    }, [id]);

    const fetchHelperData = async (id) => {
        try {
            const response = await fetch(`https://localhost:7265/api/Helper/${id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch helper data.');
            }

            setInitialValues({
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
                nationalId: data.nic || "",
                email: data.emailAddress || "",
                contactNumber: data.phoneNo || "",
                emergencyContact: data.emergencyContact || "",
                bloodGroup: data.bloodGroup || "",
                userName: data.userName || "",
                // password: "",
                // confirmPassword: "",
                isActive: data.status || false,
            });
        } catch (error) {
            setDialogMessage(error.message || 'Failed to fetch helper data.');
            onDialogOpen();
        }
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`https://localhost:7265/api/Helper/UpdateHelper`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserId: id,
                    FirstName: values.firstName,
                    LastName: values.lastName,
                    DateOfBirth: values.dateOfBirth,
                    NIC: values.nationalId,
                    EmailAddress: values.email,
                    PhoneNo: values.contactNumber,
                    EmergencyContact: values.emergencyContact,
                    BloodGroup: values.bloodGroup,
                    UserName: values.userName,
                    //Password: values.password,
                    Status: values.isActive,
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update helper details.');
            }

            setSuccessDialogMessage('Helper details updated successfully.');
            onSuccessDialogOpen();
        } catch (error) {
            setDialogMessage(error.message || 'Failed to update helper details.');
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        navigate('/app/HelperDetails');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/HelperDetails');
    };

    return (
        <>
            <PageHeader title="Edit Helper Details" breadcrumbs={breadcrumbs} />
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form className="grid grid-cols-2 gap-10 mt-8">
                        <div className="flex flex-col gap-3">
                            <p>First Name</p>
                            <Field name="firstName" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "First name is required.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <div>
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
                                            value={values.firstName}
                                        />
                                        {errors.firstName && touched.firstName && (
                                            <div className="text-red-500">{errors.firstName}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Last Name</p>
                            <Field name="lastName" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Last name is required.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <div>
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
                                            value={values.lastName}
                                        />
                                        {errors.lastName && touched.lastName && (
                                            <div className="text-red-500">{errors.lastName}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Date of Birth</p>
                            {/* <Field name="dateOfBirth">
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
                                        id="dateOfBirth"
                                        value={values.dateOfBirth}
                                    />
                                )}
                            </Field> */}
                            <Field name="dateOfBirth">
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
                                        id="dateOfBirth"
                                        value={values.dateOfBirth ? values.dateOfBirth.toISOString().substr(0, 10) : ''}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            setFieldValue('dateOfBirth', newValue ? new Date(newValue) : null);
                                        }}
                                    />
                                )}
                            </Field>
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
                                        value={values.nationalId}
                                        placeholder="National Identity Card No"
                                    />
                                )}
                            </Field>
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
                                        value={values.email}
                                        placeholder="Email Address"
                                    />
                                )}
                            </Field>
                        </div>
                       
                        <div className="flex flex-col gap-3">
                            <p>Contact Number</p>
                            <Field name="contactNumber">
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
                                        id="contactNumber"
                                        value={values.contactNumber}
                                        placeholder="Contact Number"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Emergency Contact No</p>
                            <Field name="emergencyContact">
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
                                        id="emergencyContact"
                                        value={values.emergencyContact}
                                        placeholder="Emergency Contact No"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Blood Group</p>
                            <Field name="bloodGroup">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder="Select Blood Group"
                                        variant="filled"
                                        borderRadius="md"
                                        width="500px"
                                        px={3}
                                        py={2}
                                        mt={1}
                                        icon={<MdArrowDropDown />}
                                        value={values.bloodGroup}
                                    >
                                        <option value="A+">A+</option>
                                        <option value="B+">B+</option>
                                        <option value="AB+">AB+</option>
                                        <option value="O+">O+</option>
                                        <option value="A-">A-</option>
                                        <option value="B-">B-</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O-">O-</option>
                                    </Select>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>User Name</p>
                            <Field name="userName" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "User name is required.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <div>
                                        <Input
                                            {...field}
                                            type="text"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="userName"
                                            placeholder="User Name"
                                            value={values.userName}
                                        />
                                        {errors.userName && touched.userName && (
                                            <div className="text-red-500">{errors.userName}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        {/* <div className="flex flex-col gap-3">
                            <p>Password</p>
                            <Field name="password" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Password is required.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <div>
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
                                            value={values.password}
                                        />
                                        {errors.password && touched.password && (
                                            <div className="text-red-500">{errors.password}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Confirm Password</p>
                            <Field name="confirmPassword" validate={(value) => {
                                let error;
                                if (value !== values.password) {
                                    error = "Passwords must match.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <div>
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
                                            value={values.confirmPassword}
                                        />
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <div className="text-red-500">{errors.confirmPassword}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div> */}
                        <div className="flex flex-col gap-3">
                            <Field name="isActive">
                                {({ field }) => (
                                    <Checkbox
                                        {...field}
                                        size="lg"
                                        isChecked={values.isActive}
                                        className="mt-8"
                                        onChange={e => setFieldValue('isActive', e.target.checked)}
                                    >
                                        Is Active
                                    </Checkbox>
                                )}
                            </Field>
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

            <AlertDialog isOpen={isDialogOpen} onClose={onDialogClose} motionPreset="slideInBottom">
                <AlertDialogOverlay />
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
                <AlertDialogOverlay />
                <AlertDialogContent
                    position="absolute"
                    top="30%"
                    left="50%"
                    transform="translate(-50%, -50%)">
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
