import React, { useState, useEffect } from "react";

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

export default function VehicleType() {
  const [vehicleTypeDetails, setVehicleTypeDetails] = useState([]);
  const [error, setError] = useState(null);

  // Dummy data for vehicle types
  const dummyVehicleTypes = [
    { id: 1, type: "Sedan", status: true },
    { id: 2, type: "SUV", status: true },
    { id: 3, type: "Truck", status: false },
    { id: 4, type: "Van", status: true },
    { id: 5, type: "Motorcycle", status: false },
  ];

  useEffect(() => {
    // Simulate API call with dummy data
    // axios.get('https://localhost:7265/api/VehicleType')
    // .then((res)=>{
    //    setVehicleTypeDetails(res.data)
    // })
    // .catch((er)=>{
    //    setError(er.message)
    // })

    // Use dummy data for this example
    setVehicleTypeDetails(dummyVehicleTypes);
  }, []);

  const breadcrumbs = [
    { label: "Vehicle", link: "/" },
    { label: "Vehicle Type", link: "/app/VehicleType" },
    { label: "Add Vehicle Type Details", link: "/app/AddvehicletypeDetails" }
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <PageHeader title="Vehicle Type Details" breadcrumbs={breadcrumbs} />

      <Link to="/app/AddvehicletypeDetails">
        <Button
          bg={theme.purple}
          _hover={{ bg: theme.onHoverPurple }}
          color="white"
          variant="solid"
          w="230px"
          marginTop="60px"
          marginBottom="20px"
          mr="50px"
          position="absolute"
          top="130"
          right="0"
        >
          Add New Vehicle Type
        </Button>
      </Link>

      <Table className="custom-table" mt="20px">
        <Thead>
          <Tr>
            <Th sx={{ textAlign: "center" }}>Vehicle Type</Th>
            <Th sx={{ textAlign: "center" }}>Status</Th>
            <Th sx={{ textAlign: "center" }}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vehicleTypeDetails.map((vehicle) => (
            <Tr key={vehicle.id}>
              <Td sx={{ textAlign: "center" }}>{vehicle.type}</Td>
              <Td sx={{ textAlign: "center" }}>{vehicle.status ? "Active" : "Inactive"}</Td>
              <Td sx={{ textAlign: "center" }}>
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
                      <Link to={`/app/EditVehicleType`}>Edit</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="">Deactive</Link>
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

