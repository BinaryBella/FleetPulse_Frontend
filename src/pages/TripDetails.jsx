import React, { useState,UseEffect } from 'react';
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
import PageHeader from "../components/PageHeader.jsx";
import theme from "../config/ThemeConfig.jsx";
import { IoSettingsSharp } from "react-icons/io5";

export default function TripDetails(){
    const [TripDetails, setTripDetails] = useState([]);
    const [error, setError] =useState(null);


  const breadcrumbs = [
    { label: "Trip", link: "/app/Trip" },
    { label: "Trip Details", link: "/app/TripDetails" },
    { label: "Add Trip Details", link: "/app/AddTripDetails" },
  ];

  return (
    <>
      <PageHeader title="Staff Details" breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-2 gap-10 mt-8">
        <Button
          as={Link} // Use Link from react-router-dom instead of a regular button
          to="/app/AddTrip" // Specify the correct route for adding a new driver
          bg={theme.purple}
          _hover={{ bg: theme.onHoverPurple }}
          color="white"
          variant="solid"
          right="0"
          position="absolute"
          mr="20px"
        >
          Add New Trip
        </Button>

        <Table className="custom-table" >
                <Thead>
                    <Tr>
                        <Th>Driver's NIC</Th>
                        <Th>Helper's NIC</Th>
                        <Th>Vehicle Reg.No</Th>
                        <Th>Date</Th>

                        <Th>Start Time</Th>
                        <Th>End Time</Th>

                        <Th>Start Location </Th>
                        <Th>End Location</Th>
                        
                    </Tr>
                </Thead>
                <Tbody>
                    {tripDetails.map((trip, index) => (
                        <Tr key={index}>

                            <Td>{helper.driversNIC}</Td>
                            <Td>{helper.HelpersNIC}</Td>
                            <Td>{helper.vehicleRegNo}</Td>
                            <Td>{helper.date}</Td>
                            <Td>{helper.startTime}</Td>
                            <Td>{helper.endTime}</Td>
                            <Td>{helper.startLocation}</Td>
                            <Td>{helper.endLocation}</Td>
                            <Td>{trip.isActive ? "Active" : "Inactive"}</Td>
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
                                            <Link to={`/editTrip/${trip.id}`} >
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
