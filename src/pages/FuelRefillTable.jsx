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
    const [fuelRefillDetails, setFuelRefillDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [error, setError] = useState(null);

    const fetchFuelRefill = async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/FuelRefill");
            const responseData = response.data;
            console.log(responseData); // Check if these fields are present in the response
            setFuelRefillDetails(responseData);
        } catch (error) {
            console.error("Error fetching fuel refills:", error);
            setError("Error fetching fuel refill. Please try again later.");
        }
    };

    useEffect(() => {
        fetchFuelRefill();
    }, []);

    const breadcrumbs = [
        { label: "Vehicle", link: "/app/Vehicle" },
        { label: "Fuel Refill Details", link: "/app/FuelRefillTable" },
    ];

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startOffset = currentPage * itemsPerPage;
    const endOffset = startOffset + itemsPerPage;
    const currentData = fuelRefillDetails.slice(startOffset, endOffset);
    const pageCount = Math.ceil(fuelRefillDetails.length / itemsPerPage);

    return (
        <div className="main-content">
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
                    right="50"
                >
                    Add Fuel Refill Details
                </Button>
            </Link>

            <Box mb="20px">
                <Table className="custom-table">
                    <Thead className="sticky-header">
                        <Tr>
                            <Th>User NIC</Th>
                            <Th>Vehicle Registration No</Th>
                            <Th>Liter Count</Th>
                            <Th>Date</Th>
                            <Th>Time</Th>
                            <Th>Refill Type</Th>
                            <Th>Cost</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentData.map((fuelRefill,index) => (
                            <Tr key={index}>
                                <Td>{fuelRefill.nic}</Td>
                                <Td>{fuelRefill.vehicleRegistrationNo}</Td>
                                <Td>{fuelRefill.literCount}</Td>
                                <Td>{fuelRefill.date}</Td>
                                <Td>{fuelRefill.time}</Td>
                                <Td>{fuelRefill.fType}</Td>
                                <Td>{fuelRefill.cost}</Td>
                                <Td>{fuelRefill.status ? "Active" : "Inactive"}</Td>
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
                                                <Link to={`/app/EditFuelRefill/${fuelRefill.fuelRefillId}`}>
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
