import React, { useState } from "react";
import { Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { FaCheckSquare } from "react-icons/fa";
import PageHeader from "../components/PageHeader.jsx";
import theme from "../config/ThemeConfig.jsx";

export default function AddVehicleTypeDetails() {
  const breadcrumbs = [
    { label: "Vehicle", link: "/" },
    { label: "Vehicle Type", link: "/app/VehicleType" },
    { label: "Add Vehicle Type Details", link: "/app/AddVehicleTypeDetails" },
  ];

  const [vehicleType, setVehicleType] = useState(""); 
  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  const handleCancel = () => {
    setVehicleType(" ");
  };

  return (
    <>
    
      <PageHeader title="Add Vehicle Details" breadcrumbs={breadcrumbs} />

      {/* Form section */}
      <div className="flex flex-col gap-3">
        <p>Vehicle Type</p>
        <Input
          type="text"
          value={vehicleType} 
          onChange={(e) => setVehicleType(e.target.value)}
          variant="filled"
          borderRadius="md"
          px={3}
          py={2}
          mt={1}
          width="500px" // Set input width
          name="Vehicle Type"
          placeholder="Vehicle Type"
        />

   
        <div className="flex flex-col gap-3">
          <Flex align="center" gap={2}>
            <IconButton
              width="fit-content"
              variant="solid"
              colorScheme="none"
              fontSize="30px"
              color="#393970"
              icon={<FaCheckSquare />}
              aria-label="activeState"
            />
            <p>Is active</p>
          </Flex>
        </div>
      </div>


      <div className="flex w-5/6 justify-end gap-10" style={{ marginTop: "250px", marginLeft: "80px" }}>

        <Button
          bg="gray.400"
          _hover={{ bg: "gray.500" }}
          color="#ffffff"
          variant="solid"
          w="230px" // Set button width
          marginTop="10"
          onClick={handleCancel}
        >
          Cancel
        </Button>

        {/* Save button */}
        <Button
          bg={theme.purple}
          _hover={{ bg: theme.onHoverPurple }}
          color="#ffffff"
          variant="solid"
          w="230px" // Set button width
          marginTop="10"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </>
  );
}
