import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isWeekend, format } from "date-fns";

export const SelectDate = ({ handleChange, value }) => {
    //USER SELECTED DATE FROM THE FATHER COMPONENT
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        // When the value from the parent changes, update the selectedDate state
        setSelectedDate(value ? new Date(value) : null);
    }, [value]);

    const handleDateChange = (date) => {
        // VERIFY IF IS WEEKEND
        if (!isWeekend(date)) {
            setSelectedDate(date);

            // Format the date as "YYYY-MM-DD" before sending it to the parent component
            const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
            handleChange(formattedDate);
        }
    };

    return (
        <>
            <DatePicker
                id="dateSelect"
                className="inputConvocation"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona fecha"
                dropdownMode="select"
                isClearable
            />
        </>
    );
};