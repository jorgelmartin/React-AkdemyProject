import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./Admin.css";

export const Admin = () => {
    const navigate = useNavigate();

    return (
        // RENDER THE ADMIN PAGE
        <Container className='mt-5'>
            <Row>
                <Col className="d-flex justify-content-center g-1" >
                    <div className="menuCard">
                        <div>
                            {/* SHOW BUTTON TO GO TO USERS */}
                            <Button
                                className="w-100 menuCardTitle"
                                onClick={() => navigate("/users")}
                            >
                                USUARIOS
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center g-1">
                    <div className="menuCard">
                        <div>
                            {/* SHOW BUTTON TO GO TO CONVOCATIONS */}
                            <Button
                                className="w-100 menuCardTitle"
                                onClick={() => navigate("/convocation")}
                            >
                                CONVOCATORIAS
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center g-1">
                    <div className="menuCard">
                        <div>
                            {/* SHOW BUTTON TO GO TO CREATE CONVOCATIONS */}
                            <Button
                                className="w-100 menuCardTitle"
                                onClick={() => navigate("/createConvocation")}
                            >
                                CREAR C.
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center g-1">
                    <div className="menuCard" >
                        <div>
                            {/* SHOW BUTTON TO GO TO REQUESTS */}
                            <Button
                                className="w-100 menuCardTitle"
                                onClick={() => navigate("/userReq")}
                            >
                                SOLICITUDES
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};