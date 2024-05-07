import PageHeader from "../components/PageHeader.jsx";
import {
    Button,
    Flex,
    IconButton,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select
} from "@chakra-ui/react";
import {FaCheckSquare} from "react-icons/fa";
import {MdArrowDropDown} from "react-icons/md";
import theme from "../config/ThemeConfig.jsx";

export default function AddFuelRefillDetails() {

    let username = sessionStorage.getItem("Username");

    const breadcrumbs = [
        {label: 'Vehicle', link: '/'},
        {label: 'Fuel Refill Details', link: '/'},
        {label: 'Add Fuel Refill Details', link: '/'}
    ];
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    };

    const handleCancel = () => {
        console.log("Cancelled");
    };

    return (
        <>
            <PageHeader title="Add Fuel Refill Details" breadcrumbs={breadcrumbs}/>
            <div className="grid grid-cols-2 gap-10 mt-8">
                <div className="flex flex-col gap-3">
                    <p>Driver’s NIC</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Driver’s NIC"
                        placeholder="Driver’s NIC"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Helper’s NIC</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Helper’s NIC"
                        placeholder="Helper’s NIC"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Vehicle Registration No</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Vehicle Registration No"
                        placeholder="Vehicle Registration No"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Liter Count</p>
                    <NumberInput
                        variant="filled"
                        defaultValue={1}
                        min={1}
                        width="500px"
                        mt={1}
                    >
                        <NumberInputField
                            variant="filled"
                            borderRadius="md"
                            px={3}
                            py={2}
                            mt={1}
                            name="Liter Count"
                            placeholder="Liter Count"
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </div>
                <div className="flex flex-col gap-3">
                    <p>Date & Time</p>
                    <Input
                        type="date"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Date & Time"
                        placeholder="Date & Time"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Refill Type</p>
                    <Select
                        placeholder="Select Refill Type"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Refill Type"
                        icon={<MdArrowDropDown/>}
                    >
                        <option value="RefillType1">Refill Type 1</option>
                        <option value="RefillType2">Refill Type 2</option>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <p>Cost for Fuel Refill</p>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="Cost for Fuel Refill"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Cost for Fuel Refill"
                    />
                </div>

                <div className="flex flex-col gap-3"/>

                <div className="flex flex-col gap-3">
                    <Flex align="center" gap={2}>
                        <IconButton
                            width='fit-content'
                            variant='solid'
                            colorScheme='none'
                            fontSize='30px'
                            color='#393970'
                            icon={<FaCheckSquare/>}
                            aria-label="activeState"/>
                        <p>Is active</p>
                    </Flex>
                </div>
                <div className="flex gap-10">
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
            </div>
        </>
    );
}