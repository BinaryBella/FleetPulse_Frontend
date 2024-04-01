import {useState} from 'react';
import {Button, Input} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Password from "../assets/images/Password.png";
import './ChangePassword.css'

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Submitted");
    };

    const handleCancel = () => {
        console.log("Cancelled");
    };

    return (
        <>
            <PageHeader title="Change Password"/>
            <div className="flex justify-between vertical-container">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <p>Old Password</p>
                        <Input
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            variant="filled"
                            width="500px"
                            onChange={(e) => handleChange(e, setOldPassword)}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>New Password</p>
                        <Input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            variant="filled"
                            width="500px"
                            onChange={(e) => handleChange(e, setNewPassword)}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>Confirm Password</p>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            variant="filled"
                            width="500px"
                            mb="10"
                            onChange={(e) => handleChange(e, setConfirmPassword)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button
                            bg="gray.400"
                            _hover={{bg: "gray.500"}}
                            color="#ffffff"
                            variant="solid"
                            w="240px"
                            gap="18"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={theme.purple}
                            _hover={{bg: theme.onHoverPurple}}
                            color="#ffffff"
                            variant="solid"
                            w="240px"
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </div>
                </div>
                <div className="flex items-end">
                    <img src={Password} alt="Change Password" width="400" height="400" className="opacity-70 mr-14"/>
                </div>
            </div>
        </>
    );
}