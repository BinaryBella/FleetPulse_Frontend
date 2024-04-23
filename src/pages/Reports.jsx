import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

const DynamicDriverReport = React.lazy(() => import('./DriverReport'));
const DynamicHelperReport = React.lazy(() => import('./HelperReport'));
const DynamicStaffReport = React.lazy(() => import('./StaffReport'));
const DynamicTripReport = React.lazy(() => import('./TripReport'));
const DynamicAccidentReport = React.lazy(() => import('./AccidentReport'));
const DynamicVehicleReports = React.lazy(() => import('./VehicleReports'));

const Reports = () => {
    const { reportType } = useParams();

    const renderReport = () => {
        switch (reportType) {
            case 'driver':
                return <DynamicDriverReport />;
            case 'helper':
                return <DynamicHelperReport />;
            case 'staff':
                return <DynamicStaffReport />;
            case 'trip':
                return <DynamicTripReport />;
            case 'accident':
                return <DynamicAccidentReport />;
            case 'vehicle':
                return <DynamicVehicleReports />;
            default:
                return <div>Invalid report type</div>;
        }
    };

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            {renderReport()}
        </React.Suspense>
    );
};

export default Reports;
