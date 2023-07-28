import React from 'react';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./Student.css";
import { useNavigate } from 'react-router-dom';

export const Student = () => {
    const navigate = useNavigate();

    return (
        // <div className="userContainer">
            <Container>
                <Row className="d-flex justify-content-center mt-5">
                    {/*  */}
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="userCardTitle1" style={{ backgroundColor: '#3c709a61' }}>
                            <div>
                            <Button
                                    style={{ backgroundColor: "#13326fba" }}
                                    className="w-100 userCardTitle"
                                    onClick={() => navigate("/convocation")}
                                >
                                    CONVOCATORIAS
                                </Button>
                                <Button
                                    style={{ backgroundColor: "#13326fba" }}
                                    className="w-100 userCardTitle"
                                    onClick={() => navigate("/appointmentcard")}
                                >
                                    MIS CURSOS
                                </Button>
                                <Button
                                    style={{ backgroundColor: "#13326fba" }}
                                    className="w-100 userCardTitle"
                                    onClick={() => navigate("/inscription")}
                                >
                                    SOLICITAR INSCRIPCIÓN
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        // </div>   
    );
}