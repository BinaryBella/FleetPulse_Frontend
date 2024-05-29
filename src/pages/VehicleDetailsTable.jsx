import React, { useState, useEffect, useMemo } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Button,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Input,
    chakra,
    InputGroup,
    InputLeftElement,
    Text,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { TiArrowUnsorted } from "react-icons/ti";
import { IoSearchOutline, IoSettingsSharp } from "react-icons/io5";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Pagination from "../components/Pagination";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

export default function VehicleDetailsTable() {
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const itemsPerPage = 10;

    useEffect(() => {
        fetchVehicleDetails();
    }, []);

    const fetchVehicleDetails = () => {
        // Dummy data for demonstration purposes
        const dummyData = [
            {
                id: 1,
                registrationNo: "ABC123",
                licenseExpireDate: "2024-12-31",
                vehicleModelId: "Model X",
                manufacturer: "Tesla",
                type: "Electric",
                fType: "Electric",
                vehicleColor: "Red",
                isActive: true,
            },
            {
                id: 2,
                registrationNo: "XYZ789",
                licenseExpireDate: "2025-06-30",
                vehicleModelId: "Model S",
                manufacturer: "Tesla",
                type: "Electric",
                fType: "Electric",
                vehicleColor: "Black",
                isActive: false,
            },
            {
                id: 3,
                registrationNo: "LMN456",
                licenseExpireDate: "2023-11-15",
                vehicleModelId: "Model 3",
                manufacturer: "Tesla",
                type: "Electric",
                fType: "Electric",
                vehicleColor: "White",
                isActive: true,
            },
            {
                id: 4,
                registrationNo: "PQR123",
                licenseExpireDate: "2024-04-10",
                vehicleModelId: "Civic",
                manufacturer: "Honda",
                type: "Sedan",
                fType: "Gasoline",
                vehicleColor: "Blue",
                isActive: true,
            },
            {
                id: 5,
                registrationNo: "STU789",
                licenseExpireDate: "2023-08-25",
                vehicleModelId: "Accord",
                manufacturer: "Honda",
                type: "Sedan",
                fType: "Gasoline",
                vehicleColor: "Silver",
                isActive: false,
            },
            {
                id: 6,
                registrationNo: "VWX234",
                licenseExpireDate: "2026-02-19",
                vehicleModelId: "Camry",
                manufacturer: "Toyota",
                type: "Sedan",
                fType: "Gasoline",
                vehicleColor: "Gray",
                isActive: true,
            },
            {
                id: 7,
                registrationNo: "DEF678",
                licenseExpireDate: "2025-09-13",
                vehicleModelId: "Corolla",
                manufacturer: "Toyota",
                type: "Sedan",
                fType: "Gasoline",
                vehicleColor: "Black",
                isActive: true,
            },
            {
                id: 8,
                registrationNo: "GHI345",
                licenseExpireDate: "2024-07-22",
                vehicleModelId: "Mustang",
                manufacturer: "Ford",
                type: "Coupe",
                fType: "Gasoline",
                vehicleColor: "Red",
                isActive: false,
            },
        ];

        setVehicleDetails(dummyData);
    };

    const columns = useMemo(() => [
        {
            accessorKey: 'registrationNo',
            header: 'Reg No',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'licenseExpireDate',
            header: 'License Exp Date',
            meta: { isNumeric: false, filter: 'date' },
        },
        {
            accessorKey: 'vehicleModelId',
            header: 'Model',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'manufacturer',
            header: 'Manufacturer',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'type',
            header: 'Type',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'fType',
            header: 'Fuel Type',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'vehicleColor',
            header: 'Color',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'isActive',
            header: 'Status',
            cell: info => (info.getValue() ? "Active" : "Inactive"),
            meta: { isNumeric: false, filter: 'boolean' },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
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
                            <Link to={'/app/EditVehicleDetails'}>
                                Edit
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            {row.original.isActive ? "Deactivate" : "Activate"}
                        </MenuItem>
                    </MenuList>
                </Menu>
            ),
            meta: { isNumeric: false, filter: null },
            enableSorting: false,
        },
    ], []);

    const table = useReactTable({
        data: vehicleDetails,
        columns,
        state: { sorting, globalFilter: searchInput },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const handleSearchInputChange = (event) => {
        const inputValue = event.target.value.toLowerCase();
        setSearchInput(inputValue);
        table.setGlobalFilter(inputValue);
        setCurrentPage(0);
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const startOffset = currentPage * itemsPerPage;
    const endOffset = startOffset + itemsPerPage;
    const sortedData = table.getRowModel().rows.map(row => row.original);
    const currentData = sortedData.slice(startOffset, endOffset);
    const pageCount = Math.ceil(table.getFilteredRowModel().rows.length / itemsPerPage);
    const isEmpty = currentData.length === 0;
    const iconStyle = { display: "inline-block", verticalAlign: "middle", marginLeft: "5px" };

    const breadcrumbs = [
        { label: "Vehicle", link: "/" },
        { label: "Vehicle Details", link: "/AddVehicleDetails" },
    ];

    return (
        <div className="main-content">
            <PageHeader title="Vehicle Details" breadcrumbs={breadcrumbs} />
            <Box mb="20px" mt="50px" display="flex" alignItems="center" gap="20px" marginTop="60px" marginBottom="10px">
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <IoSearchOutline />
                    </InputLeftElement>
                    <Input
                        placeholder="Search"
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        variant="filled"
                        width="300px"
                    />
                </InputGroup>
                <Link to="/app/AddVehicleDetails">
                    <Button
                        bg={theme.purple}
                        _hover={{ bg: theme.onHoverPurple }}
                        color="white"
                        variant="solid"
                        w="230px"
                        mr="50px"
                    >
                        Add Vehicle Details
                    </Button>
                </Link>
            </Box>

            <Table className="custom-table">
                <Thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const meta = header.column.columnDef.meta;
                                return (
                                    <Th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                        className="custom-table-th"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {header.column.getCanSort() && (
                                            <chakra.span pl="4">
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() === "desc" ? (
                                                        <TriangleDownIcon aria-label="sorted descending" style={iconStyle} />
                                                    ) : (
                                                        <TriangleUpIcon aria-label="sorted ascending" style={iconStyle} />
                                                    )
                                                ) : (
                                                    <TiArrowUnsorted aria-label="unsorted" style={iconStyle} />
                                                )}
                                            </chakra.span>
                                        )}
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {isEmpty ? (
                        <Tr>
                            <Td colSpan={columns.length} textAlign="center">
                                <Text>No results found for {searchInput}</Text>
                            </Td>
                        </Tr>
                    ) : (
                        currentData.map((vehicle, index) => (
                            <Tr key={index}>
                                <Td>{vehicle.registrationNo}</Td>
                                <Td>{vehicle.licenseExpireDate}</Td>
                                <Td>{vehicle.vehicleModelId}</Td>
                                <Td>{vehicle.manufacturer}</Td>
                                <Td>{vehicle.type}</Td>
                                <Td>{vehicle.fType}</Td>
                                <Td>{vehicle.vehicleColor}</Td>
                                <Td>{vehicle.isActive ? "Active" : "Inactive"}</Td>
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
                                                <Link to={'/app/EditVehicleDetails'}>
                                                    Edit
                                                </Link>
                                            </MenuItem>
                                            <MenuItem>
                                                {vehicle.isActive ? "Deactivate" : "Activate"}
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
            {!isEmpty && (
                <Pagination
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                />
            )}
        </div>
    );
}