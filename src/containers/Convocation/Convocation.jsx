import React, { useState, useEffect } from "react";
import { useFetchAppointments } from "../../../hooks/useFetchConvocation";
import { Col, Table, Container, Form, Card, Button } from "react-bootstrap";
import "./Convocation.css"
import { useNavigate } from "react-router-dom";
import { inputHandler } from "../../services/useful";

export const Convocation = () => {

    const [searchText, setSearchText] = useState("");

    //GET THE APPOINTMENT FROM THE HOOK
    const appointments = useFetchAppointments();

    //STATE TO GET THE FILTERED APPOINTMENTS
    const [filteredAppointments, setfilteredAppointments] = useState([]);
    console.log(appointments);

    //UPDATE THE APPOINTMENTS WHEN CHANGE TH E STATE OF APPOINTMENTS
    useEffect(() => {
        setfilteredAppointments(appointments)
    }, [appointments])

    //MAKE THE SEARCH FILTERED
    useEffect(() => {
        const searchAppointment = (text) => {
            let filtered = appointments;

            if (text && appointments) {
                filtered = (appointments.filter(
                    (appointment) => appointment.dentist.name.includes(text) || appointment.patient.name.includes(text) || appointment.date.includes(text)))
            }
            setfilteredAppointments(filtered);
        }
        //ADD TIMEOUT
        const timeOutId = setTimeout(() =>
            searchAppointment(searchText.text), 500);
        return () => clearTimeout(timeOutId);
    }, [searchText, appointments]);

    const navigate = useNavigate();
    if (!filteredAppointments) {
        return <div>Cargando...</div>;
    }
    console.log("soylaconvo", filteredAppointments);
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
            </tr>
        </thead>
        <tbody>
            {filteredAppointments.map((convocation) => (
                <tr key={convocation.id}>
                    <td>{convocation.id}</td>
                    {/* Uncomment the line below to include patient details */}
                    {/* <td>{convocation.name} {convocation.user.surname}</td> */}
                    <td>{convocation.program.name}</td>
                    <td>{convocation.beginning}</td>
                    <td>{convocation.end}</td>
                    <div className="d-flex justify-content-center buttonsAppointments"> {/* Use d-flex and justify-content-between to display buttons side by side */}
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
