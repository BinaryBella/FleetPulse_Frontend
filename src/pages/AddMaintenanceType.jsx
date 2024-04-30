import { useState } from "react";
import { Formik, Form, Field } from "formik";
import PageHeader from "../components/PageHeader.jsx";
import { Button, Checkbox, Input, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure } from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

export default function AddMaintenanceType() {
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");

    const breadcrumbs = [
        {label: 'Vehicle', link: '/'},
        {label: 'Vehicle Maintenance Details', link: '/'},
        {label: 'Add Maintenance Type Details', link: '/'}
    ];

    const handleSubmit = async (values) => {
        try {
            console.log(values.TypeName, values.isActive);
            const response = await fetch('https://localhost:7265/api/VehicleMaintenanceType', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    TypeName: values.TypeName,
                    status: values.isActive
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add maintenance type');
            }

            if (data.message && data.message.toLowerCase().includes('exist')) {
                setDialogMessage('Vehicle Maintenance Type already exists');
                onDialogOpen();
            } else {
                setSuccessDialogMessage('Maintenance type added successfully');
                onSuccessDialogOpen();
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setDialogMessage('Failed to connect to the server');
            } else {
                setDialogMessage(error.message || 'Failed to add maintenance type');
            }
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        console.log("Cancelled");
    };

    return (
        <>
            <PageHeader title="Add Vehicle Maintenance Type Details" breadcrumbs={breadcrumbs}/>
            <Formik
                initialValues={{
                    TypeName:"",
                    isActive: ""
                }}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="grid grid-cols-2 gap-10 mt-8">
                        <div className="flex flex-col gap-3">
                            <p>Vehicle Maintenance Type</p>
                            <Field name="TypeName" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Maintenance type is Required";
                                }
                                return error;
                            }}>
                                {({ field}) => (
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
                                            id="TypeName"
                                            placeholder="Enter Vehicle Maintenance Type"
                                        />
                                        {errors.TypeName && touched.TypeName && (
                                            <div className="text-red-500">{errors.TypeName}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <Field name="isActive">
                                {({ field, form }) => (
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

                            <div className="flex gap-10">
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
                        <Button bg={theme.purple} color="#FFFFFF" onClick={onSuccessDialogClose}>Ok</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
