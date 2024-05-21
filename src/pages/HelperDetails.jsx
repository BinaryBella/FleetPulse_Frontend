import React, { useState, UseEffect } from 'react';

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
import { Link }from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { IoSettingsSharp } from "react-icons/io5";

export default function HelperDetails(){
    const [VehicleDetails, setVehicleDetails] = useState([]);
    const [error, setError] =useState(null);




  const breadcrumbs = [
    { label: "Helper", link: "/app/Helper" },
    { label: "Helper Details", link: "/app/HelperDetails" },
    { label: "Add Helper Details", link: "/app/AddHelperDetails" },
  ];

  return (
    <>
      <PageHeader title="Helper Details" breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-2 gap-10 mt-8">
        <Button
          as={Link} // Use Link from react-router-dom instead of a regular button
          to="/app/AddHelper" // Specify the correct route for adding a new driver
          bg={theme.purple}
          _hover={{ bg: theme.onHoverPurple }}
          color="white"
          variant="solid"
          right="0"
          position="absolute"
          mr="20px"
        >
          Add New Helper
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
                    {helperDetails.map((helper, index) => (
                        <Tr key={index}>

                            <Td>{helper.firstName}</Td>
                            <Td>{helper.lastName}</Td>
                            <Td>{helper.DoB}</Td>
                            <Td>{helper.NIC}</Td>
                            <Td>{helper.emailAddress}</Td>
                            <Td>{helper.fphoneNo}</Td>
                            <Td>{helper.Em.Contact}</Td>
                            <Td>{helper.BloodGroup}</Td>

                            <Td>{helper.status}</Td>
                            <Td>{helper.isActive ? "Active" : "Inactive"}</Td>
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
                                            <Link to={`/editHelper/${helper.id}`} >
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
