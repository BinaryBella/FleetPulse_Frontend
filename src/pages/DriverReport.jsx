// Importing necessary components and libraries
import PageHeader from "../components/PageHeader.jsx";
import MyTable from "../components/MyTable.jsx";
import { Button } from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import DatePicker from "../components/MyCalendar.jsx";

// Define the DriverReport functional component
export default function DriverReport() {

    // Breadcrumbs data for navigation
    const breadcrumbs = [
        {label: 'Reports', link: '/'},
        {label: 'Driver Report', link: '/'},
    ];

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    // Function to handle form cancellation
    const handleCancel = () => {
        console.log('Cancelled');
    };

    // Define columns for the table
    const columns = [
        // Column definitions
        // Each column has a Header (displayed title) and an accessor (key to access data)
        {
            Header: 'First Name',
            accessor: 'firstname',
        },
        {
            Header: 'Last Name',
            accessor: 'lastname',
        },
        {
            Header: 'DOB',
            accessor: 'dob',
        },
        {
            Header: 'NIC',
            accessor: 'nic',
        },
        {
            Header: 'Email Address',
            accessor: 'email',
        },
        {
            Header: 'Phone No',
            accessor: 'no',
        },
        {
            Header: 'Driver Lic No',
            accessor: 'licno',
        },
        {
            Header: 'Emergency Contact',
            accessor: 'emcontact',
        },
        {
            Header: 'Blood Group',
            accessor: 'bloodgrp',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Action',
            accessor: 'action',
        }
    ];

    // Sample data for the table
    const dataTemplate = {
        firstname: '-',
        lastname: '-',
        dob: '-',
        nic: '-',
        email: '-',
        no: '-',
        licno: '-',
        emcontact: '-',
        bloodgrp: '-',
        status: '-',
        action: '-'
    };

    const data = Array(11).fill().map(() => ({ ...dataTemplate }));

    // Render the component
    return (
        <>
            {/* Render PageHeader component with title and breadcrumbs */}
            <PageHeader title="Driver Report" breadcrumbs={breadcrumbs}/>

            {/* Render DatePicker component */}
            <div className="flex flex-col gap-3">
                <DatePicker />
            </div>

            {/* Render buttons for Generate and Print actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginRight: '70px' }}>
                {/* Generate button */}
                <Button
                    bg={theme.purple}
                    _hover={{bg: theme.onHoverPurple}}
                    color="#ffffff"
                    variant="solid"
                    w="230px"
                    marginTop="10"
                    onClick={handleSubmit}
                >
                    Generate
                </Button>

                {/* Print button */}
                <Button
                    bg={theme.purple}
                    _hover={{bg: theme.onHoverPurple}}
                    color="#ffffff"
                    variant="solid"
                    w="230px"
                    marginTop="10"
                    onClick={handleSubmit}
                >
                    Print
                </Button>
            </div>

            {/* Render MyTable component with columns and data */}
            <div>
                <MyTable columns={columns} data={data} />
            </div>
        </>
    );
}