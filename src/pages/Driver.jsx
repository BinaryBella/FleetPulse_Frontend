import PageHeader from "../components/PageHeader.jsx";
<<<<<<< HEAD
import {Button, Checkbox, Input, Select} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import {MdArrowDropDown} from "react-icons/md";



export default function Driver() {
    const breadcrumbs = [
        {label: 'Driver', link: '/app/Driver'},
        {label: 'Driver Details', link:'/app/DriverDetails'},
        {label: 'Add Driver Details', link: "/app/AddDriverDetails"}
=======
import {Button, Checkbox, Input} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

export default function AddVehicleType() {
    const breadcrumbs = [
        {label: 'Vehicle', link: '/'},
        {label: 'Vehicle Type Details', link: '/'},
        {label: 'Add Vehicle Type Details', link: '/app'}
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b
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
<<<<<<< HEAD
            <PageHeader title="Add Driver Details" breadcrumbs={breadcrumbs}/>
            <div className="grid grid-cols-2 gap-10 mt-8">
                <div className="flex flex-col gap-3">
                    <p>First Name</p>
=======
            <PageHeader title="Add Vehicle Type Details" breadcrumbs={breadcrumbs}/>
            <div className="grid grid-cols-2 gap-10 mt-8">
                <div className="flex flex-col gap-3">
                    <p>Vehicle Type</p>
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
<<<<<<< HEAD
                        name="First Name"
                        placeholder="First Name"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Last Name</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Last Name"
                        placeholder="Last Name"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Date of Birth</p>
                    <Input
                        type="date"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Date of Birth"
                        placeholder="Date of Birth"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>NIC</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="NIC"
                        placeholder="NIC"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Email Address</p>
                    <Input
                        type="email"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Email Address"
                        placeholder="Email Address"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Driver License No</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Driver License No"
                        placeholder="Driver License No"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Contact No</p>
                    <Input
                        type="tel"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Contact No"
                        placeholder="Contact No"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Emergency Contact No</p>
                    <Input
                        type="tel"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Emergency Contact No"
                        placeholder="Emergency Contact No"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Blood Group</p>
                    <Select
                        placeholder="Select Blood Group"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Blood Group"
                        icon={<MdArrowDropDown/>}
                    >
                        <option value="BloodGroup1">Blood Group 1</option>
                        <option value="BloodGroup2">Blood Group 2</option>
                        <option value="BloodGroup3">Blood Group 3</option>
                    </Select>
                </div>
                <div className="flex flex-col gap-3">
                    <p>User Name</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="User Name"
                        placeholder="User Name"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Password</p>
                    <Input
                        type="password"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="password"
                        placeholder="password"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <p>Confirm Password</p>
                    <Input
                        type="password"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="confirm Password"
                        placeholder="Confirm Password"
                    />
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
=======
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
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b
            </div>
        </>
    );
}
<<<<<<< HEAD


=======
>>>>>>> 4d9fd2b46f304d1002ebec0879b6b3684a9c792b
