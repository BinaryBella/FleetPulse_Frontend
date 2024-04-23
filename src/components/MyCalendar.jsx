// Import necessary libraries and components
import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define the MyCalendar functional component
export default function MyCalendar() {

    // State variables for start and end dates
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // State variables for controlling calendar visibility
    const [startCalendarOpen, setStartCalendarOpen] = useState(false);
    const [endCalendarOpen, setEndCalendarOpen] = useState(false);

    // Refs for calendar DOM elements
    const startCalendarRef = useRef(null);
    const endCalendarRef = useRef(null);

    // Toggle function to open/close start calendar
    const toggleStartCalendar = () => {
        setStartCalendarOpen(!startCalendarOpen);
        setEndCalendarOpen(false); // Close end calendar
    };

    // Toggle function to open/close end calendar
    const toggleEndCalendar = () => {
        setEndCalendarOpen(!endCalendarOpen);
        setStartCalendarOpen(false); // Close start calendar
    };

    // Function to handle clicks outside of calendars to close them
    const handleOutsideClick = (event) => {
        if (startCalendarRef.current && !startCalendarRef.current.contains(event.target)) {
            setStartCalendarOpen(false);
        }

        if (endCalendarRef.current && !endCalendarRef.current.contains(event.target)) {
            setEndCalendarOpen(false);
        }
    };

    // Add event listener to handle outside clicks when component mounts
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    // Render the component
    return (
        <div className="custom-datepicker">
            {/* Start Date Input */}
            <label className="datepicker-label" style={{ marginRight: '20px', fontWeight: 'bold', color: '#393970' }}>
                📅 Start Date
                <input
                    className="datepicker-input"
                    onClick={toggleStartCalendar}
                    value={startDate ? startDate.toDateString() : ''}
                    readOnly
                    style={{ border: '1px solid #000', marginLeft:'4px' }}
                />
            </label>

            {/* End Date Input */}
            <label className="datepicker-label" style={{ marginRight: '20px', fontWeight: 'bold', color: '#393970' }}>
                📅 End Date
                <input
                    className="datepicker-input"
                    onClick={toggleEndCalendar}
                    value={endDate ? endDate.toDateString() : ''}
                    readOnly
                    style={{ border: '1px solid #000', marginLeft:'4px' }}
                />
            </label>

            {/* Render start date calendar if open */}
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

            {/* Render end date calendar if open */}
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
        </div>
    );
}
