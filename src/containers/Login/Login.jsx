import React, { useState, useEffect } from "react";
import "./Login.css";

import { loginMe } from "../../services/apiCalls";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { InputText } from "../../components/InputText/InputText";
// import { inputHandler } from "../../services/useful";

export const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [token, setToken] = useState("");
    const [userError, setUserError] = useState({
        emailError: false,
        password: false
    });


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
                console.log(res.data.token);
            })
            .catch((error) => {
                setUserError({ credentials: error.response.data.message });
            });
    };
    // USE DISPATCH 
    useEffect(() => {
        if (token) {
            console.log("Soy el token", token);
            console.log("Soy el tokendecoded", userLogin);
            //No hace falta decodificar el token, llega deco del back
            // let decoded = jwtDecode(token);
            // console.log("Soy el tokendecoded", decoded);
            dispatch(
                login({
                    token: token,
                    name: userLogin.name, // Corregir esta línea
                    role: userLogin.role_id,
                    userId: userLogin.id,
                })
            );
            navigate("/");
        }
    }, [token, userLogin]);

    // const submitHandler = (e, body) => {
    //     e.preventDefault();
    //     loginMe(body)
    //         .then((res) => {
    //             setToken(res.token);
    //             console.log(res.data); // Verificar los detalles del objeto recibido en la consola
    
    //             // Despachar la acción de inicio de sesión con los datos del usuario obtenidos de la respuesta
    //             dispatch(
    //                 login({
    //                     token: res.token,
    //                     name: res.data.data.name,
    //                     role: res.data.data.role,
    //                     userId: res.data.data.id,
    //                 })
    //             );
    
    //             navigate("/");
    //         })
    //         .catch((error) => {
    //             setUserError({ credentials: error.response.data.message });
    //         });
    // };

    return (
        <div className="loginDesign">
            {/* {welcome !== "" ? (
            <div>{welcome}</div>
        ) : ( */}
            {/* La utilidad de la siguiente linea es renderizar un hook at tiempo real en el DOM */}
            {/* {<pre>{JSON.stringify(credentials, null, 2)}</pre>} */}
            <Container className="d-flex justify-content-center align-items-center mt-4">
                <Card style={{ backgroundColor: '#3c709a61' }}>
                    <Card.Title className="text-center mb-3 display-5">Iniciar sesión</Card.Title>
                    <Card.Body>
                        <Row className="justify-content-center align-items-center">
                            <Col xs={10} md={6}>
                                <Form as={Row}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email:</Form.Label>
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
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password:</Form.Label>
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
                                    </Form.Group>
                                    {userError?.credentials ? (
                                        <div>{userError.credentials}</div>
                                    ) : (
                                        <div></div>
                                    )}
                                    <Button
                                        style={{ backgroundColor: '#13326fba' }}
                                        type="submit"
                                        onClick={(e) => {
                                            submitHandler(e, user);
                                        }}
                                    >
                                        Aceptar
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};