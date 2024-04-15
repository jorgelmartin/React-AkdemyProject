import { Col, Container, Row } from "react-bootstrap";
import "../../App.css";
import { useNavigate } from 'react-router-dom';

export const Student = () => {
    const navigate = useNavigate();

    return (
        //RENDER STUDENT'S MENU
            <Container className='mt-5'>
                <Row> 
                    <Col className="d-flex justify-content-center g-1" >
                            <div className="menuCard">
                                
                                {/* CONVOCATIONS BUTTON */}
                                <div
                                    className=" menuCardTitle"
                                    onClick={() => navigate("/convocation")}
                                >
                                    CONVOCATORIAS
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center g-1">
                        <div className="menuCard">

                                {/* MY PROGRAMS BUTTON */}
                                <div
                                    className="menuCardTitle"
                                    onClick={() => navigate("/myPrograms")}
                                >
                                    MIS CURSOS
                                </div>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center g-1">
                            <div className="menuCard">

                                {/* REQUEST */}
                                <div
                                    className="menuCardTitle"
                                    onClick={() => navigate("/inscription")}
                                >
                                    SOLICITAR INSCRIPCIÓN
                                </div>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center g-1">
                        <div className="menuCard">

                                {/* STUDENDS MESSAGES */}
                                <div
                                    className="menuCardTitle"
                                    onClick={() => navigate("/MessageApp")}
                                >
                                    SALAS👥💬
                            </div>
                        </div>
                    </Col>
                </Row> 
            </Container>
    );
}