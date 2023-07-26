import { useEffect, useState } from "react";

export const SelectSchedule = ({ handleChange, value }) => {

    //USER SELECTED DOCTORS FROM THE FATHER COMPONENT
    const [selectedSchedule, setSelectedSchedule] = useState(value);

    const schedules = [
        { "id": 1, "schedule": "Mañanas 09:00-14:00" },
        { "id": 5, "schedule": "Tardes 15:00-20:00" }
    ];

    return (
        <>
            <select className="inputAppointment" value={selectedSchedule} onChange={(e) => {
                handleChange(e.target.value);
                setSelectedSchedule(e.target.value)
            }}>
                <option value="">Selecciona horario:</option>
                {schedules.map((schedule) => (
                    <option key={schedule.id} value={schedule.schedule}>
                        {schedule.schedule}
                    </option>
                ))}
            </select>
        </>
    );
};