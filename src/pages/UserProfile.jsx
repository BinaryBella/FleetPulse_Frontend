import { useState, useRef } from 'react';
import { Text, Input, Button, Avatar, AvatarGroup } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import theme from "../config/ThemeConfig.jsx";

export default function UserProfile() {
    // State for user data and profile image
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        emailAddress: "",
        contactNumber: "",
        nic: "",
        emergencyContact: "",
        profileImage: null
    });

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUserData((prevData) => ({
            ...prevData,
            profileImage: file
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAvatarClick = () => {
        // Trigger click on file input
        fileInputRef.current.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userData);
    };

    const handleCancel = () => {
        console.log("Cancelled");
    };

    return (
        <>
            <Text fontSize="4xl" color="#393970" mb="7" fontFamily="sans-serif">
                User Profile
            </Text>
            <div className="flex flex-grow gap-6">
                <div className="w-1/5">
                    <AvatarGroup size="2xl" mb="4" mt="8" ml="12">
                        <Avatar
                            bg="#393970"
                            icon={<AiOutlineUser />}
                            cursor="pointer"
                            onClick={handleAvatarClick}
                        >
                        </Avatar>
                    </AvatarGroup>
                    <Input
                        ref={fileInputRef}
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="w-4/5 flex flex-col">
                    <div className="flex gap-8 mt-10">
                        <div className="w-2/5">
                            <div>
                                <p>First Name</p>
                                <Input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    variant="filled"
                                    my="4"
                                />
                            </div>
                            <div>
                                <p>Date of Birth</p>
                                <Input
                                    type="date"
                                    name="dateOfBirth"
                                    value={userData.dateOfBirth}
                                    onChange={handleInputChange}
                                    placeholder="Date of Birth"
                                    variant="filled"
                                    my="4"
                                />
                            </div>
                            <div>
                                <p>Contact Number</p>
                                <Input
                                    type="tel"
                                    name="contactNumber"
                                    value={userData.contactNumber}
                                    onChange={handleInputChange}
                                    placeholder="Contact Number"
                                    variant="filled"
                                    my="4"
                                />
                            </div>
                            <div>
                                <p>NIC</p>
                                <Input
                                    type="text"
                                    name="nic"
                                    value={userData.nic}
                                    onChange={handleInputChange}
                                    placeholder="NIC"
                                    variant="filled"
                                    my="4"
                                />
                            </div>
                        </div>
                        <div className="w-2/5">
                            <div>
                                <p>Last Name</p>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    variant="filled"
                                    my="4"
                                />
                            </div>
                            <div>
                                <p>Email Address</p>
                                <Input
                                    type="email"
                                    name="emailAddress"
                                    value={userData.emailAddress}
                                    onChange={handleInputChange}
                                    placeholder="Email Address"
                                    variant="filled"
                                    my="4"
                                />
                            </div>
                            <div>
                                <p>Emergency Contact</p>
                                <Input
                                    type="text"
                                    name="emergencyContact"
                                    value={userData.emergencyContact}
                                    onChange={handleInputChange}
                                    placeholder="Emergency Contact"
                                    variant="filled"
                                    my="4"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-5/6 flex justify-end gap-6 mt-10">
                        <Button
                            bg="gray.400"
                            _hover={{bg: "gray.500"}}
                            color="#ffffff"
                            variant="solid"
                            w="210px"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={theme.purple}
                            _hover={{bg: theme.onHoverPurple}}
                            color="#ffffff"
                            variant="solid"
                            w="210px"
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
