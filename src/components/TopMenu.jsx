import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import theme from "../config/ThemeConfig.jsx";

export default function TopMenu() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/app/Login");
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
                                icon={<FaUser />}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem>
                                    <Link to="/app/UserProfile" >
                                        User Profile
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
            <hr className="my-5 border border-[#D0D8DE]" />
        </>
    );
}