import React, { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { Button, Checkbox, Input, Select } from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios"; // Added axios import

export default function AddVehicleDetails() {
  const [vehicleRegistrationNo, setVehicleRegistrationNo] = useState(""); // Added useState
  const [licenseNo, setLicenseNo] = useState(""); // Added useState
  const [licenseExpireDate, setLicenseExpireDate] = useState(""); // Added useState
  const [vehicleColor, setVehicleColor] = useState(""); // Added useState
  const [vehicleModelId, setVehicleModelId] = useState(""); // Added useState
  const [vehicleTypeId, setVehicleTypeId] = useState(""); // Added useState
  const [manufactureId, setManufactureId] = useState(""); // Added useState
  const [fuelRefillId, setFuelRefillId] = useState(""); // Added useState

  const breadcrumbs = [
    { label: "Vehicle", link: "/" },
    { label: "Vehicle Details", link: "/app/VehicleType" }, // Adjusted link
    { label: "Add Vehicle Details", link: "/app/AddvehicleTypeDetails" }, // Adjusted link
  ];


  const[regnum ,setregnum] = useState();
  const[vehmdl,setvehmdl]=useState();
  const[man,setman]=useState();
  const[licnum,setlicnum]=useState();
  const[led,setled]=useState()
  const[vehclr,setvehclr]=useState();
  const[ftype,setftype]=useState();
  const[vtype,setvtype]=useState();


  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      vehicleId: 0,
      VehicleRegistrationNo: regnum,
      LicenseNo:licnum,
      LicenseExpireDate:led,
      VehicleColor: vehclr,
      Status:vehicle.Status,
      VehicleModelId: vehmdl,
      VehicleTypeId : vtype,
      ManufactureId : man,
      FuelRefillId : ftype,
     
      
    };
    console.log(obj);
    axios
      .post("https://localhost:7265/api/Vehicle/for vehicle", obj)
      .then(() => {
        alert("successfully added");
      })
      .catch((er) => {
        console.log(er.message);
      });
  };

  const handleCancel = () => {
    console.log("Cancelled");
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
              name="Vehicle Registration No"
              placeholder="Vehicle Registration No"
              onChange={(e)=>setregnum(e.target.value)}
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
              name="Vehicle Model"
              placeholder="Vehicle Model"
              onChange={(e)=>setvehmdl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>Manufacture</p>
            <Input
              type="number"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              name="Manufacture"
              placeholder="Manufacture"
              onChange={(e)=>setman(e.target.value)}
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
              name="License No"
              placeholder="License No"
              onChange={(e)=>setlicnum(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>License Exipre Date</p>
            <Input
              type="date"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              name="License Exipre Date"
              placeholder="License Exipre Date"
              onChange={(e)=>setled(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>Vehicle Color</p>
            <Input
              type="tel"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              name="Vehicle Color"
              placeholder="Vehicle Color"
              onChange={(e)=>setvehclr(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <p>Fuel Type</p>
            <Input
              type="tel"
              variant="filled"
              borderRadius="md"
              px={3}
              py={2}
              mt={1}
              width="500px"
              name="Fuel Type"
              placeholder="Fuel Type"
              onChange={(e)=>setftype(e.target.value)}
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
              name="Vehicle Type"
              placeholder="Vehicle Type"
              onChange={(e)=>setvtype(e.target.value)}
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
