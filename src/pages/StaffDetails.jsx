import React, { useState, useEffect } from 'react';

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
} from "@chakra-ui/react";
import { Link } from "react-dom";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { IoSettingsSharp } from "react-icons/io5";

export default function StaffDetails(){
    const [staffDetails, setStaffDetails] = useState([]);
    const [error, setError] =useState(null);


  const breadcrumbs = [
    { label: "Staff", link: "/app/Staff" },
    { label: "Staff Details", link: "/app/StaffDetails" },
    { label: "Add Staff Details", link: "/app/AddStaffDetails" },
  ];

  return (
    <>
      <PageHeader title="Staff Details" breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-2 gap-10 mt-8">
        <Button
          as={Link} // Use Link from react-router-dom instead of a regular button
          to="/app/AddStaff" // Specify the correct route for adding a new driver
          bg={theme.purple}
          _hover={{ bg: theme.onHoverPurple }}
          color="white"
          variant="solid"
          right="0"
          position="absolute"
          mr="20px"
        >
          Add New Staff
        </Button>

        <Table className="custom-table" >
                <Thead>
                    <Tr>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>DoB</Th>
                        <Th>NIC</Th>

                        <Th>Email Address</Th>
                        <Th>Phone No.</Th>

                        <Th>Em.Contact</Th>
                        <Th>Job Title</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {staffDetails.map((staff, index) => (
                        <Tr key={index}>

                            <Td>{staff.firstName}</Td>
                            <Td>{staff.lastName}</Td>
                            <Td>{staff.DoB}</Td>
                            <Td>{staff.NIC}</Td>
                            <Td>{staff.emailAddress}</Td>
                            <Td>{staff.phoneNo}</Td>
                            <Td>{staff.Em.Contact}</Td>
                            <Td>{staff.jobTitle}</Td>

                            <Td>{staff.status}</Td>
                            <Td>{staff.isActive ? "Active" : "Inactive"}</Td>
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
                                            <Link to={`/editStaff/${staff.id}`} >
                                                Edit
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link to="" >
                                                Inactive
                                            </Link>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
       </div> </>
    );
}