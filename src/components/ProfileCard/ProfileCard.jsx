import React, { useState, useEffect } from "react";
import { deleteProfile, getProfile, updateProfile } from "../../services/apiCalls";
import "./ProfileCard.css";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { userData } from "../../containers/userSlice";
import { inputHandler } from "../../services/UseFul";
import { Navigate, useNavigate } from "react-router-dom";

export const ProfileCard = () => {

    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [body, setBody] = useState({});
    const [id, setId] = useState({});
    const [profileId, setProfileId] = useState({});
    const navigate = useNavigate();

    //GETTING TOKEN FROM REDUX
    const datos = useSelector(userData);
    console.log(datos);
    const token = datos.credentials.token;

    console.log("Soy token", token);

    //UPDATE PROFILE
    const editHandler = (body, token) => {
        console.log('Body obtenido:', body);
        if (id) {
            // console.log('Id obtenido:', id);
            body.id = id;
            updateProfile(body, token)
                .then(() => {
                    setEditing(false);
                })
                .catch((error) => {
                    console.error('Error al actualizar el perfil:', error);
                });
        }
    };

    //DELETE PROFILE
    const handleDeleteProfile = async () => {
        try {
            await deleteProfile(token);
            console.log("tokatoka", token); // llega bien el token
            // Realizar acciones adicionales después de eliminar el perfil
            navigate("/home"); 
        } catch (error) {
            console.error("Error al borrar el perfil:", error);
        }
    };

    //GET USER PROFILE
    useEffect(() => {
        if (!editing) {
            getProfile(token)
                .then((data) => {
                    // console.log('Perfil obtenido:', data);
                    setUser(data.data);
                    setId(data.data.id);
                })
                .catch((error) => {
                    console.error('Error al obtener el perfil:', error);
                });
        }
    }, [editing, token]);

    //Para ignorar el autocomplete
    {/* eslint-disable-next-line jsx-a11y/autocomplete-ignore */ }
    return (
        <Container className="mt-2">
            <Card style={{ backgroundColor: '#3c709a61' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-3 display-5">Perfil</Card.Title>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Nombre:</Form.Label>
                                </Col>
                                {editing ? (
                                    <Col>
                                        <input
                                            type={"text"}
                                            name={"name"}
                                            placeholder={user.name}
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    </Col>
                                ) : (
                                    <Col>
                                        <div>{user.name}</div>
                                    </Col>
                                )}
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Apellido:</Form.Label>
                                </Col>
                                {editing ? (
                                    <Col>
                                        <input
                                            type={"text"}
                                            name={"surname"}
                                            placeholder={user.surname}
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    </Col>
                                ) : (
                                    <Col>
                                        <div>{user.surname}</div>
                                    </Col>
                                )}
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Email:</Form.Label>
                                </Col>
                                {editing ? (
                                    <Col>
                                        <input
                                            type={"text"}
                                            name={"email"}
                                            placeholder={user.email}
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    </Col>
                                ) : (
                                    <Col>
                                        <div>{user.email}</div>
                                    </Col>
                                )}
                            </Row>
                        </Form.Group>
                        {editing && (
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label>Contraseña:</Form.Label>
                                    </Col>
                                    <Col>
                                        <input
                                            type={"password"}
                                            name={"password"}
                                            placeholder={user.password}
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                        )}
                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label>Teléfono:</Form.Label>
                                </Col>
                                {editing ? (
                                    <Col>
                                        <input
                                            type={"text"}
                                            name={"phone"}
                                            placeholder={user.phone}
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    </Col>
                                ) : (
                                    <Col>
                                        <div>{user.phone}</div>
                                    </Col>
                                )}
                            </Row>
                        </Form.Group>
                        {editing ? (
                            <Button
                                onClick={() => {
                                    editHandler(body, token);
                                }}
                            >
                                Guardar
                            </Button>
                        ) : (
                            <Button style={{ backgroundColor: '#13326fba' }}
                                onClick={() => {
                                    setEditing(true);
                                }}
                            >
                                Editar
                            </Button>
                        )}
                        <Button
                            style={{ backgroundColor: "#13326fba" }}
                            onClick={handleDeleteProfile}
                        >
                            Borrar perfil
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};