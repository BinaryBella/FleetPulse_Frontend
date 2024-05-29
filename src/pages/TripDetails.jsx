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

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTripDetails();
}, []);


    const fetchTripDetails = () => {


        const dummyData = [
          {
            id: 1,
            driversNIC: "123456789V",
            HelpersNIC: "987654321V",
            vehicleRegNo: "ABC1234",
            date: "2023-05-27",
            startTime: "08:00",
            endTime: "10:00",
            startLocation: "Colombo",
            endLocation: "Kandy",
            isActive: true,
          },
          {
            id: 2,
            driversNIC: "223456789V",
            HelpersNIC: "887654321V",
            vehicleRegNo: "DEF5678",
            date: "2023-05-28",
            startTime: "09:00",
            endTime: "11:00",
            startLocation: "Galle",
            endLocation: "Matara",
            isActive: false,
          },
          {
            id: 3,
            driversNIC: "323456789V",
            HelpersNIC: "787654321V",
            vehicleRegNo: "GHI9101",
            date: "2023-05-29",
            startTime: "10:00",
            endTime: "12:00",
            startLocation: "Negombo",
            endLocation: "Jaffna",
            isActive: true,
          },
          {
            id: 4,
            driversNIC: "423456789V",
            HelpersNIC: "687654321V",
            vehicleRegNo: "JKL1213",
            date: "2023-05-30",
            startTime: "11:00",
            endTime: "13:00",
            startLocation: "Kandy",
            endLocation: "Colombo",
            isActive: true,
          },
          {
            id: 5,
            driversNIC: "523456789V",
            HelpersNIC: "587654321V",
            vehicleRegNo: "MNO1415",
            date: "2023-06-01",
            startTime: "12:00",
            endTime: "14:00",
            startLocation: "Batticaloa",
            endLocation: "Trincomalee",
            isActive: true,
          },
          {
            id: 6,
            driversNIC: "623456789V",
            HelpersNIC: "487654321V",
            vehicleRegNo: "PQR1617",
            date: "2023-06-02",
            startTime: "13:00",
            endTime: "15:00",
            startLocation: "Matara",
            endLocation: "Galle",
            isActive: true,
          },
          {
            id: 7,
            driversNIC: "723456789V",
            HelpersNIC: "387654321V",
            vehicleRegNo: "STU1819",
            date: "2023-06-03",
            startTime: "14:00",
            endTime: "16:00",
            startLocation: "Kandy",
            endLocation: "Nuwara Eliya",
            isActive: true,
          },
          {
            id: 8,
            driversNIC: "823456789V",
            HelpersNIC: "287654321V",
            vehicleRegNo: "VWX2021",
            date: "2023-06-04",
            startTime: "15:00",
            endTime: "17:00",
            startLocation: "Jaffna",
            endLocation: "Vavuniya",
            isActive: true,
          },
        ];
        setTripDetails(dummyData);
      } ;

      const columns = [
        {
          accessorKey: "driversNIC",
          header: "Driver's NIC",
          meta: { isNumeric: false, filter: "text" },
        },
        {
          accessorKey: "helpersNIC",
          header: "Helper's NIC",
          meta: { isNumeric: false, filter: "text" },
        },
        {
          accessorKey: "vehicleRegNo",
          header: "Vehicle Registration No",
          meta: { isNumeric: false, filter: "date" },
        },
        {
          accessorKey: "date",
          header: "Date",
          meta: { isNumeric: false, filter: "text" },
        },
        {
          accessorKey: "startTime",
          header: "Start Time",
          meta: { isNumeric: false, filter: "text" },
        },
        {
          accessorKey: "endTime",
          header: "End Time.",
          meta: { isNumeric: false, filter: "text" },
        },
        {
          accessorKey: "startLocation",
          header: "Start Location",
          meta: { isNumeric: false, filter: "text" },
        },
        {
          accessorKey: "endLocation",
          header: "End Location",
          meta: { isNumeric: false, filter: "text" },
        },
        {
          accessorKey: "status",
          header: "Status",
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
                  <Link to={`/app/EditTripDetails`}>
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
        data: tripDetails,
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
    { label: "Trip", link: "/app/Trip" },
    { label: "Trip Details", link: "/app/TripDetails" },
    { label: "Add Trip Details", link: "/app/AddTripDetails" },
  ];

  return (
    <div className="main-content">
      <PageHeader title="Trip Details" breadcrumbs={breadcrumbs} />
      <Box mb="20px" mt="50px" display="flex" alignItems="center" gap="20px" marginBottom="10px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoSearchOutline />
          </InputLeftElement>-
          <Input
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
            variant="filled"
            width="300px"
          />
        </InputGroup>
        <Link to="/app/AddTripDetails">
          <Button
            bg={theme.purple}
            _hover={{ bg: theme.onHoverPurple }}
            color="white"
            variant="solid"
            ml="auto"
            mr="50px"
          >
            Add New Trip
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
            currentData.map((trip, index) => (
              <Tr key={index}>
                <Td>{trip.driversNIC}</Td>
                <Td>{trip.HelpersNIC}</Td>
                <Td>{trip.vehicleRegNo}</Td>
                <Td>{trip.date}</Td>
                <Td>{trip.startTime}</Td>
                <Td>{trip.endTime}</Td>
                <Td>{trip.startLocation}</Td>
                <Td>{trip.endLocation}</Td>
                <Td>{trip.status}</Td>
                <Td>{trip.isActive ? "Active" : "Inactive"}</Td>
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
                        <Link to={`/app/EditTripDetails`}>
                          Edit
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        {trip.isActive ? "Deactivate" : "Activate"}
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

