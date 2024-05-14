import {Formik, Form, Field} from "formik";
import {useEffect, useState} from "react";
import PageHeader from "../components/PageHeader.jsx";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Checkbox,
    Flex,
    Input,
    Textarea,
    useDisclosure,
    Select
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AddVehicleMaintenanceDetails() {
    const navigate = useNavigate();
    const {isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose} = useDisclosure();
    const {isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose} = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [maintenanceTypeDetails, setMaintenanceTypeDetails] = useState([]);
    const [VehicleRegNoDetails, setVehicleRegNoDetails] = useState([]);

    const fetchVehicleMaintenanceTypes = async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/VehicleMaintenanceType");
            setMaintenanceTypeDetails(response.data);
            console.log(maintenanceTypeDetails);
        } catch (error) {
            console.error("Error fetching vehicle maintenance types:", error);
        }
    };

    useEffect(() => {
        fetchVehicleMaintenanceTypes();
    }, []);

    const fetchVehicleRegNo= async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/Vehicle");
            setVehicleRegNoDetails(response.data);
            console.log(VehicleRegNoDetails);
        } catch (error) {
            console.error("Error fetching vehicle Registration No:", error);
        }
    };

    useEffect(() => {
        fetchVehicleRegNo();
    }, []);

    const breadcrumbs = [
        {label: "Vehicle", link: "/app/Vehicle"},//yashmi
        {label: "Vehicle Maintenance", link: "/app/MaintenanceTable"},
        {label: "Add Vehicle Maintenance Details", link: "/app/AddVehicleMaintenanceDetails"},
    ];

    const handleSubmit = async (values) => {
        try {
            console.log(values.VehicleRegistrationNo, values.maintenanceDate);
            const response = await fetch('https://localhost:7265/api/VehicleMaintenance/vehiclemaintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    VehicleRegistrationNo: values.VehicleRegistrationNo,
                    MaintenanceDate: values.maintenanceDate,
                    MaintenanceTypeId: parseInt(values.maintenanceTypeId),
                    Cost: values.cost,
                    PartsReplaced: values.replacedParts,
                    ServiceProvider: values.serviceProvider,
                    SpecialNotes: values.specialNotes,
                    Status: values.isActive
                })
            });

            const data = response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add maintenance');
            }

            if (data.message && data.message.toLowerCase().includes('exist')) {
                setDialogMessage('Vehicle Maintenance already exists');
                onDialogOpen();
            } else {
                setSuccessDialogMessage('Maintenance added successfully');
                onSuccessDialogOpen();
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setDialogMessage('Failed to connect to the server');
            } else {
                setDialogMessage(error.message || 'Failed to add maintenance');
            }
            onDialogOpen();
        }
    }


    const handleCancel = () => {
        navigate('/app/MaintenanceTable');
    };
    const handleSuccessDialogClose = () => {
        // Close the success dialog
        onSuccessDialogClose();
        // Redirect to the vehicle maintenance type table page
        navigate('/app/MaintenanceTable');
    };


    return (
        <>
            <PageHeader title="Add Vehicle Maintenance Details" breadcrumbs={breadcrumbs}/>
            <Formik
                initialValues={{
                    VehicleRegistrationNo: "",
                    maintenanceDate: "",
                    maintenanceTypeId: 0,
                    cost: "",
                    serviceProvider: "",
                    replacedParts: "",
                    specialNotes: "",
                    isActive: "",
                }}
                onSubmit={handleSubmit}
            >
                {({errors, touched}) => (
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
                                {({field}) => (<div>
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
                                            {VehicleRegNoDetails.map((option, index) => (
                                                <option key={index} value={option.VehicleId}>
                                                    {option.VehicleRegistrationNo}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.VehicleRegistrationNo && touched.VehicleRegistrationNo && (
                                            <div className="text-red-500">{errors.VehicleRegistrationNo}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Vehicle Maintenance Type</p>
                            <Field name="maintenanceTypeId" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Maintenance type is required.";
                                }
                                return error;
                            }}>
                                {({field}) => (
                                    <div>
                                        <Select
                                            {...field}
                                            placeholder='Vehicle Maintenance Type'
                                            size='md'
                                            variant='filled'
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                        >
                                            {maintenanceTypeDetails.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.typeName}
                                                </option>
                                            ))}
                                        </Select>

                                        {errors.maintenanceTypeId && touched.maintenanceTypeId && (
                                            <div className="text-red-500">{errors.maintenanceTypeId}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Maintenance Date</p>
                            <Field name="maintenanceDate" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "maintenance Date is required.";
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
                                            width="500px"
                                            name="maintenanceDate"
                                            placeholder="Maintenance Date"
                                        />
                                        {errors.maintenanceDate && touched.maintenanceDate && (
                                            <div className="text-red-500">{errors.maintenanceDate}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Cost for Maintenance</p>
                            <Field name="cost" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Cost of Maintenance is required.";
                                }
                                return error;
                            }}>
                                {({field}) => (
                                    <div>
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="Cost of Maintenance"
                                            variant="filled"
                                            borderRadius="md"
                                            width="500px"
                                            px={3}
                                            py={2}
                                            mt={1}
                                        />
                                        {errors.cost && touched.cost && (
                                            <div className="text-red-500">{errors.cost}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Service Provider</p>
                            <Field
                                as={Input}
                                type="text"
                                variant="filled"
                                borderRadius="md"
                                px={3}
                                py={2}
                                mt={1}
                                width="500px"
                                name="serviceProvider"
                                placeholder="Service Provider"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Replaced Parts</p>
                            <Field
                                as={Textarea}
                                variant="filled"
                                borderRadius="md"
                                px={3}
                                py={2}
                                mt={1}
                                width="500px"
                                name="replacedParts"
                                placeholder="Replaced Parts"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Special Notes</p>
                            <Field
                                as={Textarea}
                                variant="filled"
                                borderRadius="md"
                                px={3}
                                py={2}
                                mt={1}
                                width="500px"
                                name="specialNotes"
                                placeholder="Special Notes"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <Flex align="center" gap={2}>
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
                            </Flex>
                        </div>
                        <div></div>
                        <div className="flex gap-10">
                            <Button
                                bg="gray.400"
                                _hover={{bg: "gray.500"}}
                                color="#ffffff"
                                variant="solid"
                                w="230px"
                                marginTop="10"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                bg={theme.purple}
                                _hover={{bg: theme.onHoverPurple}}
                                color="#ffffff"
                                variant="solid"
                                w="230px"
                                marginTop="10"
                            >
                                Save
                            </Button>
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