import React, { useState, useEffect } from "react";
import { deleteProfile, getProfile, updateProfile } from "../../services/apiCalls";
import "./Profile.css";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { inputHandler } from "../../services/useful";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../containers/userSlice";

export const Profile = () => {
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [body, setBody] = useState({});
    const [id, setId] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    const handleDeleteProfile = () => {
        const userToken = token; 
        dispatch(logout({ credentials: "" })); 
        deleteProfile(userToken) 
            .then(() => {
                navigate("/home");
            })
            .catch((error) => {
                console.error("Error al borrar el perfil:", error);
            });
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

    return (
        <Container className="mt-2">
                <Card style={{ backgroundColor: '#3c709a61' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-3 display-5">Perfil</Card.Title>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><strong>Nombre:</strong></td>
                                    <td>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                defaultValue={user.name}
                                                onChange={(e) => inputHandler(e, setBody)}
                                            />
                                        ) : (
                                            <span>{user.name}</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Apellido:</strong></td>
                                    <td>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="surname"
                                                className="form-control"
                                                defaultValue={user.surname}
                                                onChange={(e) => inputHandler(e, setBody)}
                                            />
                                        ) : (
                                            <span>{user.surname}</span>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Email:</strong></td>
                                    <td>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                defaultValue={user.email}
                                                onChange={(e) => inputHandler(e, setBody)}
                                            />
                                        ) : (
                                            <span>{user.email}</span>
                                        )}
                                    </td>
                                </tr>
                                {editing && (
                                    <tr>
                                        <td><strong>Contraseña:</strong></td>
                                        <td>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                onChange={(e) => inputHandler(e, setBody)}
                                            />
                                        </td>
                                    </tr>
                                )}
                                <tr>
                                    <td><strong>Teléfono:</strong></td>
                                    <td>
                                        {editing ? (
                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control"
                                                defaultValue={user.phone}
                                                onChange={(e) => inputHandler(e, setBody)}
                                            />
                                        ) : (
                                            <span>{user.phone}</span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {editing ? (
                            <div className="text-center">
                                <Button onClick={() => editHandler(body, token)}>Guardar</Button>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Button
                                    onClick={() => setEditing(true)}
                                    style={{ backgroundColor: '#13326fba' }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    onClick={handleDeleteProfile}
                                    style={{ backgroundColor: '#13326fba', marginTop: '1rem' }}
                                >
                                    Borrar perfil
                                </Button>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
    )
}