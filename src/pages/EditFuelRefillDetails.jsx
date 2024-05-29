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
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function EditFuelRefillDetails() {
    const navigate = useNavigate();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [ setNIC] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [vehicleRegNoDetails, setVehicleRegNoDetails] = useState([]);

    const exampleVehicleData = [
        { VehicleId: 2, VehicleRegistrationNo: "DEF789" },
        { VehicleId: 1, VehicleRegistrationNo: "ABC123" },
    ];

    const fetchVehicleRegNos = async () => {
        setVehicleRegNoDetails(exampleVehicleData);
    };

    const fetchUser = async (setFieldValue) => {
        const exampleUser = { nic: "123456789V" };
        setNIC(exampleUser.nic);
        setFieldValue("nic", exampleUser.nic);
    };

    useEffect(() => {
        fetchVehicleRegNos();
    }, []);

    const handleSubmit = async () => {
        const dummyResponse = { ok: true, message: "Fuel Refill edited successfully" };

        if (!dummyResponse.ok) {
            throw new Error(dummyResponse.message || 'Failed to edit Fuel Refill.');
        }

        if (dummyResponse.message && dummyResponse.message.toLowerCase().includes('exist')) {
            setDialogMessage('Fuel Refill editing failed');
            onDialogOpen();
        } else {
            setSuccessDialogMessage('Fuel Refill edited successfully');
            onSuccessDialogOpen();
        }
    };

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
        { label: "Edit Fuel Refill Details", link: "/app/EditFuelRefillDetails" },
    ];

    return (
        <>
            <PageHeader title="Edit Fuel Refill Details" breadcrumbs={breadcrumbs} />
            <Formik
                initialValues={{
                    vehicleRegistrationNo: "",
                    nic: "",
                    literCount: "",
                    date: "",
                    time: "",
                    fType: "",
                    cost: "",
                    IsActive: false
                }}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting, setFieldValue }) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
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

            <AlertDialog isOpen={isSuccessDialogOpen} onClose={onSuccessDialogClose} motionPreset="slideInBottom">
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
