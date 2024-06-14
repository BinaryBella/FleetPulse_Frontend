import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom"; // Import Link
import PageHeader from "../components/PageHeader.jsx";
import {
    Box,
    Button, Checkbox, HStack,
    Input,
    Tab,
    TabIndicator,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Textarea,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import theme from "../config/ThemeConfig.jsx";

export default function EditAccidentDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [initialValues, setInitialValues] = useState({
        date: "",
        location: "",
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
                date: data.date || "",
                location: data.location || "",
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
                    Date: values.date,
                    Location: values.location,
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
        navigate('/app/AccidentDetailsTable');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/AccidentDetailsTable');
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
                            <TabIndicator
                                mt="-1.5px"
                                height="2px"
                                bg="#5858af"
                                borderRadius="1px"
                            />
                            <TabPanels>
                                <TabPanel>
                                    <div className="grid grid-cols-2 gap-10 mt-8">
                                        <div className="flex flex-col gap-3">
                                            <p>Date</p>
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
                                                        placeholder="Date"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p>Location</p>
                                            <Field name="location">
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
                                                        placeholder="Location"
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
                                        <div className="flex gap-7">
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
                                </TabPanel>
                                <TabPanel>
                                    <div className="mt-8 flex flex-col items-center">
                                        <Button leftIcon={<FaImage />} colorScheme="blue" mb={4}>Upload Photos</Button>
                                        <HStack spacing={4}>
                                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">1</div>
                                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">2</div>
                                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">3</div>
                                            <div className="w-32 h-32 border border-gray-300 flex items-center justify-center">4</div>
                                        </HStack>
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
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
                            <Button colorScheme="red" onClick={onDialogClose}>Close</Button>
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
                            <Button colorScheme="blue" onClick={handleSuccessDialogClose}>OK</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
