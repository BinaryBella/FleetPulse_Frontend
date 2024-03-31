import React from "react";
import PageHeader from "../components/PageHeader.jsx";
import { Button, Checkbox, Input, Select } from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import {MdArrowDropDown} from "react-icons/md";

function AddDriverDetails() {
  const breadcrumbs = [
    { label: "Driver", link: "/app/Driver" },
    { label: "Driver Details", link: "/" },
    { label: "Add Driver Details", link: "/app/AddvehicletypeDetails" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  const handleCancel = () => {
    console.log("Cancelled");
  };

  return (
    <>
      <PageHeader title="Add Vehicle Details" breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-2 gap-10 mt-8">
      <div className="flex flex-col gap-3">
                    <p>First Name</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
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
                    <p>National Identity Card No</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="National Identity Card No"
                        placeholder="National Identity Card No"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <p>Email Address</p>
                    <Input
                        type="text"
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
                    <p>Contact Number</p>
                    <Input
                        type="text"
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
                    <p>Emergency Contact Number</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Emergency Contact Number"
                        placeholder="Emergency Contact Number"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <p>Blood Group</p>
                    <Select
                        placeholder="Blood Group"
                        variant="filled"
                        borderRadius="md"
                        width="500px"
                        px={3}
                        py={2}
                        mt={1}
                        name="Blood Group"
                        icon={<MdArrowDropDown/>}
                    >
                        <option value="Blood Group1">Blood Group 1</option>
                        <option value="Blood Group2">Blood Group 2</option>
                        <option value="Blood Group3">Blood Group 3</option>
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
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name="Password"
                        placeholder="Password"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <p>Confirm Password</p>
                    <Input
                        type="text"
                        variant="filled"
                        borderRadius="md"
                        px={3}
                        py={2}
                        mt={1}
                        width="500px"
                        name=" Confirm Password"
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

      </div>
    </>
  );
}

export default AddDriverDetails;
