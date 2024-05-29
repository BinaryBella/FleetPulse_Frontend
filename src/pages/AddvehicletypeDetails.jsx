import { useState } from "react";
import { Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { FaCheckSquare } from "react-icons/fa";
import PageHeader from "../components/PageHeader.jsx";
import theme from "../config/ThemeConfig.jsx";
import axios from "axios";

export default function AddVehicleTypeDetails() {
  const breadcrumbs = [
    { label: "Vehicle", link: "/app/VehicleDetailsTable" },
    { label: "Vehicle Type", link: "/app/VehicleType" },
    { label: "Add Vehicle Type Details", link: "/app/AddVehicleTypeDetails" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let tmp={
      "vehicleTypeId": 0,
      "type": type,
      "status": status?1:0
    }
    console.log(tmp)
    axios.post('https://localhost:7265/api/VehicleType',tmp)
   .then(()=>{alert('Added successfuly')})
   .catch((er)=>{console.log(er.message)})
  };

  const handleCancel = () => {
    setVehicleType(" ");
  };

  const [type,settype]=useState()
  const [status,setstatus]=useState()

  return (
    <>

      <PageHeader title="Add Vehicle Details" breadcrumbs={breadcrumbs} />

      {/* Form section */}
      <div className="flex flex-col gap-3">
        <p>Vehicle Type</p>
        <Input
          type="text"
          value={type}
          onChange={(e) => settype(e.target.value)}
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
            <input type="checkbox" value={status} onChange={(e) => setstatus(e.target.checked)}></input>
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
          w="230px"
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
          w="230px"
          marginTop="10"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </>
  );
}
