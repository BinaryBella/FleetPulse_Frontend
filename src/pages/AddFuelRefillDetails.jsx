import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Input,
    AlertDialog,
    useDisclosure,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader, AlertDialogBody, AlertDialogFooter
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function AddFuelRefillDetails() {
    const navigate = useNavigate();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Mock API call
            console.log("Form submitted:", values);

            // Display success dialog
            setSuccessDialogMessage('Fuel Refill added successfully.');
            onSuccessDialogOpen();
        } catch (error) {
            // Handle error
            console.error("Error:", error);
            setDialogMessage(error.message || 'Failed to add fuel refill.');
            onDialogOpen();
        } finally {
            setSubmitting(false);
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
        {label: "Vehicle", link: "/app/Vehicle"},
        {label: "Fuel Refill", link: "/app/FuelRefillTable"},
        {label: "Add Fuel Refill Details", link: "/app/AddFuelRefillDetails"},
    ];

    return (
        <>
            <PageHeader title="Add Fuel Refill Details" breadcrumbs={breadcrumbs}/>
            <Formik
                initialValues={{
                    VehicleRegistrationNo: "",
                    LiterCount: "",
                    DateTime: "",
                    RefillType: "",
                    Cost: "",
                    IsActive: false
                }}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="grid grid-cols-2 gap-10 mt-8">
                        <div className="flex flex-col gap-3">
                            <p>Vehicle Registration No</p>
                            <Field name="VehicleRegistrationNo" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Vehicle Registration No is required.";
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
                                            id="VehicleRegistrationNo"
                                            placeholder="Vehicle Registration No"
                                        />
                                        {errors.VehicleRegistrationNo && touched.VehicleRegistrationNo && (
                                            <div className="text-red-500">{errors.VehicleRegistrationNo}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <p>Liter Count</p>
                            <Field name="LiterCount" validate={(value) => {
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
                                            id="LiterCount"
                                            placeholder="Liter Count"
                                        />
                                        {errors.LiterCount && touched.LiterCount && (
                                            <div className="text-red-500">{errors.LiterCount}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <p>Date & Time</p>
                            <Field name="DateTime" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Date & Time is required.";
                                }
                                return error;
                            }}>
                                {({ field }) => (
                                    <div>
                                        <Input
                                            {...field}
                                            type="datetime-local"
                                            variant="filled"
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                            id="DateTime"
                                            placeholder="Date & Time"
                                        />
                                        {errors.DateTime && touched.DateTime && (
                                            <div className="text-red-500">{errors.DateTime}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <p>Refill Type</p>
                            <Field name="RefillType" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Refill Type is required.";
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
                                            id="RefillType"
                                            placeholder="Refill Type"
                                        />
                                        {errors.RefillType && touched.RefillType && (
                                            <div className="text-red-500">{errors.RefillType}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <p>Cost</p>
                            <Field name="Cost" validate={(value) => {
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
                                            id="Cost"
                                            placeholder="Cost"
                                        />
                                        {errors.Cost && touched.Cost && (
                                            <div className="text-red-500">{errors.Cost}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <div className="flex flex-col gap-3">
                                <Field type="checkbox" name="IsActive">
                                    {({ field }) => (
                                        <label>
                                            <input type="checkbox" {...field} />
                                            <span>Is Active</span>
                                        </label>
                                    )}
                                </Field>
                            </div>
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
