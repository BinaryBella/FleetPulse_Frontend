import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
    Button,
    Checkbox,
    Input,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Textarea,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import theme from "../config/ThemeConfig.jsx";

export default function EditAccidentDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [initialValues, setInitialValues] = useState({
        dateTime: "",
        venue: "",
        vehicleRegNo: "",
        driverNic: "",
        helperNic: "",
        loss: "",
        specialNotes: "",
        driverInjured: false,
        helperInjured: false,
        vehicleDamaged: false
    });

    const breadcrumbs = [
        { label: 'Accident', link: '/' },
        { label: 'Accident Details', link: '/' },
        { label: 'Edit Accident Details', link: '/' }
    ];

    useEffect(() => {
        fetchAccidentData(id);
    }, [id]);

    const fetchAccidentData = async (id) => {
        try {
            const response = await fetch(`https://localhost:7265/api/Accidents/${id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch accident data.');
            }

            setInitialValues({
                dateTime: data.dateTime || "",
                venue: data.venue || "",
                vehicleRegNo: data.vehicleRegNo || "",
                driverNic: data.driverNic || "",
                helperNic: data.helperNic || "",
                loss: data.loss || "",
                specialNotes: data.specialNotes || "",
                driverInjured: data.driverInjured || false,
                helperInjured: data.helperInjured || false,
                vehicleDamaged: data.vehicleDamaged || false
            });
        } catch (error) {
            setDialogMessage(error.message || 'Failed to fetch accident data.');
            onDialogOpen();
        }
    };

    const handleSubmit = async (values) => {
        try {
            const response = await fetch(`https://localhost:7265/api/Accidents/UpdateAccident`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Id: id,
                    DateTime: values.dateTime,
                    Venue: values.venue,
                    VehicleRegNo: values.vehicleRegNo,
                    DriverNic: values.driverNic,
                    HelperNic: values.helperNic,
                    Loss: values.loss,
                    SpecialNotes: values.specialNotes,
                    DriverInjured: values.driverInjured,
                    HelperInjured: values.helperInjured,
                    VehicleDamaged: values.vehicleDamaged
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update accident details.');
            }

            setSuccessDialogMessage('Accident details updated successfully.');
            onSuccessDialogOpen();
        } catch (error) {
            setDialogMessage(error.message || 'Failed to update accident details.');
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        navigate('/app/AccidentDetails');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/AccidentDetails');
    };

    return (
        <>
            <PageHeader title="Edit Accident Details" breadcrumbs={breadcrumbs} />
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form className="grid gap-10 mt-8">
                        <Tabs position="relative" variant="unstyled">
                            <TabList>
                                <Tab>Accident Details</Tab>
                                <Tab>Upload Photos</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className="grid grid-cols-2 gap-10 mt-8">
                                        <div className="flex flex-col gap-3">
                                            <p>Date & Time</p>
                                            <Field name="date">
                                                {({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type="date"
                                                        variant="filled"
                                                        borderRadius="md"
                                                        px={3}
                                                        py={2}
                                                        mt={1}
                                                        width="500px"
                                                        placeholder="DateTime"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p>Venue</p>
                                            <Field name="venue">
                                                {({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        variant="filled"
                                                        borderRadius="md"
                                                        px={3}
                                                        py={2}
                                                        mt={1}
                                                        width="500px"
                                                        placeholder="Venue"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p>Vehicle Registration No</p>
                                            <Field name="vehicleRegNo">
                                                {({ field }) => (
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
                                                )}
                                            </Field>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p>Driver's NIC</p>
                                            <Field name="driverNic">
                                                {({ field }) => (
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
                                                )}
                                            </Field>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p>Helper's NIC</p>
                                            <Field name="helperNic">
                                                {({ field }) => (
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
                                                )}
                                            </Field>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p>Loss</p>
                                            <Field name="loss">
                                                {({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Loss"
                                                        variant="filled"
                                                        borderRadius="md"
                                                        width="500px"
                                                        px={3}
                                                        py={2}
                                                        mt={1}
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p>Special Notes</p>
                                            <Field name="specialNotes">
                                                {({ field }) => (
                                                    <Textarea
                                                        {...field}
                                                        variant="filled"
                                                        borderRadius="md"
                                                        px={3}
                                                        py={2}
                                                        mt={1}
                                                        width="500px"
                                                        placeholder="Special Notes"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                      /* <div className="flex gap-7">
                                            <Field name="driverInjured">
                                                {({ field }) => (
                                                    <Checkbox
                                                        {...field}
                                                        size='lg'
                                                        isChecked={values.driverInjured}
                                                        onChange={e => setFieldValue('driverInjured', e.target.checked)}
                                                    >
                                                        Driver Injured
                                                    </Checkbox>
                                                )}
                                            </Field>
                                            <Field name="helperInjured">
                                                {({ field }) => (
                                                    <Checkbox
                                                        {...field}
                                                        size='lg'
                                                        isChecked={values.helperInjured}
                                                        onChange={e => setFieldValue('helperInjured', e.target.checked)}
                                                    >
                                                        Helper Injured
                                                    </Checkbox>
                                                )}
                                            </Field>
                                            <Field name="vehicleDamaged">
                                                {({ field }) => (
                                                    <Checkbox
                                                        {...field}
                                                        size='lg'
                                                        isChecked={values.vehicleDamaged}
                                                        onChange={e => setFieldValue('vehicleDamaged', e.target.checked)}
                                                    >
                                                        Vehicle Damaged
                                                    </Checkbox>
                                                )}
                                            </Field>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="mt-8 flex flex-col items-center">
                                        <Button leftIcon={<FaImage />} colorScheme="blue" mb={4}>Upload Photos</Button>
                                        <div className="flex justify-center space-x-4">
                                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">1</div>
                                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">2</div>
                                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">3</div>
                                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">4</div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabPanels>
                       </Tabs>
                        <div className="flex justify-end mt-10 space-x-4">
                            <Button
                                onClick={handleCancel}
                                colorScheme="gray"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                colorScheme="purple"
                                variant="solid"
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <AlertDialog
                isOpen={isDialogOpen}
                leastDestructiveRef={undefined}
                onClose={onDialogClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Error</AlertDialogHeader>
                        <AlertDialogBody>{dialogMessage}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={onDialogClose}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <AlertDialog
                isOpen={isSuccessDialogOpen}
                leastDestructiveRef={undefined}
                onClose={handleSuccessDialogClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Success</AlertDialogHeader>
                        <AlertDialogBody>{successDialogMessage}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button colorScheme="blue" onClick={handleSuccessDialogClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
