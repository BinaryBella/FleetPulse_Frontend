import PageHeader from "../components/PageHeader.jsx";
import {
    Button,
    Checkbox,
    Input,
    Select
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import {MdArrowDropDown} from "react-icons/md";

export default function AddVehicleDetails() {

    const breadcrumbs = [
        {label: 'Vehicle', link: '/'},
        {label: 'Vehicle Details', link: '/'},
        {label: 'Add Vehicle Details', link: '/'}
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    const handleCancel = () => {
        console.log('Cancelled');
    };

    return (
        <>
            <PageHeader title="Add Vehicle Details" breadcrumbs={breadcrumbs}/>
            <div className="grid grid-cols-2 gap-10 mt-8">
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
                    >
                        <option value="model1">Model 1</option>
                        <option value="model2">Model 2</option>
                        <option value="model3">Model 3</option>
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
                    >
                        <option value="Manufacture1">Manufacture 1</option>
                        <option value="Manufacture2">Manufacture 2</option>
                        <option value="Manufacture3">Manufacture 3</option>
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
                    >
                        <option value="VehicleType1">Vehicle Type 1</option>
                        <option value="VehicleType2">Vehicle Type 2</option>
                        <option value="VehicleType3">Vehicle Type 3</option>
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
                    >
                        <option value="FuelType1">Fuel Type 1</option>
                        <option value="FuelType2">Fuel Type 2</option>
                        <option value="FuelType3">Fuel Type 3</option>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <Checkbox size='lg' defaultChecked>
                        Is Active
                    </Checkbox>
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
