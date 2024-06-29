import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader.jsx";
import {
    Button,
    Input,
    Checkbox,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";

export default function EditVehicleDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const { isOpen: isSuccessDialogOpen, onOpen: onSuccessDialogOpen, onClose: onSuccessDialogClose } = useDisclosure();
    const [dialogMessage, setDialogMessage] = useState("");
    const [successDialogMessage, setSuccessDialogMessage] = useState("");
    const [vehicleDetails, setVehicleDetails] = useState({
        vehicleRegistrationNo: "",
        licenseNo: "",
        licenseExpireDate: "",
        vehicleColor: "",
        vehicleTypeId: "",
        manufactureId: "",
        fuelRefillId: "",
        isActive: false,
        vehicleId: 0
    });

    useEffect(() => {
        fetchVehicleDetails(id);
    }, [id]);

    const fetchVehicleDetails = async (id) => {
        try {
            const response = await fetch(`https://localhost:7265/api/Vehicle/${id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch vehicle details.');
            }

            setVehicleDetails({
                vehicleRegistrationNo: data.vehicleRegistrationNo || "",
                licenseNo: data.licenseNo || "",
                licenseExpireDate: data.licenseExpireDate || "",
                vehicleColor: data.vehicleColor || "",
                vehicleTypeId: data.vehicleTypeId || "",
                manufactureId: data.manufactureId || "",
                fuelRefillId: data.fuelRefillId || "",
                isActive: data.status || false,
                vehicleId: data.vehicleId || 0
            });
        } catch (error) {
            setDialogMessage(error.message || 'Failed to fetch vehicle details.');
            onDialogOpen();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://localhost:7265/api/Vehicle/UpdateVehicle`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    ...vehicleDetails,
                    status: vehicleDetails.isActive
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update vehicle details.');
            }

            setSuccessDialogMessage('Vehicle details updated successfully.');
            onSuccessDialogOpen();
        } catch (error) {
            setDialogMessage(error.message || 'Failed to update vehicle details.');
            onDialogOpen();
        }
    };

    const handleCancel = () => {
        navigate('/app/VehicleDetailsTable');
    };

    const handleSuccessDialogClose = () => {
        onSuccessDialogClose();
        navigate('/app/VehicleDetailsTable');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVehicleDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "VehicleDetailsTable", link: "/app/VehicleDetailsTable" },
        { label: "EditVehicleDetails", link: "/app/EditvehicleDetails" },
    ];

    return (
        <>
            <PageHeader title="Edit Vehicle Details" breadcrumbs={breadcrumbs} />
            <div className="flex flex-col items-center my-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <p>Vehicle Registration No</p>
                        <Input
                            type="text"
                            name="vehicleRegistrationNo"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Vehicle Registration No"
                            value={vehicleDetails.vehicleRegistrationNo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>License No</p>
                        <Input
                            type="text"
                            name="licenseNo"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="License No"
                            value={vehicleDetails.licenseNo}
                            onChange={handleChange}
                        />
                    </div>
                   
    
                    <div className="flex flex-col gap-3">
                        <p>Manufacture</p>
                        <Input
                            type="text"
                            name="manufactureId"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Manufacture"
                            value={vehicleDetails.manufactureId}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <p>License Expire Date</p>
                        <Input
                            type="text"
                            name="licenseExpireDate"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="License Expire"
                            value={vehicleDetails.licenseExpireDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>Vehicle Color</p>
                        <Input
                            type="text"
                            name="vehicleColor"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Vehicle Color"
                            value={vehicleDetails.vehicleColor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>Vehicle Type</p>
                        <Input
                            type="text"
                            name="vehicleTypeId"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Vehicle Type"
                            value={vehicleDetails.vehicleTypeId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>Manufacture</p>
                        <Input
                            type="text"
                            name="manufactureId"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Manufacture"
                            value={vehicleDetails.manufactureId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p>Fuel Type</p>
                        <Input
                            type="text"
                            name="fuelRefillId"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            width="500px"
                            placeholder="Fuel Type"
                            value={vehicleDetails.fuelRefillId}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <Checkbox
                        size="lg"
                        name="isActive"
                        isChecked={vehicleDetails.isActive}
                        onChange={handleChange}
                        className="mt-8"
                    >
                        Is Active
                    </Checkbox>
                </form>
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
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </div>
            </div>

            <AlertDialog isOpen={isDialogOpen} onClose={onDialogClose} motionPreset="slideInBottom">
                <AlertDialogOverlay />
                <AlertDialogContent position="absolute" top="30%" left="50%" transform="translate(-50%, -50%)">
                    <AlertDialogHeader>Error</AlertDialogHeader>
                    <AlertDialogBody>{dialogMessage}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg={theme.purple} color="#FFFFFF" onClick={onDialogClose}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog isOpen={isSuccessDialogOpen} onClose={handleSuccessDialogClose} motionPreset="slideInBottom">
                <AlertDialogOverlay />
                <AlertDialogContent position="absolute" top="30%" left="50%" transform="translate(-50%, -50%)">
                    <AlertDialogHeader>Success</AlertDialogHeader>
                    <AlertDialogBody>{successDialogMessage}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button bg={theme.purple} color="#FFFFFF" onClick={handleSuccessDialogClose}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
