import React, { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { Button, Checkbox, Input } from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

export default function AddVehicleDetails() {
  const [vehicleRegistrationNo, setVehicleRegistrationNo] = useState(""); 
  const [licenseNo, setLicenseNo] = useState(""); 
  const [licenseExpireDate, setLicenseExpireDate] = useState(""); 
  const [vehicleColor, setVehicleColor] = useState(""); 
  const [vehicleModelId, setVehicleModelId] = useState(""); 
  const [vehicleTypeId, setVehicleTypeId] = useState(""); 
  const [manufactureId, setManufactureId] = useState(""); 
  const [fuelRefillId, setFuelRefillId] = useState(""); 

  const breadcrumbs = [
    { label: "Vehicle", link: "/" },
    { label: "Vehicle Details", link: "/app/VehicleType" },
    { label: "Add Vehicle Details", link: "/app/AddvehicleTypeDetails" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      vehicleId: 0,
      VehicleRegistrationNo: vehicleRegistrationNo,
      LicenseNo: licenseNo,
      LicenseExpireDate: licenseExpireDate,
      VehicleColor: vehicleColor,
      Status: true, // Assuming Status is always true for dummy data
      VehicleModelId: vehicleModelId,
      VehicleTypeId: vehicleTypeId,
      ManufactureId: manufactureId,
      FuelRefillId: fuelRefillId,
    };
    console.log(obj);
    alert("Vehicle details saved (dummy submission)");
  };

  const handleCancel = () => {
    console.log("Cancelled");
    alert("Cancelled");
  };

  return (
    <>
      <PageHeader title="Add Vehicle Details" breadcrumbs={breadcrumbs} />
      <div className="flex flex-col items-center my-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <p>Vehicle Registration No</p>
            <Input
              type="text"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              placeholder="Vehicle Registration No"
              onChange={(e) => setVehicleRegistrationNo(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>Vehicle Model</p>
            <Input
              type="text"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              placeholder="Vehicle Model"
              onChange={(e) => setVehicleModelId(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>Manufacture</p>
            <Input
              type="text"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              placeholder="Manufacture"
              onChange={(e) => setManufactureId(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>License No</p>
            <Input
              type="text"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              placeholder="License No"
              onChange={(e) => setLicenseNo(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>License Expire Date</p>
            <Input
              type="date"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              onChange={(e) => setLicenseExpireDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>Vehicle Color</p>
            <Input
              type="text"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              placeholder="Vehicle Color"
              onChange={(e) => setVehicleColor(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>Fuel Type</p>
            <Input
              type="text"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              placeholder="Fuel Type"
              onChange={(e) => setFuelRefillId(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>Vehicle Type</p>
            <Input
              type="text"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              placeholder="Vehicle Type"
              onChange={(e) => setVehicleTypeId(e.target.value)}
            />
          </div>
          <Checkbox size="lg" defaultChecked className="mt-8">
            Is Active
          </Checkbox>
        </div>
        <div className="flex w-5/6 justify-end gap-10">
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
      </div>
    </>
  );
}
