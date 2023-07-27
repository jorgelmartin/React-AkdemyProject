
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
            // id: datos.data.userId
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
    console.log("Soyla",convocationData);
    return (
        <div className="ContainerCreate1">
            <div className="ContainerCreate">
                <Container>
                    <Row className="CreateAppointmentCard">
                        <Col xs={12} sm={12} md={12}>
                            <Card style={{ backgroundColor: '#3c709a61' }}>
                                <Card.Body>
                                <Card.Title className="text-center mb-3 display-5">Convocatoria</Card.Title>
                                    <Form>
                                        <Form.Group as={Row}>
                                            <Form.Label column xs={4} sm={5}>Programas:</Form.Label>
                                            <Col xs={6} sm={6}>
                                                <SelectPrograms
                                                    className="programSelector"
                                                    name={"program_id"}
                                                    value={convocationData.program_id}
                                                    handleChange={(value) => {
                                                        setConvocationData({
                                                            ...convocationData,
                                                            program_id: parseInt(value),
                                                        }) }
                                                    }
                                                >
                                                </SelectPrograms>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column xs={4} sm={5}>Inicio:</Form.Label>
                                            <Col xs={6} sm={6}>
                                                <SelectDate
                                                    className="dateSelector"
                                                    name={"beginning"}
                                                    value={convocationData.beginning}
                                                    handleChange={(value) => {
                                                        setConvocationData({
                                                            ...convocationData,
                                                            beginning: value,
                                                        }) }
                                                    }>
                                                </SelectDate>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Label column xs={4} sm={5}>Duración:</Form.Label>
                                            <Col xs={6} sm={6}>
                                                <SelectSchedule
                                                    className="scheduleSelector"
                                                    name={"schedule_id"}
                                                    value={convocationData.schedule_id}
                                                    handleChange={(value) => {
                                                        setConvocationData({
                                                            ...convocationData,
                                                            schedule: value,
                                                        }) }
                                                    }>
                                                </SelectSchedule>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                    <Button onClick={createApp} style={{ backgroundColor: '#13326fba' }} className="w-50">Aceptar!</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
};