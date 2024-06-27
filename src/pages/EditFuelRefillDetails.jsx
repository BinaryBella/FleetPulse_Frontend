import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Input,
    Select,
    useDisclosure,
    Checkbox
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";

export default function EditFuelRefillDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [fuelTypes, setFuelTypes] = useState([]);
    const [vehicleRegNoDetails, setVehicleRegNoDetails] = useState([]);
    const [initialValues, setInitialValues] = useState({
        vehicleRegistrationNo: "",
        literCount: "",
        refillDate: "",
        time: "",
        fType: "",
        cost: "",
        status: false,
    });

    useEffect(() => {
        const fetchVehicleRegNos = async () => {
            try {
                const response = await axios.get("https://localhost:7265/api/Vehicle");
                setVehicleRegNoDetails(response.data);
            } catch (error) {
                console.error("Error fetching vehicle registration numbers:", error);
                setDialogMessage("Error fetching vehicle registration numbers");
                onDialogOpen();
            }
        };

        const fetchFuelRefillDetails = async () => {
            if (id) {
                try {
                    const response = await axios.get(`https://localhost:7265/api/FuelRefill/${id}`);
                    const refill = response.data;
                    setInitialValues({
                        vehicleRegistrationNo: refill.vehicleId,
                        literCount: refill.literCount,
                        refillDate: refill.refillDate.split("T")[0],
                        time: refill.time,
                        fType: refill.fType,
                        cost: refill.cost,
                        status: refill.status,
                    });
                } catch (error) {
                    console.error("Error fetching fuel refill details:", error);
                    setDialogMessage("Error fetching fuel refill details");
                    onDialogOpen();
                }
            }
        };

        const fetchFuelTypes = async () => {
            try {
                const response = await axios.get("https://localhost:7265/api/FuelType");
                setFuelTypes(response.data);
            } catch (error) {
                console.error("Error fetching fuel types:", error);
                setDialogMessage("Error fetching fuel types");
                onDialogOpen();
            }
        };

        fetchVehicleRegNos();
        fetchFuelTypes();
        fetchFuelRefillDetails();
    }, [id, onDialogOpen]);

    const breadcrumbs = [
        { label: "Vehicle", link: "/app/Vehicle" },
        { label: "Fuel Refill", link: "/app/FuelRefillTable" },
        {
            label: id ? "Edit Fuel Refill Details" : "Add Fuel Refill Details",
            link: id ? `/app/EditFuelRefillDetails/${id}` : "/app/AddFuelRefillDetails"
        },
    ];

    const handleSubmit = async (values) => {
        try {
            const payload = {
                vehicleId: values.vehicleRegistrationNo,
                literCount: parseFloat(values.literCount),
                refillDate: values.refillDate,
                time: values.time,
                fType: values.fType,
                cost: parseFloat(values.cost),
                status: values.status
            };

            let response;
            if (id) {
                response = await axios.put(`https://localhost:7265/api/FuelRefill/${id}`, payload);
            } else {
                response = await axios.post('https://localhost:7265/api/FuelRefill', payload);
            }

            const data = response.data;

            if (data.message && data.message.toLowerCase().includes('exist')) {
                setDialogMessage('Fuel refill already exists');
                onDialogOpen();
            } else {
                setSuccessDialogMessage(id ? 'Fuel refill updated successfully' : 'Fuel refill added successfully');
                onSuccessDialogOpen();
            }
        } catch (error) {
            console.error("Error submitting fuel refill details:", error);
            setDialogMessage(error.message || 'Failed to add fuel refill.');
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        navigate('/app/FuelRefillTable');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/FuelRefillTable');
    };

    return (
        <>
            <PageHeader title={id ? "Edit Fuel Refill Details" : "Add Fuel Refill Details"} breadcrumbs={breadcrumbs} />
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="grid grid-cols-2 gap-10 mt-8">
                        <div className="flex flex-col gap-3">
                            <p>User NIC</p>
                            <Field name="nic" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "NIC is required.";
                                } else if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(value)) {
                                    error = "Invalid NIC format.";
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
                                            id="nic"
                                            placeholder="NIC"
                                        />
                                        {errors.nic && touched.nic && (
                                            <div className="text-red-500">{errors.nic}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Vehicle Registration No</p>
                            <Field name="vehicleRegistrationNo" validate={(value) => {
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
                                            {vehicleRegNoDetails.map((option, index) => (
                                                <option key={index} value={option.vehicleId}>
                                                    {option.vehicleRegistrationNo}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.vehicleRegistrationNo && touched.vehicleRegistrationNo && (
                                            <div className="text-red-500">{errors.vehicleRegistrationNo}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Liter Count</p>
                            <Field name="literCount" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Liter Count is required.";
                                }
                                return error;
                            }}>
                                {({field}) => (
                                    <div>
                                        <Input
                                            {...field}
                                            placeholder='Liter Count'
                                            size='md'
                                            variant='filled'
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                        />
                                        {errors.literCount && touched.literCount && (
                                            <div className="text-red-500">{errors.literCount}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Refill Date</p>
                            <Field name="refillDate" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Refill Date is required.";
                                }
                                return error;
                            }}>
                                {({field}) => (
                                    <div>
                                        <Input
                                            {...field}
                                            type='date'
                                            size='md'
                                            variant='filled'
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                        />
                                        {errors.refillDate && touched.refillDate && (
                                            <div className="text-red-500">{errors.refillDate}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Time</p>
                            <Field name="time" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Time is required.";
                                }
                                return error;
                            }}>
                                {({field}) => (
                                    <div>
                                        <Input
                                            {...field}
                                            type='time'
                                            size='md'
                                            variant='filled'
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                        />
                                        {errors.time && touched.time && (
                                            <div className="text-red-500">{errors.time}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p>Fuel Type</p>
                            <Field name="fType" validate={(value) => {
                                let error;
                                if (!value) {
                                    error = "Fuel Type is required.";
                                }
                                return error;
                            }}>
                                {({field}) => (
                                    <div>
                                        <Select
                                            {...field}
                                            placeholder='Fuel Type'
                                            size='md'
                                            variant='filled'
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                        >
                                            {fuelTypes.map((option, index) => (
                                                <option key={index} value={option.id}>
                                                    {option.typeName}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.fType && touched.fType && (
                                            <div className="text-red-500">{errors.fType}</div>
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
                                }
                                return error;
                            }}>
                                {({field}) => (
                                    <div>
                                        <Input
                                            {...field}
                                            placeholder='Cost'
                                            size='md'
                                            variant='filled'
                                            borderRadius="md"
                                            px={3}
                                            py={2}
                                            mt={1}
                                            width="500px"
                                        />
                                        {errors.cost && touched.cost && (
                                            <div className="text-red-500">{errors.cost}</div>
                                        )}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Field name="status" type="checkbox">
                                {({field}) => (
                                    <Checkbox
                                        {...field}
                                        colorScheme="blue"
                                        borderRadius="md"
                                        size="lg"
                                        isChecked={field.value}
                                    >
                                        Is Active
                                    </Checkbox>
                                )}
                            </Field>
                        </div>
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

            <AlertDialog
                isOpen={isDialogOpen}
                leastDestructiveRef={undefined}
                onClose={onDialogClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Alert
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {dialogMessage}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onDialogClose} ml={3}>
                                OK
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
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Success
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {successDialogMessage}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={handleSuccessDialogClose} ml={3}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
