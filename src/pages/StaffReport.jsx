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

export default function StaffReport() {

    const breadcrumbs = [
        {label: 'Reports', link: '/'},
        {label: 'Staff Report', link: '/'},
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
            Header: 'Emergency Contact',
            accessor: 'emcontact',
        },
        {
            Header: 'Job Title',
            accessor: 'jobtitle',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Action',
            accessor: 'action',
        }
    ]
    const dataTemplate = {
        firstname: '-',
        lastname: '-',
        dob: '-',
        nic: '-',
        email: '-',
        no: '-',
        emcontact: '-',
        jobtitle: '-',
        status: '-',
        action: '-'
    };

    const data = Array(11).fill().map(() => ({ ...dataTemplate }));


    return (
        <>
            <PageHeader title="Staff Report" breadcrumbs={breadcrumbs}/>
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
