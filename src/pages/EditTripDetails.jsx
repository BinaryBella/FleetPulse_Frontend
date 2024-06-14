import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
    Button,
    Checkbox,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

export default function EditTripDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [initialValues, setInitialValues] = useState({
        vehicleRegistrationNo: "",
        driverNic: "",
        helperNic: "",
        date: "",
        startTime: "",
        endTime: "",
        startLocation: "",
        endLocation: "",
        startMeterValue: 0,
        endMeterValue: 0,
        isActive: false
    });

    useEffect(() => {
        fetchTripDetails(id);
    }, [id]);

    const fetchTripDetails = async (id) => {
        try {
            const response = await fetch(`https://localhost:7265/api/TripDetails/${id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch trip details.');
            }

            setInitialValues({
                vehicleRegistrationNo: data.vehicleRegistrationNo || "",
                driverNic: data.driverNic || "",
                helperNic: data.helperNic || "",
                date: data.date || "",
                startTime: data.startTime || "",
                endTime: data.endTime || "",
                startLocation: data.startLocation || "",
                endLocation: data.endLocation || "",
                startMeterValue: data.startMeterValue || 0,
                endMeterValue: data.endMeterValue || 0,
                isActive: data.isActive || false
            });
        } catch (error) {
            setDialogMessage(error.message || 'Failed to fetch trip details.');
            onDialogOpen();
        }
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`https://localhost:7265/api/TripDetails/UpdateTripDetails`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: id,
                    ...values
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update trip details.');
            }

            setSuccessDialogMessage('Trip details updated successfully.');
            onSuccessDialogOpen();
        } catch (error) {
            setDialogMessage(error.message || 'Failed to update trip details.');
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        navigate('/app/TripDetails');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/TripDetails');
    };

    return (
        <>
            <PageHeader title="Edit Trip Details" breadcrumbs={[
                { label: 'Trip', link: '/' },
                { label: 'Trip Details', link: '/' },
                { label: 'Edit Trip Details', link: '/' }
            ]} />
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form className="grid grid-cols-2 gap-10 mt-8">
                        <div className="flex flex-col gap-3">
                            <p>Vehicle Registration No</p>
                            <Field name="vehicleRegistrationNo" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Vehicle registration number is required.";
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
                                            placeholder="Vehicle Registration No"
                                        />
                                        {errors.vehicleRegistrationNo && touched.vehicleRegistrationNo && (
                                            <div className="text-red-500">{errors.vehicleRegistrationNo}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Driver's NIC</p>
                            <Field name="driverNic" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Driver's NIC is required.";
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
                                            placeholder="Driver's NIC"
                                        />
                                        {errors.driverNic && touched.driverNic && (
                                            <div className="text-red-500">{errors.driverNic}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Helper's NIC</p>
                            <Field name="helperNic" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Helper's NIC is required.";
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
                                            placeholder="Helper's NIC"
                                        />
                                        {errors.helperNic && touched.helperNic && (
                                            <div className="text-red-500">{errors.helperNic}</div>
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
                            <p>Start Time</p>
                            <Field name="startTime" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Start time is required.";
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
                                            placeholder="Start Time"
                                        />
                                        {errors.startTime && touched.startTime && (
                                            <div className="text-red-500">{errors.startTime}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>End Time</p>
                            <Field name="endTime" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "End time is required.";
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
                                            placeholder="End Time"
                                        />
                                        {errors.endTime && touched.endTime && (
                                            <div className="text-red-500">{errors.endTime}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Start Location</p>
                            <Field name="startLocation" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Start location is required.";
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
                                            placeholder="Start Location"
                                        />
                                        {errors.startLocation && touched.startLocation && (
                                            <div className="text-red-500">{errors.startLocation}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>End Location</p>
                            <Field name="endLocation" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "End location is required.";
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
                                            placeholder="End Location"
                                        />
                                        {errors.endLocation && touched.endLocation && (
                                            <div className="text-red-500">{errors.endLocation}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Start Meter Value</p>
                            <Field name="startMeterValue" validate={(value) => {
                                let error;
                                if (value < 0) {
                                    error = "Start meter value cannot be negative.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <div>
                                        <NumberInput
                                            {...field}
                                            variant="filled"
                                            min={0}
                                            width="500px"
                                            mt={1}
                                        >
                                            <NumberInputField
                                                {...field}
                                                variant="filled"
                                                borderRadius="md"
                                                px={3}
                                                py={2}
                                                mt={1}
                                                placeholder="Start Meter Value"
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        {errors.startMeterValue && touched.startMeterValue && (
                                            <div className="text-red-500">{errors.startMeterValue}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>End Meter Value</p>
                            <Field name="endMeterValue" validate={(value) => {
                                let error;
                                if (value < 0) {
                                    error = "End meter value cannot be negative.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <div>
                                        <NumberInput
                                            {...field}
                                            variant="filled"
                                            min={0}
                                            width="500px"
                                            mt={1}
                                        >
                                            <NumberInputField
                                                {...field}
                                                variant="filled"
                                                borderRadius="md"
                                                px={3}
                                                py={2}
                                                mt={1}
                                                placeholder="End Meter Value"
                                            />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                        {errors.endMeterValue && touched.endMeterValue && (
                                            <div className="text-red-500">{errors.endMeterValue}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Field name="isActive" type="checkbox">
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

            <AlertDialog isOpen={isSuccessDialogOpen} onClose={handleSuccessDialogClose} motionPreset="slideInBottom">
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
