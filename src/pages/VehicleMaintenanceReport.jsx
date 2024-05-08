import PageHeader from "../components/PageHeader.jsx";
import MyTable from "../components/MyTable.jsx";
import {
    Button,

} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";

import DatePicker from "../components/MyCalendar.jsx";

export default function VehicleMaintenanceReport() {

    const breadcrumbs = [
        {label: 'Reports', link: '/'},
        {label: 'Vehicle Reports', link: '/'},
        {label: 'Vehicle Maintenance Report', link: '/'},
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };


    const columns =[
        {
            Header: 'Maintenance Status',
            accessor: 'maintenancestatus',
        },
        {
            Header: 'Description',
            accessor: 'description',
        },
        {
            Header: 'Cost',
            accessor: 'cost',
        },
        {
            Header: 'Replaced Parts',
            accessor: 'replacedparts',
        },
        {
            Header: 'Service Provider',
            accessor: 'serviceprovider',
        },
        {
            Header: 'Special Notes',
            accessor: 'specialnotes',
        },
        {
            Header: 'Action',
            accessor: 'action',
        }
    ]
    const dataTemplate = {
        maintenancestatus: '-',
        description: '-',
        cost: '-',
        replacedparts: '-',
        serviceprovider: '-',
        specialnotes: '-',
        action: '-'
    };

    const data = Array(12).fill().map(() => ({ ...dataTemplate }));

    return (
        <>
            <PageHeader title="Vehicle Maintenance Report" breadcrumbs={breadcrumbs}/>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    {/* Date Picker */}
                    <div>
                        <DatePicker />
                    </div>

                    {/* Generate and Print Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginRight: '70px' }}>
                        <Button
                            bg={theme.purple}
                            _hover={{ bg: theme.onHoverPurple }}
                            color="#ffffff"
                            variant="solid"
                            w="230px"
                            marginTop="8"
                            onClick={handleSubmit}
                        >
                            Generate
                        </Button>
                        <Button
                            bg={theme.purple}
                            _hover={{ bg: theme.onHoverPurple }}
                            color="#ffffff"
                            variant="solid"
                            w="230px"
                            marginTop="8"
                            onClick={handleSubmit}
                        >
                            Print
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <MyTable columns={columns} data={data} />
            </div>

        </>
    );
}
