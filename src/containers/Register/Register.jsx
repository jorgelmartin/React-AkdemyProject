import React, { useState } from "react";
import "./Register.css";
import { InputText } from "../../components/InputText/InputText";
import { Form, Card, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
import { registerMe } from "../../services/apiCalls";

export const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userError, setUserError] = useState({});

    //REGISTER FUNCTION
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
        //RENDER REGISTER
        <div className="registerDesign">
            <Container className="d-flex justify-content-center align-items-center mt-4">
                <Card className="registerCard" style={{
                    backgroundColor: '#9f512121', maxWidth: '25em',
                }}>
                    <Card.Body>

                        {/* REGISTER TITLE */}
                        <Card.Title className="text-center mb-3 display-5"><strong>Registro</strong></Card.Title>
                            <Form as={Row}>

                            {/* Nombre */}
                        <div className="dataUserRegister">
                            <div className="profileLabelRegister">Nombre:</div>
                                <div className="dataRegister">
                                    <InputText
                                        type={"text"}
                                        design={userError.nameError ? 'errorInput' : 'normalInput'}
                                        placeholder={"Ingrese su nombre..."}
                                        name={"name"}
                                        state={setUser}
                                        errorState={setUserError}
                                    />
                                    <div className="errorText">{userError.nameError}</div>
                                </div>
                            </div>

                            {/* Apellido */}
                            <div className="dataUserRegister">
                                <div className="profileLabelRegister">Apellido:</div>
                                <div className="dataRegister">
                                    <InputText
                                        type={"text"}
                                        design={userError.surnameError ? 'errorInput' : 'normalInput'}
                                        placeholder={"Ingrese su apellido..."}
                                        name={"surname"}
                                        state={setUser}
                                        errorState={setUserError}
                                    />
                                    <div className="errorText">{userError.surnameError}</div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="dataUserRegister">
                                <div className="profileLabelRegister">Email:</div>
                                <div className="dataRegister">
                                    <InputText
                                        type={"email"}
                                        design={userError.emailError ? 'errorInput' : 'normalInput'}
                                        placeholder={"Ingrese su email..."}
                                        name={"email"}
                                        state={setUser}
                                        errorState={setUserError}
                                    />
                                    <div className="errorText">{userError.emailError}</div>
                                </div>
                            </div>
                            {/* Contraseña */}
                            <div className="dataUserRegister">
                                <div className="profileLabelRegister">Contraseña:</div>
                                <div className="dataRegister">
                                    <InputText
                                        type={"password"}
                                        design={userError.passwordError ? 'errorInput' : 'normalInput'}
                                        placeholder={"Ingrese su contraseña..."}
                                        name={"password"}
                                        state={setUser}
                                        errorState={setUserError}
                                    />
                                    <div className="errorText">{userError.passwordError}</div>
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