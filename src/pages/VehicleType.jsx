import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { IoSettingsSharp } from "react-icons/io5";
import { BsTextCenter } from "react-icons/bs";
export default function VehicleType() {
  const [vehicleTypeDetails, setVehicleTypeDetails] = useState([]);
  const [error, setError] = useState(null);


  useEffect(()=>{
     axios.get('https://localhost:7265/api/VehicleType')
     .then((res)=>{
        setVehicleTypeDetails(res.data)
     })
     .catch((er)=>{
        console.log(er.message)
     })
  },[])
  const breadcrumbs = [
    { label: "Vehicle", link: "/" },
    { label: "Vehicle Type", link: "/app/VehicleType" },
    {label: " Add Vehicle Type Details", link:"/app/AddvehicletypeDetails"}
  ];

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <PageHeader title="Add Vehicle Type Details" breadcrumbs={breadcrumbs} />

      <Link to="/app/AddvehicletypeDetails">
        <Button
          bg={theme.purple}
          _hover={{ bg: theme.onHoverPurple }}
          color="white"
          variant="solid"
          w="230px"
          marginTop="60px"
          marginBottom="20px"
          mr="10px"
          position="absolute"
          top="130"
          right="0"
        >
          Add New Vehicle Type
        </Button>
      </Link>

      <Table className="custom-table">
        <Thead>
          <Tr>
            <Th sx={{ textAlign: "center" }}>Vehicle Type</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vehicleTypeDetails.map((vehicle, index) => (
            <Tr key={index}>
              <Td>{vehicle.type}</Td>
              <Td>{vehicle.status ? "Active" : "Inactive"}</Td>
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
                      <Link to={`/editVehicle/${vehicle.id}`}>Edit</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="">Inactive</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
