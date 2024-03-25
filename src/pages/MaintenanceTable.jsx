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

export default function MaintenanceTable() {
    const [vehicleDetails] = useState([
        {
            registrationNo: "ABC123",
            MaintenanceDate: new Date("2024-03-22"),
            MaintenanceStatus: "Completed",
            Description: "Routine checkup",
            Cost: 100.50,
            PartsReplaced: "Engine oil",
            ServiceProvider: "AutoCare Services",
            SpecialNotes: "No additional notes",
            isActive: true,

        },
        {
            registrationNo: "ABC123",
            MaintenanceDate: new Date("2024-03-15"),
            MaintenanceStatus: "In Progress",
            Description: "Brake replacement",
            Cost: 200.75,
            PartsReplaced: "Brake pads",
            ServiceProvider: "Speedy Auto Repairs",
            SpecialNotes: "Urgent service required",
            isActive: true,
        }
    ]);

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
                    right="0"
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
                    {vehicleDetails.map((maintenance, index) => (
                        <Tr key={index}>
                            <Td>{maintenance.registrationNo}</Td>
                            <Td>{maintenance.MaintenanceDate.toString()}</Td>
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
                                            <Link to="/app/AddVehicleDetails" >
                                                Edit
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            Inactive
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
