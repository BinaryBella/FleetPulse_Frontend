import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
    Button, Checkbox, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

export default function AddTripDetails() {
    const navigate = useNavigate();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");

    const breadcrumbs = [
        { label: 'Trip', link: '/' },
        { label: 'Trip Details', link: '/app/TripDetails' },
        { label: 'Add Trip Details', link: '/app/AddTripDetails' }
    ];

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('https://localhost:7265/api/TripDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    VehicleRegNo: values.VehicleRegNo,
                    DriverNIC: values.DriverNIC,
                    HelperNIC: values.HelperNIC,
                    Date: values.Date,
                    StartTime: values.StartTime,
                    EndTime: values.EndTime,
                    StartLocation: values.StartLocation,
                    EndLocation: values.EndLocation,
                    StartMeterValue: values.StartMeterValue,
                    EndMeterValue: values.EndMeterValue,
                    IsActive: values.IsActive
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add trip details.');
            }

            setSuccessDialogMessage('Trip details added successfully.');
            onSuccessDialogOpen();
        } catch (error) {
            setDialogMessage(error.message || 'Failed to add trip details.');
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
            <PageHeader title="Add Trip Details" breadcrumbs={breadcrumbs} />
            <Formik
                initialValues={{
                    VehicleRegNo: "",
                    DriverNIC: "",
                    HelperNIC: "",
                    Date: "",
                    StartTime: "",
                    EndTime: "",
                    StartLocation: "",
                    EndLocation: "",
                    StartMeterValue: 0,
                    EndMeterValue: 0,
                    IsActive: true
                }}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="grid grid-cols-2 gap-10 mt-8">
                        <div className="flex flex-col gap-3">
                            <p>Vehicle Registration No</p>
                            <Field name="VehicleRegNo" validate={(value) => {
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
                                        {errors.VehicleRegNo && touched.VehicleRegNo && (
                                            <div className="text-red-500">{errors.VehicleRegNo}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Driver's NIC</p>
                            <Field name="DriverNIC" validate={(value) => {
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
                                        {errors.DriverNIC && touched.DriverNIC && (
                                            <div className="text-red-500">{errors.DriverNIC}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Helper's NIC</p>
                            <Field name="HelperNIC" validate={(value) => {
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
                                        {errors.HelperNIC && touched.HelperNIC && (
                                            <div className="text-red-500">{errors.HelperNIC}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Date</p>
                            <Field name="Date" validate={(value) => {
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
                                        {errors.Date && touched.Date && (
                                            <div className="text-red-500">{errors.Date}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Start Time</p>
                            <Field name="StartTime" validate={(value) => {
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
                                        {errors.StartTime && touched.StartTime && (
                                            <div className="text-red-500">{errors.StartTime}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>End Time</p>
                            <Field name="EndTime" validate={(value) => {
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
                                        {errors.EndTime && touched.EndTime && (
                                            <div className="text-red-500">{errors.EndTime}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Start Location</p>
                            <Field name="StartLocation" validate={(value) => {
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
                                        {errors.StartLocation && touched.StartLocation && (
                                            <div className="text-red-500">{errors.StartLocation}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>End Location</p>
                            <Field name="EndLocation" validate={(value) => {
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
                                        {errors.EndLocation && touched.EndLocation && (
                                            <div className="text-red-500">{errors.EndLocation}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Start Meter Value</p>
                            <Field name="StartMeterValue" validate={(value) => {
                                let error;
                                if (value < 0) {
                                    error = "Start meter value must be 0 or greater.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <NumberInput
                                        {...field}
                                        variant="filled"
                                        defaultValue={0}
                                        min={0}
                                        width="500px"
                                        mt={1}
                                    >
                                        <NumberInputField
                                            {...field}
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            placeholder="00.00"
                                            step={0.01}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>End Meter Value</p>
                            <Field name="EndMeterValue" validate={(value) => {
                                let error;
                                if (value < 0) {
                                    error = "End meter value must be 0 or greater.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <NumberInput
                                        {...field}
                                        variant="filled"
                                        defaultValue={0}
                                        min={0}
                                        width="500px"
                                        mt={1}
                                    >
                                        <NumberInputField
                                            {...field}
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            placeholder="00.00"
                                            step={0.01}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Field name="IsActive" type="checkbox">
                                {({ field }) => (
                                    <Checkbox
                                        {...field}
                                        size="lg"
                                        defaultChecked={field.value}
                                        className="mt-8"
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
                    transform="translate(-50%, -50%)"
                >
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
