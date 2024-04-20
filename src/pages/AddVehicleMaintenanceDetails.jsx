import { Formik, Form, Field } from "formik";
import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { Button, Flex, IconButton, Input, Textarea } from "@chakra-ui/react";
import { FaCheckSquare } from "react-icons/fa";
import theme from "../config/ThemeConfig.jsx";
import axios from "axios";

export default function AddVehicleMaintenanceDetails() {
    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "Vehicle Maintenance", link: "/" },
        { label: " Add Vehicle Maintenance Details", link: "/" },
    ];

    const handleSubmit = () => {
        let obj={
            "vehicleRegistrationNo": vehicleRegistrationNo,
            "maintenanceDate": maintenanceDate,
            "cost": cost,
            "serviceProvider": serviceProvider,
            "replacedParts": replacedParts,
            "specialNotes": specialNotes,
            "isActive": isActive,
        }
        console.log(obj)
        axios.post('https://localhost:7265/api/VehicleMaintenance/vehiclemaintenance', obj)
            .then(() => {
                alert('Successfully added');
                console.log('Added successfully');
            })
            .catch((er) => {
                console.log(er.message)
            });
    }

    const handleCancel = () => {
        console.log("Cancelled");
    };

    const [vehicleRegistrationNo,setVehicleRegistrationNo]=useState("")
    const [maintenanceDate,setMaintenanceDate]=useState("")
    const [cost,setCost]=useState(0)
    const [serviceProvider,setServiceProvider]=useState("")
    const [replacedParts,setReplacedParts]=useState("")
    const [specialNotes,setSpecialNotes]=useState("")
    const [isActive,setIsActive]=useState("")

    return (
        <>
            <PageHeader
                title="Add Vehicle Maintenance Details"
                breadcrumbs={breadcrumbs}
            />
            <Formik
                initialValues={{
                    vehicleRegistrationNo: "",
                    maintenanceDate: "",
                    cost: "",
                    serviceProvider: "",
                    replacedParts: "",
                    specialNotes: "",
                    isActive: false,
                }}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form>
                        <div className="grid grid-cols-2 gap-10 mt-8">
                            <div className="flex flex-col gap-3">
                                <p>Vehicle Registration No</p>
                                <Field
                                    as={Input}
                                    type="text"
                                    variant="filled"
                                    borderRadius="md"
                                    px={3}
                                    py={2}
                                    mt={1}
                                    width="500px"
                                    name="vehicleRegistrationNo"
                                    placeholder="Vehicle Registration No"
                                    value={vehicleRegistrationNo}
                                    onChange={(e)=>setVehicleRegistrationNo(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Maintenance Date</p>
                                <Field
                                    as={Input}
                                    type="date"
                                    variant="filled"
                                    borderRadius="md"
                                    px={3}
                                    py={2}
                                    mt={1}
                                    width="500px"
                                    name="maintenanceDate"
                                    placeholder="Maintenance Date"
                                    value={maintenanceDate}
                                    onChange={(e)=>setMaintenanceDate(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <p>Cost for Maintenance</p>
                                <Field
                                    as={Input}
                                    type="number"
                                    step="0.01"
                                    placeholder="Cost of Maintenance"
                                    variant="filled"
                                    borderRadius="md"
                                    width="500px"
                                    px={3}
                                    py={2}
                                    mt={1}
                                    name="cost"
                                    value={cost}
                                    onChange={(e)=>setCost(e.target.value)}                                />
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
                                    value={serviceProvider}
                                    onChange={(e)=>setServiceProvider(e.target.value)}                                />
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
                                    value={replacedParts}
                                    onChange={(e)=>setReplacedParts(e.target.value)}                                />
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
                                    value={specialNotes}
                                    onChange={(e)=>setSpecialNotes(e.target.value)}                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Flex align="center" gap={2}>
                                    <Field
                                        as={IconButton}
                                        width="fit-content"
                                        variant="solid"
                                        colorScheme="none"
                                        fontSize="30px"
                                        color="#393970"
                                        icon={<FaCheckSquare />}
                                        aria-label="activeState"
                                        name="isActive"
                                        onClick={() => setIsActive(!isActive)}
                                    />
                                    <p>Is active</p>
                                </Flex>
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
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    bg={theme.purple}
                                    _hover={{ bg: theme.onHoverPurple }}
                                    color="#ffffff"
                                    variant="solid"
                                    w="230px"
                                    marginTop="10"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
