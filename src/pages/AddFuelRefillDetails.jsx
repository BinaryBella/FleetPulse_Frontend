import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Checkbox,
    Input,
    useDisclosure,
    Select
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function AddFuelRefillDetails() {
    const navigate = useNavigate();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [vehicleRegNoDetails, setVehicleRegNoDetails] = useState([]);

    const exampleVehicleData = [
        { VehicleId: 2, VehicleRegistrationNo: "DEF456" },
        { VehicleId: 1, VehicleRegistrationNo: "ABC123" },
    ];

    const fetchVehicleRegNos = async () => {
        setVehicleRegNoDetails(exampleVehicleData);
        // Uncomment and update the following lines with the actual API endpoint
        // try {
        //     const response = await axios.get("https://localhost:7265/api/Vehicle");
        //     setVehicleRegNoDetails(response.data);
        // } catch (error) {
        //     console.error("Error fetching vehicle registration numbers:", error);
        // }
    };

    const fetchUser = async (setFieldValue) => {
        try {
            const username = sessionStorage.getItem("Username");
            if (username) {
                const response = await axios.get(`https://localhost:7265/api/Auth/userProfile?username=${username}`);
                const responseData = response.data;
                setFieldValue("nic", responseData.nic);
                setFieldValue("userId", responseData.userId); // Assuming the user profile response contains userId
            } else {
                console.error("Username not found in session storage.");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };

    useEffect(() => {
        fetchVehicleRegNos();
    }, []);

    const handleCancel = () => {
        navigate('/app/FuelRefillTable');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/FuelRefillTable');
    };

    const breadcrumbs = [
        { label: "Vehicle", link: "/app/Vehicle" },
        { label: "Fuel Refill", link: "/app/FuelRefillTable" },
        { label: "Add Fuel Refill Details", link: "/app/AddFuelRefillDetails" },
    ];

    return (
        <>
            <PageHeader title="Add Fuel Refill Details" breadcrumbs={breadcrumbs} />
            <Formik
                initialValues={{
                    vehicleRegistrationNo: "",
                    userId: "",
                    nic: "",
                    literCount: "",
                    date: "",
                    time: "",
                    fType: "",
                    cost: "",
                    IsActive: false
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const selectedVehicle = vehicleRegNoDetails.find(
                        (vehicle) => vehicle.VehicleId === parseInt(values.vehicleRegistrationNo)
                    );

                    if (!selectedVehicle) {
                        setDialogMessage("Invalid vehicle selected.");
                        onDialogOpen();
                        setSubmitting(false);
                        return;
                    }

                    try {
                        const response = await fetch('https://localhost:7265/api/FuelRefill', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                VehicleId: selectedVehicle.VehicleId,
                                VehicleRegistrationNo: selectedVehicle.VehicleRegistrationNo,
                                UserId: values.userId,
                                NIC: values.nic,
                                Cost: values.cost,
                                LiterCount: values.literCount,
                                Date: values.date,
                                Time: values.time,
                                RefillType: values.fType,
                                Status: values.IsActive
                            })
                        });

                        const data = await response.json();

                        if (!response.ok) {
                            throw new Error(data.message || 'Failed to add Fuel Refill.');
                        }

                        if (data.message && data.message.toLowerCase().includes('exist')) {
                            setDialogMessage('Fuel Refill already exists');
                            onDialogOpen();
                        } else {
                            setSuccessDialogMessage('Fuel Refill added successfully');
                            onSuccessDialogOpen();
                        }
                    } catch (error) {
                        if (error instanceof TypeError) {
                            setDialogMessage('Failed to connect to the server');
                        } else {
                            setDialogMessage(error.message || 'Failed to add Fuel Refill.');
                        }
                        onDialogOpen();
                    }
                    setSubmitting(false);
                }}
            >
                {({ errors, touched, isSubmitting, setFieldValue }) => {
                    useEffect(() => {
                        fetchUser(setFieldValue);
                    }, [setFieldValue]);

                    return (
                        <Form className="grid grid-cols-2 gap-10 mt-8">
                            <div className="flex flex-col gap-3">
                                <p>User NIC</p>
                                <Field name="nic" validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "NIC is required.";
                                    } else if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(value)) {
                                        error = "Invalid NIC format.";
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
                                                id="nic"
                                                placeholder="NIC"
                                            />
                                            {errors.nic && touched.nic && (
                                                <div className="text-red-500">{errors.nic}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Vehicle Registration No</p>
                                <Field name="vehicleRegistrationNo" validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "Vehicle Registration No is required.";
                                    }
                                    return error;
                                }}>
                                    {({ field }) => (
                                        <div>
                                            <Select
                                                {...field}
                                                placeholder='Vehicle Registration No'
                                                size='md'
                                                variant='filled'
                                                borderRadius="md"
                                                px={3}
                                                py={2}
                                                mt={1}
                                                width="500px"
                                            >
                                                {vehicleRegNoDetails.map((option, index) => (
                                                    <option key={index} value={option.VehicleId}>
                                                        {option.VehicleRegistrationNo}
                                                    </option>
                                                ))}
                                            </Select>
                                            {errors.vehicleRegistrationNo && touched.vehicleRegistrationNo && (
                                                <div className="text-red-500">{errors.vehicleRegistrationNo}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Liter Count</p>
                                <Field name="literCount" validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "Liter Count is required.";
                                    }
                                    return error;
                                }}>
                                    {({ field }) => (
                                        <div>
                                            <Input
                                                {...field}
                                                type="number"
                                                variant="filled"
                                                borderRadius="md"
                                                px={3}
                                                py={2}
                                                mt={1}
                                                width="500px"
                                                id="literCount"
                                                placeholder="Liter Count"
                                            />
                                            {errors.literCount && touched.literCount && (
                                                <div className="text-red-500">{errors.literCount}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Date</p>
                                <Field name="date" validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "Date is required.";
                                    }
                                    return error;
                                }}>
                                    {({ field }) => (
                                        <div>
                                            <Input
                                                {...field}
                                                type="date"
                                                variant="filled"
                                                borderRadius="md"
                                                px={3}
                                                py={2}
                                                mt={1}
                                                width="500px"
                                                id="date"
                                                placeholder="Date"
                                            />
                                            {errors.date && touched.date && (
                                                <div className="text-red-500">{errors.date}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Time</p>
                                <Field name="time" validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "Time is required.";
                                    }
                                    return error;
                                }}>
                                    {({ field }) => (
                                        <div>
                                            <Input
                                                {...field}
                                                type="time"
                                                variant="filled"
                                                borderRadius="md"
                                                px={3}
                                                py={2}
                                                mt={1}
                                                width="500px"
                                                id="time"
                                                placeholder="Time"
                                            />
                                            {errors.time && touched.time && (
                                                <div className="text-red-500">{errors.time}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Refill Type</p>
                                <Field name="fType" validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "Refill Type is required.";
                                    }
                                    return error;
                                }}>
                                    {({ field }) => (
                                        <div>
                                            <Select
                                                {...field}
                                                placeholder='Refill Type'
                                                size='md'
                                                variant='filled'
                                                borderRadius="md"
                                                px={3}
                                                py={2}
                                                mt={1}
                                                width="500px"
                                            >
                                                <option value="In station">In station</option>
                                                <option value="Out station">Out station</option>
                                            </Select>
                                            {errors.fType && touched.fType && (
                                                <div className="text-red-500">{errors.fType}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Cost</p>
                                <Field name="cost" validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "Cost is required.";
                                    }
                                    return error;
                                }}>
                                    {({ field }) => (
                                        <div>
                                            <Input
                                                {...field}
                                                type="number"
                                                variant="filled"
                                                borderRadius="md"
                                                px={3}
                                                py={2}
                                                mt={1}
                                                width="500px"
                                                id="cost"
                                                placeholder="Cost"
                                            />
                                            {errors.cost && touched.cost && (
                                                <div className="text-red-500">{errors.cost}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Status</p>
                                <Field name="IsActive" type="checkbox">
                                    {({ field }) => (
                                        <Checkbox
                                            {...field}
                                            colorScheme={theme.colors.brand}
                                            size="lg"
                                            mt={1}
                                        >
                                            Active
                                        </Checkbox>
                                    )}
                                </Field>
                            </div>
                            <div></div>
                            <div className="flex gap-10">
                                <Button
                                    bg="gray.400"
                                    _hover={{ bg: "gray.500" }}
                                    color="#ffffff"
                                    variant="solid"
                                    w="230px"
                                    marginTop="10"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </Form>
                    );
                }}
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

            <AlertDialog isOpen={isSuccessDialogOpen} onClose={handleSuccessDialogClose} motionPreset="slideInBottom">
                <AlertDialogOverlay />
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
