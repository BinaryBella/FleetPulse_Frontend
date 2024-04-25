import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { IoSettingsSharp } from "react-icons/io5";

export default function VehicleDetailsTable() {
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:7265/api/Vehicle')
            .then(response => {
                setVehicleDetails(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "Vehicle Details", link: "/app/AddVehicleDetails" },
    ];

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <PageHeader title="Add Vehicle Details" breadcrumbs={breadcrumbs} />

<<<<<<< HEAD
            <Link to="AddVehicleDetails">
                <Button
                    bg={theme.purple}
=======
            <Link to="/app/AddVehicleDetails">
                <Button
                    bg={theme.purple}
                    
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b
                    _hover={{ bg: theme.onHoverPurple }}
                    color="white"
                    variant="solid"
                    w="230px"
                    marginTop="60px"
                    marginBottom="20px"
                    mr="10px"
                    position="absolute"
                    top="130"
                    right="0"
                >
                    Add Vehicle Details
                </Button>
            </Link>

            <Table className="custom-table" >
                <Thead>
                    <Tr>
                        <Th>Reg No</Th>
                        <Th>License Exp Date</Th>
                        <Th>Model</Th>
                        <Th>Manufacture</Th>
<<<<<<< HEAD
                        <Th>Type</Th>
                        <Th>Fuel Type</Th>
=======
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b
                        <Th>Color</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {vehicleDetails.map((vehicle, index) => (
                        <Tr key={index}>
<<<<<<< HEAD
                            <Td>{vehicle.registrationNo}</Td>
                            <Td>{vehicle.licenseExpireDate}</Td>
                            <Td>{vehicle.vehicleModelId}</Td>
                            <Td>{vehicle.manufacturer}</Td>
                            <Td>{vehicle.type}</Td>
                            <Td>{vehicle.fType}</Td>
=======
                            <Td>{vehicle.vehicleRegistrationNo}</Td>
                            <Td>{vehicle.licenseExpireDate}</Td>
                            <Td>{vehicle.vehicleModelId}</Td>
                            <Td>{vehicle.manufactureId}</Td>
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b
                            <Td>{vehicle.vehicleColor}</Td>
                            <Td>{vehicle.isActive ? "Active" : "Inactive"}</Td>
                            <Td>
                                <Menu>
                                    <MenuButton
                                        color={theme.purple}
<<<<<<< HEAD
=======
                            
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b
                                        as={IconButton}
                                        aria-label='profile-options'
                                        fontSize='20px'
                                        icon={<IoSettingsSharp/>}
                                    />
                                    <MenuList>
                                        <MenuItem>
                                            <Link to={`/editVehicle/${vehicle.id}`} >
                                                Edit
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to="" >
                                                Inactive
                                            </Link>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
}
