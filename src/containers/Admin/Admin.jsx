import React from "react";
import { Button, Col , Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./Admin.css";

export const Admin = () => {
    const navigate = useNavigate();

    return (
        <div className="adminContainer">
            <Container> 
                <Row className="d-flex justify-content-center mt-5">
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1" >
                    <div className="adminCardTitle1" style={{ backgroundColor: '#3c709a61' }}   >
                            <div>
                                <Button
                                    style={{ backgroundColor: "#13326fba" }}
                                    className="w-100 adminCardTitle"
                                    onClick={() => navigate("/users")}
                                >
                                    USUARIOS
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="adminCardTitle1" style={{ backgroundColor: '#3c709a61' }}>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#13326fba" }}
                                    className="w-100 adminCardTitle"
                                    onClick={() => navigate("/convocation")}
                                >
                                    CONVOCATORIAS
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="adminCardTitle1" style={{ backgroundColor: '#3c709a61' }}>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#13326fba" }}
                                    className="w-100 adminCardTitle"
                                    onClick={() => navigate("/createConvocation")}
                                >
                                    CREAR CONVOCATORIA
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="adminCardTitle1" style={{ backgroundColor: '#3c709a61' }}>
                            <div>
                                <Button
                                    style={{ backgroundColor: "#13326fba" }}
                                    className="w-100 adminCardTitle"
                                    onClick={() => navigate("/userReq")}
                                >
                                    SOLICITUDES
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};