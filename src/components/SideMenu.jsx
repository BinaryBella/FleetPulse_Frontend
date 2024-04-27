import { useEffect } from 'react';
import Logo from "../assets/images/logo.png";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    VStack,
    IconButton
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCarAlt, FaCarCrash } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { IoMdPeople, IoMdPerson } from "react-icons/io";
import { BiTrip } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import $ from 'jquery';

export default function SideMenu() {

    useEffect(() => {
        $(".chakra-accordion__item").css({ "border-color": "transparent" });
    }, []);

    return (
        <div className="bg-[#2c2c59] w-1/5">
            <div className="flex justify-center items-center w-full h-40 mb-10 -mt-5">
                <Link to="/app/Dashboard">
                    <img src={Logo} alt="Logo" style={{height: "80%"}}/>
                </Link>
            </div>
            <VStack spacing={4} align='stretch' width="full">
                <Link className="flex items-center pl-16" to="/app/Dashboard">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='dashboard'
                        fontSize='20px'
                        icon={<AiOutlineDashboard/>}
                    />
                    <Text color={theme.orange} fontSize="xl" paddingLeft="6">
                        Dashboard
                    </Text>
                </Link>
                <div className="flex items-start pl-16">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='vehicle'
                        marginTop="4"
                        fontSize='20px'
                        icon={<FaCarAlt/>}
                        style={{marginRight: "8px"}}
                    />
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left' color={theme.orange} fontSize='20px'
                                         paddingLeft="0">
                                        Vehicle
                                    </Box>
                                    <AccordionIcon color={theme.orange}/>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <div>
                                    <Link className="flex items-center pl-5" to="/app/MaintenanceTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Maintenance
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/MaintenanceTypeTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Maintenance Type
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Fuel Refill
                                        </Text>
                                    </Link>
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
                <Link className="flex items-center pl-16" to="/app/Driver">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='driver'
                        fontSize='20px'
                        icon={<MdAirlineSeatReclineNormal/>}
                    />
                    <Text color={theme.orange} fontSize="xl" paddingLeft="6">
                        Driver
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Helper">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='helper'
                        fontSize='20px'
                        icon={<IoMdPerson/>}
                    />
                    <Text color={theme.orange} fontSize="xl" paddingLeft="6">
                        Helper
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Staff">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='staff'
                        fontSize='20px'
                        icon={<IoMdPeople/>}
                    />
                    <Text color={theme.orange} fontSize="xl" paddingLeft="6">
                        Staff
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Trip">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='trip'
                        fontSize='20px'
                        icon={<BiTrip/>}
                    />
                    <Text color={theme.orange} fontSize="xl" paddingLeft="6">
                        Trip
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/AddAccidentDetails">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='accident'
                        fontSize='20px'
                        icon={<FaCarCrash/>}
                    />
                    <Text color={theme.orange} fontSize="xl" paddingLeft="6">
                        Accident
                    </Text>
                </Link>
                <div className="flex items-start pl-16">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='vehicle'
                        marginTop="4"
                        fontSize='20px'
                        icon={<TbReportAnalytics/>}
                        style={{marginRight: "8px"}}
                    />
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left' color={theme.orange} fontSize='20px'
                                         paddingLeft="0">
                                        Reports
                                    </Box>
                                    <AccordionIcon color={theme.orange}/>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <div>
                                    <Link className="flex items-center pl-5" to="/app/MaintenanceTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Details Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/MaintenanceTypeTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Type Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Manufacturer Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Maintenance Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Maintenance Type Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Fuel Refill Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Manufacturer Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Driver Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Helper Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Staff Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Trip Report
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-5" to="/app/FuelRefillTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Accident Report
                                        </Text>
                                    </Link>
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
            </VStack>
        </div>
    );
}
