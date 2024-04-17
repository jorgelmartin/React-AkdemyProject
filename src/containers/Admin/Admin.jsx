import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "../../App.css";

export const Admin = () => {
    const navigate = useNavigate();

    return (
        // RENDER THE ADMIN PAGE
        <Container className='mt-5'>
            <Row>
                <Col className="d-flex justify-content-center g-1" >
                    <div className="menuCard">

                        {/* SHOW BUTTON TO GO TO USERS */}
                        <div
                            className="menuCardTitle"
                            onClick={() => navigate("/users")}
                        >
                            USUARIOS
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center g-1">
                    <div className="menuCard">

                        {/* SHOW BUTTON TO GO TO CONVOCATIONS */}
                        <div
                            className="menuCardTitle"
                            onClick={() => navigate("/convocation")}
                        >
                            CONVOCATORIAS
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center g-1">
                    <div className="menuCard">

                        {/* SHOW BUTTON TO GO TO CREATE CONVOCATIONS */}
                        <div
                            className="menuCardTitle"
                            onClick={() => navigate("/createConvocation")}
                        >
                            CREAR C.
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center g-1">
                    <div className="menuCard" >

                        {/* SHOW BUTTON TO GO TO REQUESTS */}
                        <div
                            className="menuCardTitle"
                            onClick={() => navigate("/userRequest")}
                        >
                            SOLICITUDES
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};