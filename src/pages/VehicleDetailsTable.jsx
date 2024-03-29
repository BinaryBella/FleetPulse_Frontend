import { useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button, Menu, MenuButton, IconButton, MenuList, MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { IoSettingsSharp } from "react-icons/io5";

export default function VehicleDetailsTable() {
    // const [vehicleDetails, setVehicleDetails] = useState([]);
    
    // useEffect(() => {
       
    //         try {
    //             const response =  axios.get('URL_TO_YOUR_API_ENDPOINT');
    //             setVehicleDetails(response.data);
               
    //         } catch (error) {
                
               
    //         }
    //     },


    //  []);
    const [vehicleDetails] = useState([
        {
            registrationNo: "ABC123",
            vehicleModel: "Model X",
            manufacture: "Tesla",
            licenseNo: "XYZ456",
            licenseExpireDate: "2024-12-31",
            vehicleColour: "Red",
            vehicleType: "SUV",
            fuelType: "Electric",
            isActive: true,
        },
        {
            registrationNo: "DEF456",
            vehicleModel: "Model S",
            manufacture: "Tesla",
            licenseNo: "PQR789",
            licenseExpireDate: "2025-06-30",
            vehicleColour: "Blue",
            vehicleType: "Sedan",
            fuelType: "Electric",
            isActive: false,
        },
    ]);

    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "Vehicle Details", link: "/app/AddVehicleDetails" },
    ];

    return (
        <>
            <PageHeader title="Add Vehicle Details" breadcrumbs={breadcrumbs} />

            <Link to="/AddVehicleDetails">
                <Button
                    bg={theme.purple}
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
                        <Th>Type</Th>
                        <Th>Fuel Type</Th>
                        <Th>Color</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {vehicleDetails.map((vehicle, index) => (
                        <Tr key={index}>
                            <Td>{vehicle.registrationNo}</Td>
                            <Td>{vehicle.licenseExpireDate}</Td>
                            <Td>{vehicle.vehicleModel}</Td>
                            <Td>{vehicle.manufacture}</Td>
                            <Td>{vehicle.vehicleType}</Td>
                            <Td>{vehicle.fuelType}</Td>
                            <Td>{vehicle.vehicleColour}</Td>
                            <Td>{vehicle.isActive ? "Active" : "Inactive"}</Td>
                            <Td>
                                <Menu>
                                    <MenuButton
                                        color={theme.purple}
                                        as={IconButton}
                                        aria-label='profile-options'
                                        fontSize='20px'
                                        icon={<IoSettingsSharp/>}
                                    />
                                    <MenuList>
                                        <MenuItem>
                                            <Link to="" >
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

