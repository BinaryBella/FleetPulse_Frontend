import PageHeader from "../components/PageHeader.jsx";
import {Button, Checkbox, Input} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

export default function EditVehicleType() {
    const breadcrumbs = [
        {label: 'Vehicle', link: '/'},
        {label: 'Vehicle Type Details', link: '/'},
        {label: 'Edit Vehicle Type Details', link: '/'}
    ];
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can submit the userData object to your backend here
        console.log();
    };

    // Function to handle cancel action
    const handleCancel = () => {
        // Reset form fields or redirect to another page
        console.log("Cancelled");
    };

    return (
        <>
            <PageHeader title="Edit Vehicle Type" breadcrumbs={breadcrumbs}/>
            <div className="grid grid-cols-2 gap-10 mt-8">
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
                    />
                    <Checkbox size='lg' defaultChecked className="mt-8">
                        Is Active
                    </Checkbox>
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
            </div>
        </>
    );
}
