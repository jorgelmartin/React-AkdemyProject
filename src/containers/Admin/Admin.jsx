import React from "react";
import { Button, Col , Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./Admin.css";

export const Admin = () => {
    const navigate = useNavigate();

    return (
        // RENDER THE ADMIN PAGE
        <div className="adminContainer">
            <Container> 
                <Row className="d-flex justify-content-center mt-5">
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1" >
                    <div className="adminCardTitle1">
                            <div>
                                {/* SHOW BUTTON TO GO TO USERS */}
                                <Button
                                    className="w-100 adminCardTitle"
                                    onClick={() => navigate("/users")}
                                >
                                    USUARIOS
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="adminCardTitle1">
                            <div>
                                {/* SHOW BUTTON TO GO TO CONVOCATIONS */}
                                <Button
                                    className="w-100 adminCardTitle"
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
                                {/* SHOW BUTTON TO GO TO CREATE CONVOCATIONS */}
                                <Button
                                    className="w-100 adminCardTitle"
                                    onClick={() => navigate("/createConvocation")}
                                >
                                    CREAR C.
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10} md={5} lg={3} className="d-flex justify-content-center g-1">
                        <div className="adminCardTitle1" >
                            <div>
                                {/* SHOW BUTTON TO GO TO REQUESTS */}
                                <Button
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