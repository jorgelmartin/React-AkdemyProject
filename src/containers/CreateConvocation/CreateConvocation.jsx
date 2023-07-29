
import React, { useState, useEffect } from "react";
import "./CreateConvocation.css";
import { Col, Row, Container, Form, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SelectPrograms } from "../../../hooks/useFetchSelectPrograms";
// import { SelectDoctors } from "../../../hooks/useFetchSelectDoctors";
import { SelectDate } from "../../../hooks/useFetchSelectDate";
// import { SelectHour } from "../../../hooks/useFetchSelectHour";
import { userData } from "../../containers/userSlice";
import { useSelector } from "react-redux";
import { createConvocation, updateConvocation } from "../../services/apiCalls";
import { SelectSchedule } from "../../../hooks/useFetchSelectSchedule";

export const CreateConvocation = ({ isUpdate, updateData }) => {

    const navigate = useNavigate();
    const datos = useSelector(userData);
    const token = datos?.credentials?.token;

    //UPDATE DATA
    const [convocationData, setConvocationData] = useState(
        {
            ...updateData,
            // id: datos.data.userId // VERIFICAR QUE SIRVE Y QUE NO
        }
    );

    //CREATE AND UPDATE APPOINTMENT
    const createApp = () => {
        console.log("Objeto body:", convocationData);
        if (isUpdate) {
            updateConvocation(token, convocationData.id, convocationData)
                .then(() => navigate("/convocation"));
        } else {
            createConvocation(convocationData, token)
                .then(() => navigate("/convocation"));
        }
    };
    console.log("Soyla", convocationData);
    return (
        <Container>
            <Card style={{ maxWidth: '30em', margin: '0 auto' }}>
                <Card.Body>
                    <h2 className="text-center mb-3">Convocatoria</h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Programas:</td>
                                <td>
                                    <SelectPrograms
                                        className="programSelector"
                                        name={"program_id"}
                                        value={convocationData.program_id}
                                        handleChange={(value) => {
                                            setConvocationData({
                                                ...convocationData,
                                                program_id: parseInt(value),
                                            });
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Inicio:</td>
                                <td>
                                    <SelectDate
                                        className="dateSelector"
                                        name={"beginning"}
                                        value={convocationData.beginning}
                                        handleChange={(value) => {
                                            setConvocationData({
                                                ...convocationData,
                                                beginning: value,
                                            });
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Duración:</td>
                                <td>
                                    <SelectSchedule
                                        className="scheduleSelector"
                                        name={"schedule_id"}
                                        value={convocationData.schedule_id}
                                        handleChange={(value) => {
                                            setConvocationData({
                                                ...convocationData,
                                                schedule: value,
                                            });
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center">
                        <Button onClick={createApp} style={{ backgroundColor: '#13326fba' }} className="w-50">Aceptar!</Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
};