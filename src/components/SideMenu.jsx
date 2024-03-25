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
import {accordionTheme} from "./Variant.jsx"

import { accordionAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(accordionAnatomy.keys)

const custom = definePartsStyle({
    panel: {
        border: '1px solid',
        borderColor: 'gray.200',
        background: 'gray.50',
        borderRadius: 'full',

        // Let's also provide dark mode alternatives
        _dark: {
            borderColor: 'gray.600',
            background: 'gray.800',
        },
    },
    icon: {
        border: '1px solid',
        borderColor: 'gray.200',
        background: 'gray.200',
        borderRadius: 'full',
        color: 'gray.500',

        _dark: {
            borderColor: 'gray.600',
            background: 'gray.600',
            color: 'gray.400',
        },
    },
})



export default function SideMenu() {
    let accordionTheme = defineMultiStyleConfig({
        variants: { custom },
    })
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
                    <Accordion  allowMultiple>
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
                                    <Link className="flex items-center pl-16" to="/app/VehicleTypeTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Type
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-16" to="/app/VehicleModelTable">
                                        <Text color={theme.orange} fontSize="lg">
                                            Vehicle Model
                                        </Text>
                                    </Link>
                                    <Link className="flex items-center pl-16" to="/app/ManufactureTable">
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
                <Link className="flex items-center pl-16" to="/app/Driver">
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
                <Link className="flex items-center pl-16" to="/app/Helper">
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
                <Link className="flex items-center pl-16" to="/app/Staff">
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
                <Link className="flex items-center pl-16" to="/app/Trip">
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
                <Link className="flex items-center pl-16" to="/app/AddAccidentDetails">
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
