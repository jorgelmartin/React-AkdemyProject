
import React, { useState } from "react";
import "./CreateConvocation.css";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SelectPrograms } from "../../../hooks/useFetchSelectPrograms";
import { SelectDate } from "../../../hooks/useFetchSelectDate";
import { userData } from "../../containers/userSlice";
import { useSelector } from "react-redux";
import { createConvocation, updateConvocation } from "../../services/apiCalls";
import { SelectSchedule } from "../../../hooks/useFetchSelectSchedule";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";

export const CreateConvocation = ({ isUpdate, updateData }) => {

    const navigate = useNavigate();
    const datos = useSelector(userData);
    const token = datos?.credentials?.token;

    //UPDATE DATA
    const [convocationData, setConvocationData] = useState(
        {
            ...updateData,
            // id: datos.data.userId 
        }
    );

    //CREATE AND UPDATE APPOINTMENT
    const createApp = (e) => {
        e.preventDefault();
        if (isUpdate) {
            updateConvocation(token, convocationData.id, convocationData)
                .then(() => navigate("/convocation"));
        } else {
            createConvocation(convocationData, token)
                .then(() => navigate("/convocation"));
        }
    };
    return (

        //RENDER CREATE CONVOCATIONS
        <Container>
            <Card style={{ maxWidth: '20em', margin: '0 auto' }}>
                <div className="cardCreate">
                    <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Convocatoria</h2>
                    <div className="rowCreate">

                        {/* PROGRAM SELECTOR */}
                        <strong>Curso:</strong>
                        <SelectPrograms
                            name="program_id"
                            value={convocationData.program_id}
                            handleChange={(value) => {
                                setConvocationData({
                                    ...convocationData,
                                    program_id: parseInt(value),
                                });
                            }}
                        />
                    </div>
                    <div className="rowCreate">

                        {/* BEGINNING SELECTOR */}
                        <strong>Inicio:</strong>
                        <SelectDate
                            name="beginning"
                            value={convocationData.beginning}
                            handleChange={(value) => {
                                setConvocationData({
                                    ...convocationData,
                                    beginning: value,
                                });
                            }}
                        />
                    </div>
                    <div className="rowCreate">

                        {/* SCHEDULE SELECTOR */}
                        <strong>Horario:</strong>
                        <SelectSchedule
                            name="schedule_id"
                            value={convocationData.schedule_id}
                            handleChange={(value) => {
                                setConvocationData({
                                    ...convocationData,
                                    schedule: value,
                                });
                            }}
                        />
                    </div>

                    {/* AKDEMY BUTTON */}
                    <div style={{ textAlign: 'center' }}>
                        <AkdemyButton
                            onClick={createApp}
                            style={{ backgroundColor: '#13326fba' }}
                            text="Aceptar"
                        />
                    </div>
                </div>
            </Card>
        </Container>
    );
};