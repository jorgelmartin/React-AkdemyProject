import React, { useState } from "react";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import './ProgramSelection.css';

export const ProgramSelection = ({ onSelectProgram }) => {
    const [selectedProgram, setSelectedProgram] = useState(null);
    const programs = useFetchPrograms(); 

    const handleProgramSelect = (programId) => {
        setSelectedProgram(programId);
        onSelectProgram(programId);
    };

    return (
        <div className="programContainer">
            <h2>Comunidad</h2>
            {programs.map((program) => (
                <div
                    key={program.id}
                    onClick={() => handleProgramSelect(program.id)}
                    className={`programItem ${selectedProgram === program.id ? "selected" : ""}`}
                >
                    {program.name}
                </div>
            ))}
        </div>
    );
};