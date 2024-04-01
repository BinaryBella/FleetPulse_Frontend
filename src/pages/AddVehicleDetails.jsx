import PageHeader from "../components/PageHeader.jsx";
import {
    Button,
    Checkbox,
    Input,
    Select
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import {MdArrowDropDown} from "react-icons/md";
import { useState } from "react";
import axios from "axios";

export default function AddVehicleDetails() {

    const breadcrumbs = [
        {label: 'Vehicle', link: '/'},
        {label: 'Vehicle Details', link: '/app/VehicleType'},
        {label: 'Add Vehicle Details', link: '/app/AddvehicletypeDetails'}
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        let tmp={
            "vehicleId": 0,
            "vehicleRegistrationNo": "string",
            "licenseNo": "string",
            "licenseExpireDate": "2024-04-01T07:08:19.407Z",
            "vehicleColor": "string",
            "status": "string",
            "vehicleModelId": 0,
            "vehicleTypeId": 0,
            "manufactureId": 0,
            "fuelRefillId": 0,
            "vehicleMaintenanceId": "string",
            "accidentId": 0,
            "tripId": "string"
          }
       let obj={
        "vehicleId": 0,
        "vehicleRegistrationNo": vehicleRegistrationNo,
        "licenseNo": licenseNo,
        "licenseExpireDate": licenseExpireDate+'T19:26:21.329Z',
        "vehicleColor": vehicleColor,
        "status":"string",
        "vehicleModelId": parseInt(vehicleModelId),
        "vehicleTypeId": parseInt(vehicleTypeId),
        "manufactureId": parseInt(manufactureId),
        "fuelRefillId": parseInt(fuelRefillId),
        "vehicleMaintenanceId":"string",
        "accidentId": 0,
        "tripId": 0
       }
       console.log(obj)
       axios.post('https://localhost:7265/api/Vehicle/for vehicle',obj)
       .then(()=>{alert('successfully added')})
       .catch((er)=>{console.log(er.message)})
    };

    const handleCancel = () => {
        console.log('Cancelled');
    };

    const [vehicleRegistrationNo,setvehicleRegistrationNo]=useState()
    const [licenseNo,setlicenseNo]=useState()
    const [licenseExpireDate,setlicenseExpireDate]=useState()
    const [vehicleColor,setvehicleColor]=useState()
    const [vehicleModelId,setvehicleModelId]=useState()
    const [vehicleTypeId,setvehicleTypeId]=useState()
    const [manufactureId,setmanufactureId]=useState()
    const [fuelRefillId,setfuelRefillId]=useState()


    return (
        <>
            <PageHeader title="Add Vehicle Details" breadcrumbs={breadcrumbs}/>
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
                        onChange={(e)=>setvehicleRegistrationNo(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Vehicle Model</p>
                    <Select
                        placeholder="Select Vehicle Model"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Vehicle Model"
                        icon={<MdArrowDropDown/>}
                        onChange={(e)=>setvehicleModelId(e.target.value)}
                    >
                        <option value="1">Model 1</option>
                        <option value="2">Model 2</option>
                        <option value="3">Model 3</option>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <p>Manufacture</p>
                    <Select
                        placeholder="Manufacture"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Manufacture"
                        icon={<MdArrowDropDown/>}
                        onChange={(e)=>setmanufactureId(e.target.value)}
                    >
                        <option value="1">Manufacture 1</option>
                        <option value="2">Manufacture 2</option>
                        <option value="3">Manufacture 3</option>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <p>Vehicle License No</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Vehicle License No"
                        placeholder="Vehicle License No"
                        onChange={(e)=>setlicenseNo(e.target.value)}
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
                        name="License Expire Date"
                        placeholder="License Expire Date"
                        onChange={(e)=>setlicenseExpireDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Vehicle Colour</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Vehicle Colour"
                        placeholder="Vehicle Colour"
                        onChange={(e)=>setvehicleColor(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Vehicle Type</p>
                    <Select
                        placeholder="Vehicle Type"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Vehicle Type"
                        icon={<MdArrowDropDown/>}
                        onChange={(e)=>setvehicleTypeId(e.target.value)}
                    >
                        <option value="1">Vehicle Type 1</option>
                        <option value="2">Vehicle Type 2</option>
                        <option value="3">Vehicle Type 3</option>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <p>Fuel Type</p>
                    <Select
                        placeholder="Fuel Type"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Fuel Type"
                        icon={<MdArrowDropDown/>}
                        onChange={(e)=>setfuelRefillId(e.target.value)}
                    >
                        <option value="1">Fuel Type 1</option>
                        <option value="2">Fuel Type 2</option>
                        <option value="3">Fuel Type 3</option>
                    </Select>
                </div>
            <div  className="gritripIdd flex-row gap-10 mt-8">
                <div className="flex flex-col gap-3">
                    <Checkbox size='lg' defaultChecked>
                        Is Active
                    </Checkbox>
                </div>
                </div>
            </div>
            </div>
            
            <div className="flex w-5/6 justify-end gap-10">
                <Button
                    bg="gray.400"
                    _hover={{bg: "gray.500"}}
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
                    
                    _hover={{bg: theme.onHoverPurple}}
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
