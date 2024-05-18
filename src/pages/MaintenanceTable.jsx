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
    Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { IoSettingsSharp } from "react-icons/io5";
import ReactPaginate from 'react-paginate';

export default function MaintenanceTable() {
    const [vehicleMaintenance, setVehicleMaintenance] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [error, setError] = useState(null);


    const fetchVehicleMaintenance = async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/VehicleMaintenance");
            const responseData = response.data;
            console.log(responseData); // Check if these fields are present in the response
            setVehicleMaintenance(responseData);
        } catch (error) {
            console.error("Error fetching vehicle maintenance:", error);
            setError("Error fetching vehicle maintenance. Please try again later.");
        }
    };


    useEffect(() => {
        fetchVehicleMaintenance();
    }, []);

    const breadcrumbs = [
        { label: "Vehicle", link: "/app/Vehicle" },
        { label: "Vehicle Maintenance Details", link: "/app/MaintenanceTable" },
    ];

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startOffset = currentPage * itemsPerPage;
    const endOffset = startOffset + itemsPerPage;
    const currentData = vehicleMaintenance.slice(startOffset, endOffset);
    const pageCount = Math.ceil(vehicleMaintenance.length / itemsPerPage);

    const formatDate = (maintenance) => {
        if (!maintenance.maintenanceDate) return 'N/A';
        const datetimeParts = maintenance.maintenanceDate.split("T");
        return datetimeParts[0] || 'Invalid Date';
    };

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

            <Box mb="20px">
                <Table className="custom-table">
                    <Thead>
                        <Tr>
                            <Th>Vehicle Registration No</Th>
                            <Th>Maintenance Type</Th>
                            <Th>Maintenance Date</Th>
                            <Th>Cost</Th>
                            <Th>Parts Replaced</Th>
                            <Th>Service Provider</Th>
                            <Th>Special Notes</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentData.map((maintenance, index) => (
                            <Tr key={index}>
                                <Td>{maintenance.vehicleRegistrationNo}</Td>
                                <Td>{maintenance.vehicleMaintenanceTypeName}</Td>
                                <Td>{formatDate(maintenance)}</Td>
                                <Td>{maintenance.cost}</Td>
                                <Td>{maintenance.partsReplaced}</Td>
                                <Td>{maintenance.serviceProvider}</Td>
                                <Td>{maintenance.specialNotes}</Td>
                                <Td>{maintenance.status ? "Active" : "Inactive"}</Td>
                                <Td>
                                    <Menu>
                                        <MenuButton
                                            color={theme.purple}
                                            as={IconButton}
                                            aria-label='profile-options'
                                            fontSize='20px'
                                            icon={<IoSettingsSharp />}
                                        />
                                        <MenuList>
                                            <MenuItem>
                                                <Link to={`/app/EditMaintenance/${maintenance.maintenanceId}`}>
                                                    Edit
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                {maintenance.status ? "Deactivate" : "Activate"}
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

            </Box>
            {error && (
                <div className="mt-4 text-red-500 dark:text-red-400">{error}</div>
            )}
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                marginPagesDisplayed={2}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </>
    );
}