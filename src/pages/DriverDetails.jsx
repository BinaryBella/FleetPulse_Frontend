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
import {Link} from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { IoSettingsSharp } from "react-icons/io5";

export default function DriverDetails(){
  const[driverDetails,setDriverDetails] = useState([]);
  const[error,setError]=useState(null);

  const breadcrumbs = [
    { label: "Driver", link: "/app/Driver" },
    { label: "Driver Details", link: "/app/DriverDetails" },
    { label: "Add Driver Details", link: "/app/AddDriverDetails" },
  ];

  return (
    <>
      <PageHeader title="Driver Details" breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-2 gap-10 mt-8">
        <Button
          as={Link} // Use Link from react-router-dom instead of a regular button
          to="/app/AddDriverDetails" // Specify the correct route for adding a new driver
          bg={theme.purple}
          _hover={{ bg: theme.onHoverPurple }}
          color="white"
          variant="solid"
          right="0"
          position="absolute"
          mr="20px"
        >
          Add New Driver
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
                        <Th>Blood Group</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {driverDetails.map((driver, index) => (
                        <Tr key={index}>

                            <Td>{driver.firstName}</Td>
                            <Td>{driver.lastName}</Td>
                            <Td>{driver.DoB}</Td>
                            <Td>{driver.NIC}</Td>
                            <Td>{driver.emailAddress}</Td>
                            <Td>{driver.fphoneNo}</Td>
                            <Td>{driver.Em.Contact}</Td>
                            <Td>{driver.BloodGroup}</Td>

                            <Td>{driver.status}</Td>
                            <Td>{driver.isActive ? "Active" : "Inactive"}</Td>
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
                                            <Link to={`/editDriver/${driver.id}`} >
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