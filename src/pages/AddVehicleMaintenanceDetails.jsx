import {useEffect, useState} from "react";
import {Formik, Form, Field} from "formik";
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
    Textarea,
    useDisclosure,
    Select
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
// import axios from "axios"; // Comment out the axios import
import {useNavigate} from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function AddVehicleMaintenanceDetails() {
    const navigate = useNavigate();
    const {isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose} = useDisclosure();
    const {isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose} = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [maintenanceTypeDetails, setMaintenanceTypeDetails] = useState([]);
    const [VehicleRegNoDetails, setVehicleRegNoDetails] = useState([]);

    // Dummy data for demonstration
    const exampleVehicleData = [
        {VehicleId: 2, VehicleRegistrationNo: "REG123"},
        {VehicleId: 3, VehicleRegistrationNo: "REG456"},
    ];

    // Fetch vehicle registration numbers (dummy function for demonstration)
    const fetchVehicleRegNos = async () => {
        try {
            // Simulate fetching vehicle registration numbers
            // const response = await axios.get("https://localhost:7265/api/Vehicle");
            // setVehicleRegNoDetails(response.data);
            setVehicleRegNoDetails(exampleVehicleData); // Use example data for demonstration
        } catch (error) {
            console.error("Error fetching vehicle registration numbers:", error);
        }
    };

    useEffect(() => {
        // fetchVehicleMaintenanceTypes(); // Comment out backend request
        fetchVehicleRegNos();
    }, []);

    // Fetch vehicle maintenance types (dummy function for demonstration)
    const fetchVehicleMaintenanceTypes = async () => {
        try {
            // const response = await axios.get("https://localhost:7265/api/VehicleMaintenanceType");
            // setMaintenanceTypeDetails(response.data);
            // Simulate setting maintenance type details
            setMaintenanceTypeDetails([
                {id: 1, typeName: "Maintenance Type 1"},
                {id: 2, typeName: "Maintenance Type 2"},
            ]);
        } catch (error) {
            console.error("Error fetching vehicle maintenance types:", error);
        }
    };

    useEffect(() => {
        fetchVehicleMaintenanceTypes();
    }, []);

    const breadcrumbs = [
        {label: "Vehicle", link: "/app/VehicleDetails"},
        {label: "Vehicle Maintenance", link: "/app/MaintenanceTable"},
        {label: "Add Vehicle Maintenance Details", link: "/app/AddVehicleMaintenanceDetails"},
    ];

    const handleSubmit = async () => {
        try {
            // Backend request
            /*
            const response = await fetch('https://localhost:7265/api/VehicleMaintenance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    VehicleId: values.VehicleRegistrationNo,
                    MaintenanceDate: values.maintenanceDate,
                    VehicleMaintenanceTypeId: parseInt(values.VehicleMaintenanceTypeId),
                    Cost: parseFloat(values.cost),
                    PartsReplaced: values.replacedParts,
                    ServiceProvider: values.serviceProvider,
                    SpecialNotes: values.specialNotes,
                    Status: values.isActive
                })
            });

            const data = await response.json();

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
            */

            // Dummy success logic for demonstration
            setSuccessDialogMessage('Maintenance added successfully');
            onSuccessDialogOpen();
        } catch (error) {
            if (error instanceof TypeError) {
                setDialogMessage('Failed to connect to the server');
            } else {
                setDialogMessage(error.message || 'Failed to add maintenance.');
            }
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        navigate('/app/MaintenanceTable');
    };

    const handleSuccessDialogClose = () => {
        // Close the success dialog
        onSuccessDialogClose();
        // Redirect to maintenance table page
        navigate('/app/MaintenanceTable');
    };

    return (
        <>
            <PageHeader title="Add Vehicle Maintenance Details" breadcrumbs={breadcrumbs}/>
            <Formik
                initialValues={{
                    VehicleRegistrationNo: "",
                    maintenanceDate: "",
                    VehicleMaintenanceTypeId: 0,
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
                                {({field}) => (
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
                            <Field name="VehicleMaintenanceTypeId" validate={(value) => {
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

                                        {errors.VehicleMaintenanceTypeId && touched.VehicleMaintenanceTypeId && (
                                            <div className="text-red-500">{errors.VehicleMaintenanceTypeId}</div>
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
                                    error = "Maintenance Date is required.";
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
                            <p>Cost</p>
                            <Field name="cost" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Cost is required.";
                                } else if (isNaN(value)) {
                                    error = "Cost must be a number.";
                                }
                                return error;
                            }}>
                                {({field}) => (
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
                                            name="cost"
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
                            <p>Service Provider</p>
                            <Field name="serviceProvider" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Service Provider is required.";
                                }
                                return error;
                            }}>
                                {({field}) => (
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
                                            name="serviceProvider"
                                            placeholder="Service Provider"
                                        />
                                        {errors.serviceProvider && touched.serviceProvider && (
                                            <div className="text-red-500">{errors.serviceProvider}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Parts Replaced</p>
                            <Field name="replacedParts">
                                {({field}) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        variant="filled"
                                        borderRadius="md"
                                        px={3}
                                        py={2}
                                        mt={1}
                                        width="500px"
                                        name="replacedParts"
                                        placeholder="Parts Replaced"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Special Notes</p>
                            <Field name="specialNotes">
                                {({field}) => (
                                    <Textarea
                                        {...field}
                                        variant="filled"
                                        borderRadius="md"
                                        px={3}
                                        py={2}
                                        mt={1}
                                        width="500px"
                                        name="specialNotes"
                                        placeholder="Special Notes"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Status</p>
                            <Field name="isActive" type="checkbox">
                                {({field}) => (
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
                        <div className="flex flex-row gap-14">
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
                                bg={theme.purple}
                                _hover={{bg: theme.onHoverPurple}}
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

            <AlertDialog isOpen={isSuccessDialogOpen} onClose={handleSuccessDialogClose} motionPreset="slideInBottom">
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
                        <Button bg={theme.purple} color="#FFFFFF" onClick={onDialogClose}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
