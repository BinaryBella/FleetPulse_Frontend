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

export default function VehicleModelTable() {
    const [vehicleDetails] = useState([
        {

            vehicleModel: "Model X",
            isActive: true,
        },
        {
            vehicleModel: "Model Y",
            isActive: false,
        },
    ]);

    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "Vehicle Model", link: "/" },
    ];

    return (
        <>
            <PageHeader title="Vehicle Model" breadcrumbs={breadcrumbs} />

            <Link to="/app/AddVehicleModel">
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
                    Add Vehicle Model
                </Button>
            </Link>

            <Table className="custom-table">
                <Thead>
                    <Tr>
                        <Th>Vehicle Model</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {vehicleDetails.map((vehicle, index) => (
                        <Tr key={index}>
                            <Td>{vehicle.vehicleModel}</Td>
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

