import React from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import "./Student.css";
import { useNavigate } from 'react-router-dom';

export const Student = () => {
    const navigate = useNavigate();

    return (

        //RENDER STUDENT CONTAINER
        <Container> 
                <Row className="d-flex justify-content-center mt-5">
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1" >
                    <div className="adminCardTitle1">
                            <div>

                                {/* CONVOCATIONS BUTTON */}
                            <Button
                                    className="w-100 userCardTitle"
                                    onClick={() => navigate("/convocation")}
                                >
                                    CONVOCATORIAS
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="adminCardTitle1">
                            <div>

                                {/* MY PROGRAMS BUTTON */}
                            <Button
                                    className="w-100 userCardTitle"
                                    onClick={() => navigate("/myPrograms")}
                                >
                                    MIS CURSOS
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="adminCardTitle1">
                            <div>

                                {/* REQUEST */}
                            <Button
                                    className="w-100 userCardTitle"
                                    onClick={() => navigate("/inscription")}
                                >
                                    SOLICITAR INSCRIPCIÓN
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="adminCardTitle1">
                            <div>

                                {/* REQUEST */}
                            <Button
                                    className="w-100 userCardTitle"
                                    onClick={() => navigate("/messageConvo")}
                                >
                                    Foro
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
    );
}