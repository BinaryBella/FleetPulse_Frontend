import { useState, useEffect } from "react";
import axios from "axios";
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

export default function MaintenanceTypeTable() {
    const [vehicleDetails, setVehicleDetails] = useState([]);

    const fetchVehicleMaintenanceTypes = async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/VehicleMaintenanceType");
            setVehicleDetails(response.data);
        } catch (error) {
            console.error("Error fetching vehicle maintenance types:", error);
        }
    };

    useEffect(() => {
        fetchVehicleMaintenanceTypes();
    }, []);

    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "Vehicle Maintenance Type", link: "/" },
    ];

    return (
        <>
            <PageHeader title="Vehicle Maintenance Type" breadcrumbs={breadcrumbs} />

            <Link to="/app/AddMaintenanceType">
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
                    right="50"
                >
                    Add Vehicle Maintenance Type
                </Button>
            </Link>

            <Table className="custom-table">
                <Thead>
                    <Tr>
                        <Th>Vehicle Maintenance Type</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {vehicleDetails.map((vehicle, index) => (
                        <Tr key={index}>
                            <Td>{vehicle.typeName}</Td>
                            <Td>{vehicle.status ? "Active" : "Inactive"}</Td>
                            <Td>
                                <Menu>
                                    <MenuButton
                                        color={theme.purple}
                                        as={IconButton}
                                        aria-label="profile-options"
                                        fontSize="20px"
                                        icon={<IoSettingsSharp />}
                                    />
                                    <MenuList>
                                        <MenuItem>
                                            <Link to={`/app/EditMaintenanceType/${vehicle.id}`}>
                                                Edit
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            {vehicle.status ? "Deactivate" : "Activate"}
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
