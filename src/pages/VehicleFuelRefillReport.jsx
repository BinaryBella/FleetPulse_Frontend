import PageHeader from "../components/PageHeader.jsx";
import MyTable from "../components/MyTable.jsx";
import {
    Button,
    Checkbox,
    Input,
    Select
} from "@chakra-ui/react";
import theme from "../config/ThemeConfig.jsx";
import {MdArrowDropDown} from "react-icons/md";
import DatePicker from "../components/MyCalendar.jsx";

export default function VehicleFuelRefillReport() {

    const breadcrumbs = [
        {label: 'Reports', link: '/'},
        {label: 'Vehicle Reports', link: '/'},
        {label: 'Vehicle Fuel Refill Report', link: '/'},
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    const handleCancel = () => {
        console.log('Cancelled');
    };
    const columns =[
        {
            Header: 'Reg No',
            accessor: 'regno',
        },
        {
            Header: 'Driver NIC',
            accessor: 'drivernic',
        },
        {
            Header: 'Helper NIC',
            accessor: 'helpernic',
        },
        {
            Header: 'Liter Count',
            accessor: 'litercount',
        },
        {
            Header: 'Date',
            accessor: 'date',
        },
        {
            Header: 'Time',
            accessor: 'time',
        },
        {
            Header: 'Refill Type',
            accessor: 'refilltype',
        },
        {
            Header: 'Cost',
            accessor: 'cost',
        },
        {
            Header: 'Action',
            accessor: 'action',
        }
    ]
    const dataTemplate = {
        regno: '-',
        drivernic: '-',
        helpernic: '-',
        litercount: '-',
        date: '-',
        time: '-',
        refilltype: '-',
        cost: '-',
        action: '-'
    };

    const data = Array(14).fill().map(() => ({ ...dataTemplate }));


    return (
        <>
            <PageHeader title="Vehicle Fuel Refill Report" breadcrumbs={breadcrumbs}/>
            <div className="flex flex-col gap-3">
                <DatePicker />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginRight: '70px' }}>
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
            <div>
                <MyTable columns={columns} data={data} />
            </div>

        </>
    );
}
