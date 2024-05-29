import React, { useState, useEffect } from "react";
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

export default function AccidentDetails() {
  const [accidentDetails, setAccidentDetails] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;


  useEffect(() => {
    fetchAccidentDetails();
}, []);
const fetchAccidentDetails = () => {
  const dummyData= [
    {
      id: 1,
      driverInjured: "John Doe",
      dateTime: "2024-01-01 14:30",
      venue: "Main Street",
      helperInjured: "None",
      vehicleDamaged: "Car A",
      loss: "$5000",
      specialNote: "Heavy rain",
      photos: "URL to photos",
    },
    {
      id: 2,
      driverInjured: "Jane Smith",
      dateTime: "2024-02-15 09:00",
      venue: "Highway 21",
      helperInjured: "John Smith",
      vehicleDamaged: "Truck B",
      loss: "$2000",
      specialNote: "Foggy conditions",
      photos: "URL to photos",
    },
    {
      id: 3,
      driverInjured: "Alice Johnson",
      dateTime: "2024-03-10 16:45",
      venue: "Downtown",
      helperInjured: "None",
      vehicleDamaged: "Van C",
      loss: "$3500",
      specialNote: "Slippery road",
      photos: "URL to photos",
    },
    {
      id: 4,
      driverInjured: "Bob Brown",
      dateTime: "2024-04-22 12:30",
      venue: "City Park",
      helperInjured: "Sarah Brown",
      vehicleDamaged: "Bike D",
      loss: "$800",
      specialNote: "Pedestrian involved",
      photos: "URL to photos",
    },
    {
      id: 5,
      driverInjured: "Charlie Davis",
      dateTime: "2024-05-05 19:00",
      venue: "Old Bridge",
      helperInjured: "None",
      vehicleDamaged: "Car E",
      loss: "$6000",
      specialNote: "Bridge collapse",
      photos: "URL to photos",
    },
    {
      id: 6,
      driverInjured: "Diana Evans",
      dateTime: "2024-06-18 11:15",
      venue: "Airport Road",
      helperInjured: "Mike Evans",
      vehicleDamaged: "Bus F",
      loss: "$7000",
      specialNote: "Engine failure",
      photos: "URL to photos",
    },
    {
      id: 7,
      driverInjured: "Frank Green",
      dateTime: "2024-07-08 21:00",
      venue: "Seaside Boulevard",
      helperInjured: "None",
      vehicleDamaged: "Truck G",
      loss: "$4500",
      specialNote: "High tide",
      photos: "URL to photos",
    },
    {
      id: 8,
      driverInjured: "Gina Harris",
      dateTime: "2024-08-14 05:30",
      venue: "Mountain Pass",
      helperInjured: "Tom Harris",
      vehicleDamaged: "Car H",
      loss: "$9000",
      specialNote: "Rockslide",
      photos: "URL to photos",
    },
  ];
  setAccidentDetails(dummyData);
};

  const columns = [
    {
      accessorKey: "driverInjured",
      header: "Driver Injured",
      meta: { isNumeric: false, filter: "text" },
    },
    {
      accessorKey: "dateTime",
      header: "Date Time",
      meta: { isNumeric: false, filter: "text" },
    },
    {
      accessorKey: "venue",
      header: "Venue",
      meta: { isNumeric: false, filter: "date" },
    },
    {
      accessorKey: "helperInjured",
      header: "Helper Injured",
      meta: { isNumeric: false, filter: "text" },
    },
    {
      accessorKey: "vehicleDamaged",
      header: "Vehicle Damaged",
      meta: { isNumeric: false, filter: "text" },
    },
    {
      accessorKey: "loss",
      header: "Loss",
      meta: { isNumeric: false, filter: "text" },
    },
    {
      accessorKey: "specialNote",
      header: "Special Note",
      meta: { isNumeric: false, filter: "text" },
    },
    {
      accessorKey: "photos",
      header: "Photos",
      meta: { isNumeric: false, filter: "text" },
    },
    
    {
      id: "actions",
      header: "Actions",
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
              <Link to={`/app/EditAccidentDetails`}>
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
    data: accidentDetails,
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
    { label: "Accidents", link: "/app/Accidents" },
    { label: "Accident Details", link: "/app/AccidentDetails" },
    { label: "Add Accident Details", link: "/app/AddAccidentDetails" },
  ];

  return (
    <div className="main-content">
      <PageHeader title="Accident Details" breadcrumbs={breadcrumbs} />
      <Box mb="20px" mt="50px" display="flex" alignItems="center" gap="20px" marginBottom="10px">
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
        <Link to="/app/AddAccidentDetails">
          <Button
            bg={theme.purple}
            _hover={{ bg: theme.onHoverPurple }}
            color="white"
            variant="solid"
            ml="auto"
            mr="50px"
          >
            Add New Accident
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
            currentData.map((accident, index) => (
              <Tr key={index}>
                  <Td>{accident.driverInjured}</Td>
                  <Td>{accident.dateTime}</Td>
                  <Td>{accident.venue}</Td>
                  <Td>{accident.helperInjured}</Td>
                  <Td>{accident.vehicleDamaged}</Td>
                  <Td>{accident.loss}</Td>
                  <Td>{accident.specialNote}</Td>
                  <Td><a href={accident.photos} target="_blank" rel="noopener noreferrer">View Photos</a></Td>
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
                        <Link to={`/app/EditAccidentDetails`}>
                          Edit
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        {accident.isActive ? "Deactivate" : "Activate"}
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

