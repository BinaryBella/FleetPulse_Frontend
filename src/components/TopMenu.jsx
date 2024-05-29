import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import theme from "../config/ThemeConfig.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TopMenu() {
    const navigate = useNavigate();
    const [image, setImage] = useState("");

    const fetchUser = async () => {
        try {
            const username = sessionStorage.getItem("Username");
            if (username) {
                const response = await axios.get(`https://localhost:7265/api/Auth/userProfile?username=${username}`);
                const responseData = response.data;
                setImage(responseData.profilePicture);
            } else {
                console.error("Username not found in session storage.");
            }
        } catch (error) {
            console.error("Error fetching User details:", error);
        }
    };

    useEffect(() => {
        fetchUser().then();
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.removeItem('Token');
        navigate("/auth/Login");
    };

    return (
        <>
            <div className="flex justify-end">
                <div className="flex gap-6 me-10">
                    <Link className="flex items-center" to="/app/Notification">
                        <IconButton
                            variant='link'
                            color={theme.purple}
                            aria-label='notification'
                            fontSize='30px'
                            mt={5}
                            icon={< IoIosNotifications />}
                        />
                    </Link>
                    <div className="flex items-center">
                        <Menu>
                            <MenuButton
                                color={theme.purple}
                                as={IconButton}
                                aria-label='profile-options'
                                fontSize='25px'
                                mt={5}
                                variant='outline'
                            >
                            {image ? (
                                <img
                                    src={`data:image/jpeg;base64,${image}`}
                                    alt="User Avatar"
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%",
                                    }}
                                />
                            ) : (
                                <FaUser /> // Default icon if no image is uploaded
                            )}</MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link to="/app/UserProfile" >
                                        User Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to="/app/ChangePassword" >
                                        Change Password
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
            </div>
            <hr className="my-3 border border-[#D0D8DE]" />
        </>
    );
}
