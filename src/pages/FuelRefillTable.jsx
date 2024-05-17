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

export default function FuelRefillTable() {
    const [vehicleDetails,setVehicleDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;


    const fetchFuelRefill = async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/FuelRefill");
            setVehicleDetails(response.data);
        } catch (error) {
            console.error("Error fetching fuel Reill :", error);
        }
    };

    const breadcrumbs = [
        { label: "Vehicle", link: "/app/Vehicle" }, //yashmi
        { label: "Fuel Refill Details", link: "/app/FuelRefillTable" },
    ];

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startOffset = currentPage * itemsPerPage;
    const endOffset = startOffset + itemsPerPage;
    const currentData = vehicleDetails.slice(startOffset, endOffset);
    const pageCount = Math.ceil(vehicleDetails.length / itemsPerPage);


    return (
        <div className="main-content">
            <PageHeader title="Fuel Refill Details" breadcrumbs={breadcrumbs}/>
            <Link to="/app/AddFuelRefillDetails">
                <Button
                    bg={theme.purple}
                    _hover={{bg: theme.onHoverPurple}}
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
                    Add Fuel Refill Details
                </Button>
            </Link>

            <Box mb="20px">
            <Table className="custom-table">
                <Thead className="sticky-header">
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
                    {currentData.map((fuelRefill, index) => (
                        <Tr key={index}>
                            <Td>{fuelRefill.DriverNic}</Td>
                            <Td>{fuelRefill.HelperNic}</Td>
                            <Td>{fuelRefill.RegNo}</Td>
                            <Td>{fuelRefill.LiterCount}</Td>
                            <Td>{fuelRefill.DateTime}</Td>
                            <Td>{fuelRefill.RefillType}</Td>
                            <Td>{fuelRefill.Cost}</Td>
                            <Td>{fuelRefill.isActive ? "Active" : "Inactive"}</Td>
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
                                            <Link to={`/app/EditMaintenanceType/${fuelRefill.id}`}>
                                                Edit
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            {fuelRefill.status ? "Deactivate" : "Activate"}
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            </Box>

            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                marginPagesDisplayed={2}
                marginTop={5}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
}
