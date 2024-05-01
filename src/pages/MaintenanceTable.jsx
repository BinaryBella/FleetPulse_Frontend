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

export default function MaintenanceTable() {
    const [vehicleMaintenance, setvehicleMaintenance] = useState([]);
    const fetchVehicleMaintenance = async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/VehicleMaintenance");
            setvehicleMaintenance(response.data);
        } catch (error) {
            console.error("Error fetching vehicle maintenance types:", error);
        }
    };

    useEffect(() => {
        fetchVehicleMaintenance();
    }, []);

    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "Vehicle Maintenance Details", link: "/" },
    ];

    return (
        <>
            <PageHeader title="Vehicle Maintenance Details" breadcrumbs={breadcrumbs} />

            <Link to="/app/AddVehicleMaintenanceDetails">
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
                    Add Maintenance Details
                </Button>
            </Link>

            <Table className="custom-table">
                <Thead>
                    <Tr>
                        <Th>Reg No</Th>
                        <Th>Maintenance Date</Th>
                        <Th>Maintenance Status</Th>
                        <Th>Description</Th>
                        <Th>Cost</Th>
                        <Th>Parts Replaced</Th>
                        <Th>Service Provider</Th>
                        <Th>Special Notes</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {vehicleMaintenance.map((maintenance, index) => (
                        <Tr key={index}>
                            <Td>{maintenance.registrationNo}</Td>
                            <Td>{maintenance.MaintenanceDate}</Td>
                            <Td>{maintenance.MaintenanceStatus}</Td>
                            <Td>{maintenance.Description}</Td>
                            <Td>{maintenance.Cost}</Td>
                            <Td>{maintenance.PartsReplaced}</Td>
                            <Td>{maintenance.ServiceProvider}</Td>
                            <Td>{maintenance.SpecialNotes}</Td>
                            <Td>{maintenance.isActive ? "Active" : "Inactive"}</Td>
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
                                            <Link to={`/app/EditMaintenance/${vehicleMaintenance.id}`}>
                                                Edit
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            {vehicleMaintenance.status ? "Deactivate" : "Activate"}
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
