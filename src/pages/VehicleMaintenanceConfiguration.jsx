import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
    Select,
    Button,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Checkbox
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import theme from '../config/ThemeConfig.jsx';
import Maintenance from "../assets/images/maintenance.png";

const VehicleMaintenanceConfiguration = () => {
    const navigate = useNavigate();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState('');
    const [successDialogMessage, setSuccessDialogMessage] = useState('');
    const [maintenanceTypeDetails, setMaintenanceTypeDetails] = useState([]);
    const [vehicleRegNoDetails, setVehicleRegNoDetails] = useState([]);

    const exampleVehicleData = [
        { VehicleId: 1, VehicleRegistrationNo: 'ABC123' },
        { VehicleId: 2, VehicleRegistrationNo: 'DEF456' },
    ];

    const fetchVehicleRegNos = async () => {
        try {
            const response = await axios.get('https://localhost:7265/api/Vehicle');
            setVehicleRegNoDetails(response.data);
        } catch (error) {
            console.error('Error fetching vehicle registration numbers:', error);
            setVehicleRegNoDetails(exampleVehicleData); // Using dummy data in case of an error
        }
    };

    const fetchVehicleMaintenanceTypes = async () => {
        try {
            const response = await axios.get('https://localhost:7265/api/VehicleMaintenanceType');
            setMaintenanceTypeDetails(response.data);
        } catch (error) {
            console.error('Error fetching vehicle maintenance types:', error);
        }
    };

    useEffect(() => {
        fetchVehicleMaintenanceTypes();
        fetchVehicleRegNos();
    }, []);

    const breadcrumbs = [
        { label: 'Vehicle', link: '/app/Vehicle' },
        { label: 'Vehicle Maintenance Configuration', link: '/app/VehicleMaintenanceConfigurationTable' },
        { label: 'Add Vehicle Maintenance Configuration', link: '/app/VehicleMaintenanceConfiguration' }
    ];

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('https://localhost:7265/api/VehicleMaintenanceConfiguration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    VehicleId: values.registrationNo,
                    VehicleMaintenanceTypeId: parseInt(values.maintenanceType),
                    Duration: values.duration,
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
        navigate('/app/VehicleMaintenanceConfigurationTable');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/VehicleMaintenanceConfigurationTable');
    };

    return (
        <>
            <PageHeader title="Add Vehicle Maintenance Configurations" breadcrumbs={breadcrumbs} />

            <Formik
                initialValues={{
                    registrationNo: '',
                    maintenanceType: '',
                    duration: '',
                    isActive: false,
                }}
                onSubmit={handleSubmit}
                validate={(values) => {
                    const errors = {};
                    if (!values.registrationNo) {
                        errors.registrationNo = 'Vehicle registration number is required';
                    }
                    if (!values.maintenanceType) {
                        errors.maintenanceType = 'Maintenance type is required';
                    }
                    if (!values.duration) {
                        errors.duration = 'Duration is required';
                    }
                    return errors;
                }}
            >
                {({ errors, touched }) => (
                    <Form className="flex justify-between vertical-container">
                        <div className="flex flex-col gap-6 mt-5 w-1/4">
                            <p>Vehicle Registration No</p>
                            <Field name="registrationNo">
                                {({ field }) => (
                                    <div>
                                        <Select
                                            {...field}
                                            placeholder="Vehicle Registration No"
                                            variant="filled"
                                            borderRadius="md"
                                            size="sm"
                                            width="100%"
                                        >
                                            {vehicleRegNoDetails.map((option, index) => (
                                                <option key={index} value={option.VehicleId}>
                                                    {option.VehicleRegistrationNo}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.registrationNo && touched.registrationNo && (
                                            <div className="text-red-500">{errors.registrationNo}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <p>Vehicle Maintenance Type</p>
                            <Field name="maintenanceType">
                                {({ field }) => (
                                    <div>
                                        <Select
                                            {...field}
                                            placeholder="Vehicle Maintenance Type"
                                            variant="filled"
                                            borderRadius="md"
                                            size="sm"
                                            width="100%"
                                        >
                                            {maintenanceTypeDetails.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.typeName}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.maintenanceType && touched.maintenanceType && (
                                            <div className="text-red-500">{errors.maintenanceType}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <p>Duration</p>
                            <Field name="duration">
                                {({ field }) => (
                                    <div>
                                        <Select
                                            {...field}
                                            placeholder="Duration"
                                            variant="filled"
                                            borderRadius="md"
                                            size="sm"
                                            width="100%"
                                        >
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="3months">Every 3 Months</option>
                                            <option value="6months">Every 6 Months</option>
                                            <option value="yearly">Yearly</option>
                                        </Select>
                                        {errors.duration && touched.duration && (
                                            <div className="text-red-500">{errors.duration}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <Field name="isActive">
                                {({ field, form }) => (
                                    <div>
                                        <Checkbox
                                            {...field}
                                            size='lg'
                                            defaultChecked={field.value}
                                            onChange={e => form.setFieldValue(field.name, e.target.checked)}
                                        >
                                            Is Active
                                        </Checkbox>
                                        {form.errors.isActive && form.touched.isActive && (
                                            <div className="text-red-500">{form.errors.isActive}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <div className="flex gap-4 mt-10">
                                <Button
                                    bg="gray.400"
                                    _hover={{ bg: 'gray.500' }}
                                    color="#ffffff"
                                    variant="solid"
                                    size="sm"
                                    width="50%"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    bg={theme.purple}
                                    _hover={{ bg: theme.onHoverPurple }}
                                    color="#ffffff"
                                    variant="solid"
                                    size="sm"
                                    width="50%"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-end">
                            <img src={Maintenance} alt="Change Password" width="400" height="400" className="mr-14" />
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
                    <AlertDialogBody>{dialogMessage}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg={theme.purple} color="#FFFFFF" onClick={onDialogClose}>
                            Close
                        </Button>
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
                    <AlertDialogBody>{successDialogMessage}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg={theme.purple} color="#FFFFFF" onClick={handleSuccessDialogClose}>
                            Ok
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default VehicleMaintenanceConfiguration;
