import React, { useState, useEffect } from "react";
import "./Login.css";
import { loginMe } from "../../services/apiCalls";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
// import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { InputText } from "../../components/InputText/InputText";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
// import { inputHandler } from "../../services/useful";

export const Login = () => {

    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [userError, setUserError] = useState({});


    //DISPATCH WRITE MODE
    const dispatch = useDispatch();

    //USESELECTOR READING MODE
    // const credentialsRdx = useSelector(userData);

    const navigate = useNavigate();

    // const [welcome, setWelcome] = useState("");

    const [userLogin, setUserLogin] = useState({});

    //SENDING FORM LOGIN
    const submitHandler = (e, body) => {
        e.preventDefault();
        console.log(body);
        loginMe(body)
            .then((res) => {
                setToken(res.data.token);
                setUserLogin(res.data.data);
            })
            .catch((error) => {
                setUserError({ credentials: error.response.data.message });
            });
    };
    // USE DISPATCH 
    useEffect(() => {
        if (token) {
            dispatch(
                login({
                    token: token,
                    name: userLogin.name,
                    role: userLogin.role_id,
                    userId: userLogin.id,
                })
            );
            navigate("/");
        }
    }, [token, userLogin]);

    return (
        <div className="loginDesign">
            {/* {welcome !== "" ? (
            <div>{welcome}</div>
        ) : ( */}
            {/* La utilidad de la siguiente linea es renderizar un hook at tiempo real en el DOM */}
            {/* {<pre>{JSON.stringify(credentials, null, 2)}</pre>} */}
            <Container className="d-flex justify-content-center align-items-center mt-4">
            <Row className="justify-content-center">           <Card
                    style={{
                        backgroundColor: '#9f512121',
                        border: '0.1em solid #614a1971',
                        borderRadius: '1em'
                    }}>
                    <Card.Title className="text-center mb-3 display-5"><strong>Iniciar sesión</strong></Card.Title>
                    <Card.Body className="loginDataUser">
                        <Row className="justify-content-center align-items-center">
                            <Col xs={10} md={6}>
                                <Form as={Row}>
                                    <Form.Group className="mt-3">
                                        <div className="labelLogin">Email:</div>
                                        <Col>
                                            <InputText
                                                type={"email"}
                                                design={userError.emailError ? 'errorInput' : 'normalInput'}
                                                name={"email"}
                                                placeholder={"Enter email"}
                                                state={setUser}
                                                errorState={setUserError}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <div className="labelLogin">Contraseña:</div>
                                        <Col>
                                            <InputText
                                                type={"password"}
                                                design={userError.passwordError ? 'errorInput' : 'normalInput'}
                                                name={"password"}
                                                placeholder={"Contraseña"}
                                                state={setUser}
                                                errorState={setUserError}
                                            />
                                        </Col>
                                    </Form.Group></Form>
                            </Col>
                        </Row>
                    </Card.Body>
                    {userError?.credentials ? (
                        <div>{userError.credentials}</div>
                    ) : (
                        <></>
                    )}
                    <div className="d-flex justify-content-center"> {/* Agrega la clase para centrar el botón */}
      <AkdemyButton
        onClick={(e) => submitHandler(e, user)}
        style={{ backgroundColor: '#13326fba' }}
        type="submit"
        text={"Entrar!"}
      />
    </div>
                </Card>
                </Row>
            </Container>
        </div>
    );
};