import { useState, useRef, useEffect } from 'react';
import { Input, Flex, Icon, Text } from '@chakra-ui/react';
import { BsCalendar } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function MyCalendar() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [startCalendarOpen, setStartCalendarOpen] = useState(false);
    const [endCalendarOpen, setEndCalendarOpen] = useState(false);

    const startCalendarRef = useRef(null);
    const endCalendarRef = useRef(null);

    const toggleStartCalendar = () => {
        setStartCalendarOpen(!startCalendarOpen);
        setEndCalendarOpen(false);
    };

    const toggleEndCalendar = () => {
        setEndCalendarOpen(!endCalendarOpen);
        setStartCalendarOpen(false);
    };

    const handleOutsideClick = (event) => {
        if (startCalendarRef.current && !startCalendarRef.current.contains(event.target)) {
            setStartCalendarOpen(false);
        }

        if (endCalendarRef.current && !endCalendarRef.current.contains(event.target)) {
            setEndCalendarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="custom-datepicker">
            <Flex alignItems="center" justifyContent="flex-start">
                {/* Start Date */}
                 <Flex flexDirection="column" alignItems="flex-start" mr={8}>
                    <Text mb={2} mr={4}>Start Date</Text>
                    <Flex alignItems="center" position="relative">
                        <Input
                            type="date"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                           
                            width="300px"
                            name="startDate"
                            placeholder="Start Date"
                            value={startDate ? startDate.toISOString().split('T')[0] : ''}
                            onClick={toggleStartCalendar}
                            readOnly
                        />
                        <Icon as={BsCalendar} onClick={toggleStartCalendar} cursor="pointer" position="absolute" right="10px" top="50%" transform="translateY(-50%)" />
                    </Flex>
                {/* </Flex> */}

                {/* End Date */}
                {/* <Flex flexDirection="column" alignItems="flex-start"> */}
                    <Text mb={2} mr={4}>End Date</Text>
                    <Flex alignItems="center" position="relative">
                        <Input
                            type="date"
                            variant="filled"
                            borderRadius="md"
                            px={3}
                           
                            width="300px"
                            name="endDate"
                            placeholder="End Date"
                            value={endDate ? endDate.toISOString().split('T')[0] : ''}
                            onClick={toggleEndCalendar}
                            readOnly
                        />
                        <Icon as={BsCalendar} onClick={toggleEndCalendar} cursor="pointer" position="absolute" right="10px" top="50%" transform="translateY(-50%)" />
                    </Flex>
                </Flex>
            {/* </Flex> */}

            {startCalendarOpen && (
                <div ref={startCalendarRef}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date);
                            toggleStartCalendar();
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select a date"
                        minDate={new Date('2015-01-01')}
                        maxDate={endDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                        inline
                    />
                </div>
            )}

            {endCalendarOpen && (
                <div ref={endCalendarRef}>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => {
                            setEndDate(date);
                            toggleEndCalendar();
                        }}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select a date"
                        minDate={startDate || new Date('2015-01-01')}
                        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                        inline
                    />
                </div>
            )}
            </Flex>
        </div>
    );
}
