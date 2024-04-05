import React, { useState } from "react";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import './ProgramSelection.css';

export const ProgramSelection = ({ onSelectProgram, selectedProgram }) => {
    const [isOpen, setIsOpen] = useState(false);
    const programs = useFetchPrograms(); 
    const [selectedProgramName, setSelectedProgramName] = useState("");

    const handleProgramSelect = (programId, programName) => {
        setSelectedProgramName(programName);
        onSelectProgram(programId);
        setIsOpen(false);
    };

    return (
        <div className="programContainer" >
            <h3 className="programItemTitle" onClick={() => setIsOpen(!isOpen)}>{selectedProgramName || "Selecciona una sala"}</h3>
            {isOpen && (
                <div className="programItem">
                    {programs.map((program) => (
                        <div
                            key={program.id}
                            onClick={() => handleProgramSelect(program.id, program.name)}
                            className={`programItem ${selectedProgram === program.id ? "selected" : ""}`}
                        >
                            {program.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};