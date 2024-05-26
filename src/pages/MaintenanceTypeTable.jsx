import { useState, useEffect, useRef } from "react";
import axios from "axios";
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
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialog,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { TiArrowUnsorted } from "react-icons/ti";
import { IoSettingsSharp, IoSearchOutline } from "react-icons/io5";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Pagination from "../components/Pagination";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel
} from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

export default function MaintenanceTypeTable() {
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [selectedType, setSelectedType] = useState(null);
    const cancelRef = useRef();
    const { isOpen: isDialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDisclosure();
    const itemsPerPage = 10;
    const toast = useToast();

    useEffect(() => {
        fetchVehicleMaintenanceTypes();
    }, []);

    const onClickDelete = (maintenanceType) => {
        setSelectedType(maintenanceType);
        onDialogOpen();
    };

    const onConfirmDelete = async () => {
        try {
            const endpoint = `https://localhost:7265/api/VehicleMaintenanceType/${selectedType.id}/${selectedType.status ? 'deactivate' : 'activate'}`;
            await axios.put(endpoint);
            fetchVehicleMaintenanceTypes(); // Refresh the list after update
            onDialogClose();
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data === "MaintenanceType is active and associated with maintenance records. Cannot deactivate.") {
                toast({
                    title: "Error",
                    description: "MaintenanceType is active and associated with maintenance records. Cannot deactivate.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                console.error("Error updating vehicle maintenance type status:", error);
            }
        }
    };

    const fetchVehicleMaintenanceTypes = async () => {
        try {
            const response = await axios.get("https://localhost:7265/api/VehicleMaintenanceType");
            setVehicleDetails(response.data);
        } catch (error) {
            console.error("Error fetching vehicle maintenance types:", error);
        }
    };

    const columns = [
        {
            accessorKey: 'typeName',
            header: 'Vehicle Maintenance Type',
            meta: { isNumeric: false, filter: 'text' }
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: info => (info.getValue() ? "Active" : "Inactive"),
            meta: { isNumeric: false, filter: 'boolean' }
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
                            <Link to={`/app/EditMaintenanceType/${row.original.id}`}>
                                Edit
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={() => onClickDelete(row.original)}>
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

    const breadcrumbs = [
        { label: "Vehicle", link: "/app/Vehicle" },
        { label: "Vehicle Maintenance Type", link: "/app/MaintenanceTypeTable" }
    ];

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

    return (
        <div className="main-content">
            <PageHeader title="Vehicle Maintenance Type" breadcrumbs={breadcrumbs} />
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
                <Link to="/app/AddMaintenanceType">
                    <Button
                        bg={theme.purple}
                        _hover={{ bg: theme.onHoverPurple }}
                        color="white"
                        variant="solid"
                        w="260px"
                        mr="60px"
                    >
                        Add Vehicle Maintenance Type
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
                        currentData.map((maintenanceType, index) => (
                            <Tr key={index}>
                                <Td className="custom-table-td">{maintenanceType.typeName}</Td>
                                <Td className="custom-table-td">{maintenanceType.status ? "Active" : "Inactive"}</Td>
                                <Td className="custom-table-td">
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
                                                <Link to={`/app/EditMaintenanceType/${maintenanceType.id}`}>
                                                    Edit
                                                </Link>
                                            </MenuItem>
                                            <MenuItem onClick={() => onClickDelete(maintenanceType)}>
                                                {maintenanceType.status ? "Deactivate" : "Activate"}
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

            <AlertDialog isOpen={isDialogOpen} onClose={onDialogClose} motionPreset="slideInBottom" leastDestructiveRef={cancelRef}>
                <AlertDialogOverlay />
                <AlertDialogContent position="absolute" top="30%" left="50%" transform="translate(-50%, -50%)">
                    <AlertDialogHeader>{selectedType?.status ? "Deactivate" : "Activate"} Maintenance Type</AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to {selectedType?.status ? "deactivate" : "activate"} {selectedType?.typeName} Maintenance Type?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <div className="flex flex-row gap-8">
                            <Button bg="gray.400" _hover={{bg: "gray.500"}} color="#ffffff" variant="solid"
                                    onClick={onDialogClose} ref={cancelRef}>Cancel</Button>
                            <Button colorScheme='red' color="#FFFFFF" onClick={onConfirmDelete}>
                                {selectedType?.status ? "Deactivate" : "Activate"}
                            </Button>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
