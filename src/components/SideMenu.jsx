import Logo from "../assets/images/Logo.jpg";
import {
    IconButton,
    Text,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCarAlt, FaCarCrash } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoMdPeople, IoMdPerson } from "react-icons/io";
import { BiTrip } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { Box } from "@chakra-ui/react";

export default function SideMenu() {
    return (
        <div className="bg-[#393970] w-1/5">
            <div className="flex justify-center w-full mb-10">
                <Link to="/app/Dashboard">
                    <img src={Logo} alt="Logo" className="w-3/5" />
                </Link>
            </div>
            <VStack spacing={4} align='stretch' width="full">
                <Link className="flex items-center pl-16" to="/app/Dashboard">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='dashboard'
                        fontSize='20px'
                        icon={<AiOutlineDashboard />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Dashboard
                    </Text>
                </Link>
                <Link className="flex items-center pl-16">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='vehicle'
                        fontSize='20px'
                        icon={<FaCarAlt />}
                    />
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left' color={theme.orange}>
                                        Vehicle
                                    </Box>
                                    <AccordionIcon color={theme.orange} />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <div>
                                    <Link className="flex items-center pl-16" to="/app/MaintenanceTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Maintenance
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-16" to="/app/MaintenanceTypeTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Maintenance Type
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-16" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Fuel Refill
                                        </Text>
                                    </Link>
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Driver">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='driver'
                        fontSize='20px'
                        icon={<MdAirlineSeatReclineNormal />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Driver
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Helper">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='helper'
                        fontSize='20px'
                        icon={<IoMdPerson />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Helper
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Staff">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='staff'
                        fontSize='20px'
                        icon={<IoMdPeople />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Staff
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Trip">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='trip'
                        fontSize='20px'
                        icon={<BiTrip />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Trip
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/AddAccidentDetails">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='accident'
                        fontSize='20px'
                        icon={<FaCarCrash />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Accident
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/auth/Report">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='report'
                        fontSize='20px'
                        icon={<TbReportAnalytics />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Reports
                    </Text>
                </Link>
            </VStack>
        </div>
    );
}
