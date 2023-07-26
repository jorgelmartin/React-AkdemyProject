import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isWeekend } from "date-fns";


export const SelectDate = ({handleChange, value}) => {

    //USER SELECTED DATE FROM THE FATHER COMPONENT
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value): null);

    const handleDateChange = (date) => {
        // VERIFY IF IS WEEKEND
        if (!isWeekend(date)) {
            setSelectedDate(date);
            handleChange(date)
        }
    };

    return (
        <>
            <DatePicker className="inputAppointment"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona una fecha"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                isClearable
            />
        </>
    );
};