import React from "react";

//SCHEDULE SELECTOR
export const SelectSchedule = ({ handleChange, value }) => {
    const schedules = [
        { "id": 1, "schedule": "Mañanas 09:00-14:00" },
        { "id": 2, "schedule": "Tardes 15:00-20:00" }
    ];

    return (
        <select
            id={"scheduleSelect"}
            className="inputConvocation"
            value={value}
            onChange={(e) => handleChange(e.target.value)}>
            <option value="">Selecciona horario</option>
            {schedules.map((schedule) => (
                <option key={schedule.id} value={schedule.schedule}>
                    {schedule.schedule}
                </option>
            ))}
        </select>
    );
};