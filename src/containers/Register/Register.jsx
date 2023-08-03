import React, { useState } from "react";
import "./Register.css";
import { InputText } from "../../components/InputText/InputText";
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { registerMe } from "../../services/apiCalls";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";


export const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userError, setUserError] = useState({});

    //SENDING FORM REGISTER
    const submitHandler = (e, body) => {
        e.preventDefault();
        registerMe(body)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                setUserError({ credentials: error.response.data.message });
            });
    };

    return (
        <div className="registerDesign">
            <Container className="d-flex justify-content-center align-items-center mt-4">
                <Card className="registerCard" style={{
                    backgroundColor: '#9f512121', maxWidth: '25em',
                }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-3 display-5"><strong>Registro</strong></Card.Title>
                        <Form as={Row}>
                            {/* Nombre */}
                            <div className="dataUserRegister">
                                <div className="profileLabelRegister">Nombre:</div>
                                <div className="dataRegister">
                                    <InputText
                                        type={"text"}
                                        design={
                                            userError.nameError === ""
                                                ? "normalInputRegister"
                                                : "normalInputRegister errorInput"
                                        }
                                        placeholder={"Ingrese su nombre..."}
                                        name={"name"}
                                        state={setUser}
                                        errorState={setUserError}
                                    />
                                </div></div>

                            {/* Apellido */}
                            <div className="dataUserRegister">
                                <div className="profileLabelRegister">Apellido:</div>
                                <div className="dataRegister">
                                    <InputText
                                        type={"text"}
                                        design={
                                            userError.surnameError === ""
                                                ? "normalInputRegister"
                                                : "normalInputRegister errorInput"
                                        }
                                        placeholder={"Ingrese su apellido..."}
                                        name={"surname"}
                                        state={setUser}
                                        errorState={setUserError}
                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="dataUserRegister">
                                <div className="profileLabelRegister">Email:</div>
                                <div className="dataRegister">
                                    <InputText
                                        type={"email"}
                                        design={
                                            userError.emailError === ""
                                                ? "normalInputRegister"
                                                : "normalInputRegister errorInput"
                                        }
                                        placeholder={"Ingrese su email..."}
                                        name={"email"}
                                        state={setUser}
                                        errorState={setUserError}
                                    />
                                </div>
                            </div>
                            {/* Contraseña */}
                            <div className="dataUserRegister">
                                <div className="profileLabelRegister">Contraseña:</div>
                                <div className="dataRegister">
                                    <InputText
                                        type={"password"}
                                        design={
                                            userError.passwordError === ""
                                                ? "normalInputRegister"
                                                : "normalInputRegister errorInput"
                                        }
                                        placeholder={"Ingrese su contraseña..."}
                                        name={"password"}
                                        state={setUser}
                                        errorState={setUserError}
                                    />
                                </div>
                            </div>

                            {userError?.credentials ? (
                                <div>{userError.credentials}</div>
                            ) : (
                                <div></div>
                            )}
                            <div className="text-center">
                                <AkdemyButton
                                    onClick={(e) => submitHandler(e, user)}
                                    style={{ backgroundColor: '#13326fba' }}
                                    type="submit"
                                    text={"Registrarme!"}
                                />
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};