import { Button, Col, Container, Row } from "react-bootstrap";
import "./Student.css";
import { useNavigate } from 'react-router-dom';

export const Student = () => {
    const navigate = useNavigate();

    return (
        //RENDER STUDENT CONTAINER
            <Container className='mt-5'>
                <Row> 
                    <Col className="d-flex justify-content-center g-1" >
                        <div className="menuCard">
                            <div>

                                {/* CONVOCATIONS BUTTON */}
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

                                {/* MY PROGRAMS BUTTON */}
                                <Button
                                    className="w-100 menuCardTitle"
                                    onClick={() => navigate("/myPrograms")}
                                >
                                    MIS CURSOS
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center g-1">
                        <div className="menuCard">
                            <div>

                                {/* REQUEST */}
                                <Button
                                    className="w-100 menuCardTitle"
                                    onClick={() => navigate("/inscription")}
                                >
                                    SOLICITAR INSCRIPCIÓN
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center g-1">
                        <div className="menuCard">
                            <div>

                                {/* STUDENDS MESSAGES */}
                                <Button
                                    className="w-100 menuCardTitle"
                                    onClick={() => navigate("/MessageApp")}
                                >
                                    Sala
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row> 
            </Container>
    );
}