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

export default function FuelRefillTable() {
    const [vehicleDetails] = useState([
        {
            DriverNic: "1234567890123",
            HelperNic: "9876543210987",
            RegNo: "ABC123",
            LiterCount: 40,
            DateTime: "2024-03-22T08:30:00",
            RefillType: "Regular",
            Cost: 50.75,
            isActive: true

        },
        {
            DriverNic: "2345678901234",
            HelperNic: "8765432109876",
            RegNo: "DEF456",
            LiterCount: 35,
            DateTime: "2024-03-21T15:45:00",
            RefillType: "Premium",
            Cost: 65.25,
            isActive: true

        }
    ]);

    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "Fuel Refill Details", link: "/" },
    ];

    return (
        <>
            <PageHeader title="Fuel Refill Details" breadcrumbs={breadcrumbs} />

            <Link to="/app/AddFuelRefillDetails">
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
                    Add Fuel Refill Details
                </Button>
            </Link>

            <Table className="custom-table">
                <Thead>
                    <Tr>
                        <Th>Driver NIC</Th>
                        <Th>Helper NIC</Th>
                        <Th>Reg No</Th>
                        <Th>Liter Count</Th>
                        <Th>Date Time</Th>
                        <Th>Refill Type</Th>
                        <Th>Cost</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {vehicleDetails.map((maintenance, index) => (
                        <Tr key={index}>
                            <Td>{maintenance.DriverNic}</Td>
                            <Td>{maintenance.HelperNic}</Td>
                            <Td>{maintenance.RegNo}</Td>
                            <Td>{maintenance.LiterCount}</Td>
                            <Td>{maintenance.DateTime}</Td>
                            <Td>{maintenance.RefillType}</Td>
                            <Td>{maintenance.Cost}</Td>
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
