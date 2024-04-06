import { useState, useEffect } from "react";
import "./Login.css";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { InputText } from "../../components/InputText/InputText";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
import { loginMe } from "../../services/ApiCalls";

export const Login = () => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");
    const [userError, setUserError] = useState({});
    const navigate = useNavigate();

    //DISPATCH WRITE MODE
    const dispatch = useDispatch();

    const [userLogin, setUserLogin] = useState({});

    //LOGIN FUNCTION
    const submitHandler = (e, body) => {
        e.preventDefault();

        //SEND TOKEN AND DATA
        loginMe(body)
            .then((res) => {
                setToken(res.token);
                setUserLogin(res.data);
            })
            .catch((error) => {
                setUserError({ credentials: error.response.data.message });
            });
    };

    //SEND USERDATA TO REDUX STORE
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
        //RENDER LOGIN CONTAINER
        <Container className="d-flex justify-content-center align-items-center" style={{height:'100%', width:'100%'}}>
            <Row>
                <Card
                    style={{
                        backgroundColor: '#9f512121',
                        border: '0.1em solid #614a1971',
                        borderRadius: '2em'
                    }}>

                    {/* LOGIN TITLE */}
                    <Card.Title className="text-center mb-2 display-5"><strong>Iniciar sesión</strong></Card.Title>
                    <Card.Body className="loginDataUser">
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col xs={10} md={6}>
                                <Form as={Row}>

                                    {/* EMAIL LOGIN */}
                                    <Form.Group className="mt-3">
                                    <Form.Label htmlFor="email"className="labelLogin">Email:</Form.Label>
                                        {/* <div className="">Email:</div> */}
                                        <Col>
                                            <InputText
                                                type={"email"}
                                                design={userError.emailError ? 'errorInput' : 'normalInput'}
                                                name={"email"}
                                                placeholder={"user@user.com"}
                                                state={setUser}
                                                errorState={setUserError}
                                                autoCompleteValue={"email"}
                                            />
                                            <div className="errorText">{userError.emailError}</div>
                                        </Col>
                                    </Form.Group>

                                    {/* PASSWORD LOGIN */}
                                    <Form.Group className="mb-3">
                                    <Form.Label htmlFor="password"className="labelLogin">Contraseña:</Form.Label>
                                        <Col>
                                            <InputText
                                                type={"password"}
                                                design={userError.passwordError ? 'errorInput' : 'normalInput'}
                                                name={"password"}
                                                placeholder={"Hola1234"}
                                                state={setUser}
                                                errorState={setUserError}
                                                autoCompleteValue={"current-password"}
                                            />
                                            <div className="errorText">{userError.passwordError}</div>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                    {userError?.credentials ? (
                        <div>{userError.credentials}</div>
                    ) : (
                        <></>
                    )}
                    <div className="d-flex justify-content-center">
                        <AkdemyButton
                            onClick={(e) => submitHandler(e, user)}
                            type="submit"
                            text={"Entrar!"}
                        />
                    </div>
                </Card>
            </Row>
        </Container>
    );
};