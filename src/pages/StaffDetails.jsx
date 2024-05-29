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

export default function StaffDetails() {
  const [staffDetails, setStaffDetails] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    fetchStaffDetails();
}, []);
    
    const fetchStaffDetails =  () => {
      
        const dummyData = [
          {
            id: 1,
            firstName: "Max",
            lastName: "Ryan",
            DoB: "1990-01-01",
            NIC: "123456789V",
            emailAddress: "max.ryan@gmail.com",
            phoneNo: "0712345678",
            emContact: "Lisa Ryan",
            jobTitle: "Engineer",
            status: "Active",
            isActive: true,
          },
          {
            id: 2,
            firstName: "Ben",
            lastName: "Cole",
            DoB: "1985-05-15",
            NIC: "987654321V",
            emailAddress: "ben.cole@gmail.com",
            phoneNo: "0718765432",
            emContact: "Emily Cole",
            jobTitle: "Manager",
            status: "Inactive",
            isActive: false,
          },
          {
            id: 3,
            firstName: "Sam",
            lastName: "Lee",
            DoB: "1980-01-01",
            NIC: "1256456789V",
            emailAddress: "sam.lee@gmail.com",
            phoneNo: "0712349678",
            emContact: "Anna Lee",
            jobTitle: "Technician",
            status: "Active",
            isActive: true,
          },
          {
            id: 4,
            firstName: "Tom",
            lastName: "Nash",
            DoB: "1970-11-30",
            NIC: "2576456789V",
            emailAddress: "tom.nash@gmail.com",
            phoneNo: "0786349678",
            emContact: "Nina Nash",
            jobTitle: "Consultant",
            status: "Active",
            isActive: true,
          },
          {
            id: 5,
            firstName: "Leo",
            lastName: "Finn",
            DoB: "1994-09-28",
            NIC: "3476456789V",
            emailAddress: "leo.finn@gmail.com",
            phoneNo: "0746149678",
            emContact: "Sara Finn",
            jobTitle: "Analyst",
            status: "Active",
            isActive: true,
          },
          {
            id: 6,
            firstName: "Jay",
            lastName: "Kent",
            DoB: "1982-07-18",
            NIC: "1457456789V",
            emailAddress: "jay.kent@gmail.com",
            phoneNo: "0716149479",
            emContact: "Kate Kent",
            jobTitle: "Developer",
            status: "Active",
            isActive: true,
          },
          {
            id: 7,
            firstName: "Roy",
            lastName: "Hale",
            DoB: "1993-05-27",
            NIC: "6457256789V",
            emailAddress: "roy.hale@gmail.com",
            phoneNo: "0751566696",
            emContact: "Eve Hale",
            jobTitle: "Designer",
            status: "Active",
            isActive: true,
          },
          {
            id: 8,
            firstName: "Gus",
            lastName: "Reid",
            DoB: "1989-02-17",
            NIC: "6489206289V",
            emailAddress: "gus.reid@gmail.com",
            phoneNo: "0776754292",
            emContact: "Amy Reid",
            jobTitle: "Tester",
            status: "Active",
            isActive: true,
          },
        ];
        setStaffDetails(dummyData);
      
    };

    const columns = [
      {
        accessorKey: "firstName",
        header: "First Name",
        meta: { isNumeric: false, filter: "text" },
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        meta: { isNumeric: false, filter: "text" },
      },
      {
        accessorKey: "DoB",
        header: "DoB",
        meta: { isNumeric: false, filter: "date" },
      },
      {
        accessorKey: "NIC",
        header: "NIC",
        meta: { isNumeric: false, filter: "text" },
      },
      {
        accessorKey: "emailAddress",
        header: "Email Address",
        meta: { isNumeric: false, filter: "text" },
      },
      {
        accessorKey: "phoneNo",
        header: "Phone No.",
        meta: { isNumeric: false, filter: "text" },
      },
      {
        accessorKey: "emContact",
        header: "Em. Contact",
        meta: { isNumeric: false, filter: "text" },
      },
      {
        accessorKey: "jobTitle",
        header: "Job Title",
        meta: { isNumeric: false, filter: "text" },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: info => (info.getValue() ? "Active" : "Inactive"),
        meta: { isNumeric: false, filter: "boolean" },
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
                <Link to={`/app/EditStaffDetails`}>
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
      data: staffDetails,
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
    { label: "Staff", link: "/app/Staff" },
    { label: "Staff Details", link: "/app/StaffDetails" },
    { label: "Add Staff Details", link: "/app/AddStaffDetails" },
  ];

  return (
    <div className="main-content">
      <PageHeader title="Staff Details" breadcrumbs={breadcrumbs} />
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
        <Link to="/app/AddStaffDetails">
          <Button
            bg={theme.purple}
            _hover={{ bg: theme.onHoverPurple }}
            color="white"
            variant="solid"
            ml="auto"
            mr="50px"
          >
            Add New Staff
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
            currentData.map((staff, index) => (
              <Tr key={index}>
                <Td>{staff.firstName}</Td>
                <Td>{staff.lastName}</Td>
                <Td>{staff.DoB}</Td>
                <Td>{staff.NIC}</Td>
                <Td>{staff.emailAddress}</Td>
                <Td>{staff.phoneNo}</Td>
                <Td>{staff.emContact}</Td>
                <Td>{staff.jobTitle}</Td>
                <Td>{staff.status}</Td>
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
                        <Link to={`/app/EditStaffDetails`}>
                          Edit
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        {staff.isActive ? "Deactivate" : "Activate"}
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


