import { useEffect } from 'react';
import Logo from "../assets/images/logo.png"; // Corrected import path and file name
import {
    IconButton,
    Text,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from "@chakra-ui/react";
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
        <div className="bg-[#393970] w-1/5 flex flex-col h-fit">
            <div className="flex justify-center w-full">
                <img src={Logo} alt="Logo" className="w-3/5 mb-10" />
            </div>
            <VStack spacing={4} align="stretch">
                <Link className="flex items-center pl-16" to="/app/Dashboard">
                    <IconButton
                        variant="link"
                        color={theme.orange}
                        aria-label="dashboard"
                        fontSize="20px"
                        icon={<AiOutlineDashboard />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Dashboard
                    </Text>
                </Link>
                <Accordion allowMultiple className="pl-12">
                    <AccordionItem>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" color={theme.orange} className="flex items-center">
                                <IconButton
                                    variant="link"
                                    color={theme.orange}
                                    aria-label="vehicle"
                                    fontSize="20px"
                                    icon={<FaCarAlt />}
                                />
                                <Text color={theme.orange} fontSize="xl" ml={2}>
                                    Vehicle
                                </Text>
                            </Box>
                            <AccordionIcon color={theme.orange} />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
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
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Link className="flex items-center pl-16" to="/app/Driver">
                    <IconButton
                        variant="link"
                        color={theme.orange}
                        aria-label="driver"
                        fontSize="20px"
                        icon={<MdAirlineSeatReclineNormal />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Driver
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Helper">
                    <IconButton
                        variant="link"
                        color={theme.orange}
                        aria-label="helper"
                        fontSize="20px"
                        icon={<IoMdPerson />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Helper
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Staff">
                    <IconButton
                        variant="link"
                        color={theme.orange}
                        aria-label="staff"
                        fontSize="20px"
                        icon={<IoMdPeople />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Staff
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Trip">
                    <IconButton
                        variant="link"
                        color={theme.orange}
                        aria-label="trip"
                        fontSize="20px"
                        icon={<BiTrip />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Trip
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/AddAccidentDetails">
                    <IconButton
                        variant="link"
                        color={theme.orange}
                        aria-label="accident"
                        fontSize="20px"
                        icon={<FaCarCrash />}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Accident
                    </Text>
                </Link>
                <Accordion allowMultiple className="pl-12">
                    <AccordionItem>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left" color={theme.orange} className="flex items-center">
                                <IconButton
                                    variant="link"
                                    color={theme.orange}
                                    aria-label="report"
                                    fontSize="20px"
                                    icon={<TbReportAnalytics />}
                                />
                                <Text color={theme.orange} fontSize="xl" ml={2}>
                                    Reports
                                </Text>
                            </Box>
                            <AccordionIcon color={theme.orange} />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Accordion allowMultiple className="pl-12">
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box as="span" flex="1" textAlign="left" color={theme.orange} className="flex items-center">
                                            <Text color={theme.orange} fontSize="lg">
                                                Vehicle Reports
                                            </Text>
                                        </Box>
                                        <AccordionIcon color={theme.orange} />
                                    </AccordionButton>
                                    <AccordionPanel pb={4}>
                                        <Link className="flex items-center pl-4" to="/app/VehicleDetailsReport">
                                            <Text color={theme.orange} fontSize="lg">
                                                Vehicle Details Report
                                            </Text>
                                        </Link>
                                        <Link className="flex items-center pl-4" to="/app/VehicleTypeReport">
                                            <Text color={theme.orange} fontSize="lg">
                                                Vehicle Type Report
                                            </Text>
                                        </Link>
                                        <Link className="flex items-center pl-4" to="/app/VehicleModelReport">
                                            <Text color={theme.orange} fontSize="lg">
                                                Vehicle Model Report
                                            </Text>
                                        </Link>
                                        <Link className="flex items-center pl-4" to="/app/VehicleManufacturerReport">
                                            <Text color={theme.orange} fontSize="lg">
                                                Vehicle Manufacturer Report
                                            </Text>
                                        </Link>
                                        <Link className="flex items-center pl-4" to="/app/VehicleMaintenanceReport">
                                            <Text color={theme.orange} fontSize="lg">
                                                Vehicle Maintenance Report
                                            </Text>
                                        </Link>
                                        <Link className="flex items-center pl-4" to="/app/VehicleMainTypeReport">
                                            <Text color={theme.orange} fontSize="lg">
                                                Vehicle Maintenance Type Report
                                            </Text>
                                        </Link>
                                        <Link className="flex items-center pl-4" to="/app/VehicleFuelRefillReport">
                                            <Text color={theme.orange} fontSize="lg">
                                                Vehicle Fuel Refill Report
                                            </Text>
                                        </Link>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <Link className="flex items-center pl-16" to="/app/DriverReport">
                                <Text color={theme.orange} fontSize="lg">
                                    Driver Report
                                </Text>
                            </Link>
                            <Link className="flex items-center pl-16" to="/app/HelperReport">
                                <Text color={theme.orange} fontSize="lg">
                                    Helper Report
                                </Text>
                            </Link>
                            <Link className="flex items-center pl-16" to="/app/StaffReport">
                                <Text color={theme.orange} fontSize="lg">
                                    Staff Report
                                </Text>
                            </Link>
                            <Link className="flex items-center pl-16" to="/app/TripReport">
                                <Text color={theme.orange} fontSize="lg">
                                    Trip Report
                                </Text>
                            </Link>
                            <Link className="flex items-center pl-16" to="/app/AccidentReport">
                                <Text color={theme.orange} fontSize="lg">
                                    Accident Report
                                </Text>
                            </Link>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </VStack>
        </div>
    );
}
