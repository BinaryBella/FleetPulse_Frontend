import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
    Button,
    Checkbox,
    Input,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    Spinner
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

export default function EditManufactureDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [initialValues, setInitialValues] = useState({ Manufacture: "", isActive: false });
    const [isLoading, setIsLoading] = useState(true);

    const breadcrumbs = [
        {label: 'Manufacturer', link: '/'},
        {label: 'Manufacturer Type', link: '/'},
        {label: 'Edit Manufacturer Type Details', link: '/'}
    ];

    useEffect(() => {
        fetchManufactureData(id);
    }, [id]);

    const fetchManufactureData = async (id) => {
        try {
            const response = await fetch(`https://localhost:7265/api/Manufacturer/${id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch manufacturer data.');
            }

            setInitialValues({
                Manufacture: data.manufacture || "",
                isActive: data.status || false
            });
        } catch (error) {
            setDialogMessage(error.message || 'Failed to fetch manufacturer data.');
            onDialogOpen();
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        try {
            const status = values.isActive ? true : false;

            const response = await fetch(`https://localhost:7265/api/Manufacture/UpdateManufacture`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: id,
                    Manufacture: values.Manufacture,
                    Status: status
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update manufacturer.');
            }

            setSuccessDialogMessage('Manufacturer updated successfully.');
            onSuccessDialogOpen();
        } catch (error) {
            setDialogMessage(error.message || 'Failed to update manufacturer.');
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        navigate('/app/ManufacturerTable');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/ManufacturerTable');
    };

    return (
        <>
            <PageHeader title="Edit Manufacturer Type Details" breadcrumbs={breadcrumbs} />
            {isLoading ? (
                <Spinner size="xl" />
            ) : (
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form className="grid grid-cols-2 gap-10 mt-8">
                            <div className="flex flex-col gap-3">
                                <p>Manufacture</p>
                                <Field name="Manufacture" validate={(value) => {
                                    let error;
                                    if (!value) {
                                        error = "Manufacture is required.";
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
                                                id="Manufacture"
                                                placeholder="Enter Manufacture"
                                                value={values.Manufacture}
                                            />
                                            {errors.Manufacture && touched.Manufacture && (
                                                <div className="text-red-500">{errors.Manufacture}</div>
                                            )}
                                        </div>
                                    )}
                                </Field>
                                <Field name="isActive">
                                    {({ field }) => (
                                        <div>
                                            <Checkbox
                                                {...field}
                                                size='lg'
                                                checked={values.isActive}
                                                className="mt-8"
                                                onChange={e => setFieldValue('isActive', e.target.checked)}
                                            >
                                                Is Active
                                            </Checkbox>
                                            {errors.isActive && touched.isActive && (
                                                <div className="text-red-500">{errors.isActive}</div>
                                            )}
                                        </div>
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
            )}

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
