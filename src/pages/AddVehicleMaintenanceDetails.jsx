import PageHeader from "../components/PageHeader.jsx";
import {Button, Flex, IconButton, Input, Textarea} from "@chakra-ui/react";
import {FaCheckSquare} from "react-icons/fa";
import theme from "../config/ThemeConfig.jsx";

export default function AddVehicleMaintenanceDetails() {
    const breadcrumbs = [
        {label: 'Vehicle', link: '/'},
        {label: 'Vehicle Maintenance', link: '/'},
        {label: ' Add Vehicle Maintenance Details', link: '/'}
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    };

    const handleCancel = () => {
        console.log("Cancelled");
    };
    return (
        <>

            <PageHeader title="Add Vehicle Maintenance Details" breadcrumbs={breadcrumbs}/>
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
                    <p>Maintenance Date</p>
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
                    <p>Cost for Maintenance</p>
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="Cost of Maintenance"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Manufacture"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Service Provider</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Service Provider"
                        placeholder="Service Provider"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Replaced Parts</p>
                    <Textarea
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Replaced Parts"
                        placeholder="Replaced Parts"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Special Notes</p>
                    <Textarea
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Special Notes"
                        placeholder="Special Notes"
                    />
                </div>
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
