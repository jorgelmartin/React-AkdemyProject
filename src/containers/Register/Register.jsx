import { useState } from "react";
import "./Register.css";
import { InputText } from "../../components/InputText/InputText";
import { Form, Card, Container, Row } from 'react-bootstrap';
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
import { useNavigate } from "react-router-dom";
import { registerMe } from "../../services/ApiCalls";

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
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100%', width: '100%' }}>
            <Card
                className="registerCard"
                style={{
                    backgroundColor: '#9f512121', maxWidth: '25em',
                }}>
                <Card.Body>

                    {/* REGISTER TITLE */}
                    <Card.Title
                        className="text-center mb-3 display-5"
                        style={{
                            textShadow: '0.03em 0.03em 0.06em rgba(255, 255, 255, 0.503)'
                        }}>
                        <strong>Registro</strong></Card.Title>

                    {/* NAME */}
                    <Form as={Row}>
                        <div className="dataUserRegister">
                            <Form.Label htmlFor="name" className="profileLabelRegister">Nombre:</Form.Label>
                            <div className="dataRegister">
                                <InputText
                                    type={"text"}
                                    design={userError.nameError ? 'errorInput' : 'normalInput'}
                                    placeholder={"Ingrese su nombre..."}
                                    name={"name"}
                                    state={setUser}
                                    errorState={setUserError}
                                    autoCompleteValue={"name"}
                                />
                                <div className="errorText">{userError.nameError}</div>
                            </div>
                        </div>

                        {/* SURNAME */}
                        <div className="dataUserRegister">
                            <Form.Label htmlFor="surname" className="profileLabelRegister">Apellido:</Form.Label>
                            <div className="dataRegister">
                                <InputText
                                    type={"text"}
                                    design={userError.surnameError ? 'errorInput' : 'normalInput'}
                                    placeholder={"Ingrese su apellido..."}
                                    name={"surname"}
                                    state={setUser}
                                    errorState={setUserError}
                                    autoCompleteValue={"family-name"}
                                />
                                <div className="errorText">{userError.surnameError}</div>
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="dataUserRegister">
                            <Form.Label htmlFor="email" className="profileLabelRegister">Email:</Form.Label>
                            <div className="dataRegister">
                                <InputText
                                    type={"email"}
                                    design={userError.emailError ? 'errorInput' : 'normalInput'}
                                    placeholder={"Ingrese su email..."}
                                    name={"email"}
                                    state={setUser}
                                    errorState={setUserError}
                                    autoCompleteValue={"email"}
                                />
                                <div className="errorText">{userError.emailError}</div>
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="dataUserRegister">
                            <Form.Label htmlFor="password" className="profileLabelRegister">Contraseña:</Form.Label>
                            <div className="dataRegister">
                                <InputText
                                    type={"password"}
                                    design={userError.passwordError ? 'errorInput' : 'normalInput'}
                                    placeholder={"Ingrese su contraseña..."}
                                    name={"password"}
                                    state={setUser}
                                    errorState={setUserError}
                                    autoCompleteValue={"current-password"}
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
                                type="submit"
                                text={"Registrarme!"}
                            />
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};