import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { Route, Routes, useParams } from 'react-router-dom';

// Import dynamic report components
const DynamicVehicleDetailsReport = React.lazy(() => import('./VehicleDetailsReport'));
const DynamicVehicleFuelRefillReport = React.lazy(() => import('./VehicleFuelRefillReport'));
const DynamicVehicleMaintenanceReport = React.lazy(() => import('./VehicleMaintenanceReport'));
const DynamicVehicleMaintenanceTypeReport = React.lazy(() => import('./VehicleMaintenanceTypeReport'));
const DynamicVehicleManufacturerReport = React.lazy(() => import('./VehicleManufacturerReport'));
const DynamicVehicleModelReport = React.lazy(() => import('./VehicleModelReport'));
const DynamicVehicleTypeReport = React.lazy(() => import('./VehicleTypeReport'));

const DynamicDriverReport = React.lazy(() => import('./DriverReport'));
const DynamicHelperReport = React.lazy(() => import('./HelperReport'));
const DynamicStaffReport = React.lazy(() => import('./StaffReport'));
const DynamicTripReport = React.lazy(() => import('./TripReport'));
const DynamicAccidentReport = React.lazy(() => import('./AccidentReport'));

const Reports = () => {
    const { reportType } = useParams();

    return (
        <Accordion defaultIndex={0} allowMultiple>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        Reports
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Accordion defaultIndex={0} allowMultiple>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    Vehicle Reports
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Accordion defaultIndex={0} allowMultiple>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                Vehicle Details Report
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <React.Suspense fallback={<div>Loading...</div>}>
                                                {reportType === 'vehicle-details' && <DynamicVehicleDetailsReport />}
                                            </React.Suspense>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                Vehicle Fuel Refill Report
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <React.Suspense fallback={<div>Loading...</div>}>
                                                {reportType === 'vehicle-fuel-refill' && <DynamicVehicleFuelRefillReport />}
                                            </React.Suspense>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                Vehicle Maintenance Report
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <React.Suspense fallback={<div>Loading...</div>}>
                                                {reportType === 'vehicle-maintenance' && <DynamicVehicleMaintenanceReport />}
                                            </React.Suspense>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                Vehicle Maintenance Type Report
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <React.Suspense fallback={<div>Loading...</div>}>
                                                {reportType === 'vehicle-maintenance-type' && <DynamicVehicleMaintenanceTypeReport />}
                                            </React.Suspense>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                Vehicle Manufacturer Report
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <React.Suspense fallback={<div>Loading...</div>}>
                                                {reportType === 'vehicle-manufacturer' && <DynamicVehicleManufacturerReport />}
                                            </React.Suspense>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                Vehicle Model Report
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <React.Suspense fallback={<div>Loading...</div>}>
                                                {reportType === 'vehicle-model' && <DynamicVehicleModelReport />}
                                            </React.Suspense>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                Vehicle Type Report
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <React.Suspense fallback={<div>Loading...</div>}>
                                                {reportType === 'vehicle-type' && <DynamicVehicleTypeReport />}
                                            </React.Suspense>
                                        </AccordionPanel>
                                    </AccordionItem>
                                    {/* Add similar accordion items for other vehicle reports */}
                                </Accordion>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    Driver Report
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    {reportType === 'driver' && <DynamicDriverReport />}
                                </React.Suspense>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    Helper Report
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    {reportType === 'helper' && <DynamicHelperReport />}
                                </React.Suspense>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    Staff Report
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    {reportType === 'staff' && <DynamicStaffReport />}
                                </React.Suspense>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    Trip Report
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    {reportType === 'trip' && <DynamicTripReport />}
                                </React.Suspense>
                            </AccordionPanel>
                        </AccordionItem>
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    Accident Report
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    {reportType === 'accident' && <DynamicAccidentReport />}
                                </React.Suspense>
                            </AccordionPanel>
                        </AccordionItem>
                        {/* Add similar accordion items for other report types */}
                    </Accordion>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default Reports;
