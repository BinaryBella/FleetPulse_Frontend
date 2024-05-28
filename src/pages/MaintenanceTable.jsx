import { useState, useEffect } from "react";
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

export default function MaintenanceTable() {
    const [vehicleMaintenance, setVehicleMaintenance] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const itemsPerPage = 10;

    useEffect(() => {
        fetchVehicleMaintenance();
    }, []);

    const fetchVehicleMaintenance = async () => {
        try {
            // Dummy data for vehicle maintenance
            const dummyData = Array.from({ length: 20 }, (_, index) => ({
                maintenanceId: index + 1,
                vehicleRegistrationNo: `ABC123${index}`,
                typeName: `Type ${index + 1}`,
                maintenanceDate: `2024-05-${String(index + 1).padStart(2, '0')}T12:00:00Z`,
                cost: (Math.random() * 100).toFixed(2),
                partsReplaced: `Part ${index + 1}`,
                serviceProvider: `ServiceProvider ${index + 1}`,
                specialNotes: `Special notes ${index + 1}`,
                status: index % 2 === 0,
            }));

            // Set the dummy data to state
            setVehicleMaintenance(dummyData);
        } catch (error) {
            console.error("Error fetching vehicle maintenance:", error);
        }
    };

    const columns = [
        {
            accessorKey: 'vehicleRegistrationNo',
            header: 'Vehicle Registration No',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'typeName',
            header: 'Maintenance Type',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'maintenanceDate',
            header: 'Date',
            cell: info => formatDate(info.row.original),
            meta: { isNumeric: false, filter: 'date' },
        },
        {
            accessorKey: 'cost',
            header: 'Cost',
            meta: { isNumeric: true, filter: 'text' },
        },
        {
            accessorKey: 'partsReplaced',
            header: 'Parts Replaced',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'serviceProvider',
            header: 'Service Provider',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'specialNotes',
            header: 'Special Notes',
            meta: { isNumeric: false, filter: 'text' },
        },
        {
            accessorKey: 'status',
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
                            <Link to={`/app/EditMaintenance/${row.original.maintenanceId}`}>
                                Edit
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            {row.original.status ? "Deactivate" : "Activate"}
                        </MenuItem>
                    </MenuList>
                </Menu>
            ),
            meta: { isNumeric: false, filter: null },
            enableSorting: false,
        },
    ];

    const table = useReactTable({
        data: vehicleMaintenance,
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

    const formatDate = (maintenance) => {
        if (!maintenance.maintenanceDate) return 'N/A';
        const datetimeParts = maintenance.maintenanceDate.split("T");
        return datetimeParts[0] || 'Invalid Date';
    };

    const breadcrumbs = [
        { label: "Vehicle", link: "/app/Vehicle" },
        { label: "Vehicle Maintenance Details", link: "/app/MaintenanceTable" },
    ];

    return (
        <div className="main-content">
            <PageHeader title="Vehicle Maintenance Details" breadcrumbs={breadcrumbs} />
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
                <Link to="/app/AddVehicleMaintenanceDetails">
                    <Button
                        bg={theme.purple}
                        _hover={{ bg: theme.onHoverPurple }}
                        color="white"
                        variant="solid"
                        w="260px"
                        mr="60px"
                    >
                        Add Vehicle Maintenance Details
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
                        currentData.map((maintenance, index) => (
                            <Tr key={index}>
                                <Td>{maintenance.vehicleRegistrationNo}</Td>
                                <Td>{maintenance.typeName}</Td>
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
                                                <Link to={`/app/EditVehicleMaintenanceDetails`}>
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
