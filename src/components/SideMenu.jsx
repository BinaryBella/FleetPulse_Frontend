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
import {Link} from "react-router-dom";
import theme from "../config/ThemeConfig.jsx";
import {AiOutlineDashboard} from "react-icons/ai";
import {FaCarAlt, FaCarCrash} from "react-icons/fa";
import {MdAirlineSeatReclineNormal} from "react-icons/md";
import {IoMdPeople, IoMdPerson} from "react-icons/io";
import {BiTrip} from "react-icons/bi";
import {TbReportAnalytics} from "react-icons/tb";
import {Box} from "@chakra-ui/react";


export default function SideMenu() {
    return (
        <div className="bg-[#393970] w-1/5 flex flex-col h-fit">
            <div className="flex justify-center w-full">
                <img src={Logo} alt="Logo" className="w-3/5 mb-10"/>
            </div>
            <VStack
                spacing={4}
                align='stretch'
            >
                <Link className="flex items-center pl-16" to="/app/Dashboard">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='dashboard'
                        fontSize='20px'
                        icon={<AiOutlineDashboard/>}
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Dashboard
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/VehicleDetailsTable">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='vehicle'
                        fontSize='20px'
                        icon={<FaCarAlt/>}
                    />
                    <Accordion allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left' color={theme.orange}>
                                        Vehicle
                                    </Box>
                                    <AccordionIcon color={theme.orange}/>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <div>
                                    <Link className="flex items-center pl-16" to="/app/VehicleDetailsTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Details
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-16" to="/app/VehicleType">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Type
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-16" to="/app/VehicleModelTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Model
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-16" to="/app/Manufacturer">
                                        <Text color={theme.orange} fontSize="lg">
                                            Manufacturer
                                        </Text>
                                    </Link>
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
                <Link className="flex items-center pl-16" to="/app/DriverDetails">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='driver'
                        fontSize='20px'
                        icon={<MdAirlineSeatReclineNormal/>
                        }
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Driver
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/HelperDetails">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='helper'
                        fontSize='20px'
                        icon={< IoMdPerson/>
                        }
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Helper
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/StaffDetails">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='staff'
                        fontSize='20px'
                        icon={< IoMdPeople/>
                        }
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Staff
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/TripDetails">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='trip'
                        fontSize='20px'
                        icon={< BiTrip/>
                        }
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Trip
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/AccidentDetails">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='accident'
                        fontSize='20px'
                        icon={< FaCarCrash/>
                        }
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Accident
                    </Text>
                </Link>
                <Link className="flex items-center pl-16" to="/app/Report">
                    <IconButton
                        variant='link'
                        color={theme.orange}
                        aria-label='report'
                        fontSize='20px'
                        icon={< TbReportAnalytics/>
                        }
                    />
                    <Text color={theme.orange} fontSize="xl">
                        Reports
                    </Text>
                </Link>
            </VStack>
        </div>
    );
}


