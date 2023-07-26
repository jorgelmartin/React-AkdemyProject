import React, { useState, useEffect } from "react";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { Table, Container } from "react-bootstrap";
import "./Convocation.css"
import { useNavigate } from "react-router-dom";
import { inputHandler } from "../../services/useful";

export const Convocation = () => {

    const [searchText, setSearchText] = useState("");

    //GET THE APPOINTMENT FROM THE HOOK
    const convocations = useFetchConvocations();

    //STATE TO GET THE FILTERED Convocations
    const [filteredConvocations, setfilteredConvocations] = useState([]);

    //UPDATE THE Convocations WHEN CHANGE TH E STATE OF Convocations
    useEffect(() => {
        setfilteredConvocations(convocations)
    }, [convocations])

    //MAKE THE SEARCH FILTERED
    useEffect(() => {
        const searchAppointment = (text) => {
            let filtered = convocations;
            console.log(convocations);

            if (text && convocations) {
                filtered = (convocations.filter(
                    (appointment) => appointment.dentist.name.includes(text) || appointment.patient.name.includes(text) || appointment.date.includes(text)))
            }
            setfilteredConvocations(filtered);
        }
        //ADD TIMEOUT
        const timeOutId = setTimeout(() =>
            searchAppointment(searchText.text), 500);
        return () => clearTimeout(timeOutId);
    }, [searchText, convocations]);

    const navigate = useNavigate();
    if (!filteredConvocations) {
        return <div>Cargando...</div>;
    }
    return (
        <div className="searchAppointment">
            <Container className="mt-5">
                {/* INPUT SEARCH */}
                <input
                    className="InputSearch"
                    type={"text"}
                    name={"text"}
                    placeholder={"Buscar cita..."}
                    onChange={(e) => inputHandler(e, setSearchText)}
                />
                {/* APPOINTMENT CARD */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            {/* Uncomment the line below to include patient details */}
                            {/* <th>Paciente</th> */}
                            <th>Programa</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            {/* <th>Descripción</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConvocations.map((convocation) => (
                            <tr key={convocation.id}>
                                <td>{convocation.id}</td>
                                {/* Uncomment the line below to include patient details */}
                                {/* <td>{convocation.name} {convocation.user.surname}</td> */}
                                <td>{convocation.program.name}</td>
                                <td>{convocation.beginning}</td>
                                <td>{convocation.end}</td>
                                {/* <td>{convocation.program.description}</td> */}
                                <div className="d-flex justify-content-center buttonsConvocations"> {/* Use d-flex and justify-content-between to display buttons side by side */}
                                    <button className="buttonUpdate" onClick={() => navigate(`/appointmentdetail/${convocation.id}`)}>Detalle</button>
                                    {/* <button className="buttonDelete">borrar</button> */}
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};
