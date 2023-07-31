import React, { useState, useEffect } from "react";
import { deleteProfile, getProfile, updateProfile } from "../../services/apiCalls";
import "./Profile.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { inputHandler } from "../../services/UseFul";
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
    const [hovering, setHovering] = useState(false);

    //GETTING TOKEN FROM REDUX
    const datos = useSelector(userData);
    console.log(datos);
    const token = datos.credentials.token;

    //UPDATE PROFILE
    const editHandler = (body, token) => {
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
    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
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
        <div className="mt-2 d-flex justify-content-center">
            <div>
                <div style={{ minWidth: '20em' }}>
                    <div
                    
                    >
                        <div className="text-center mb-3 display-3" style={{
                            backgroundColor: hovering ? '#FF0000' : '#3c709a61',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            // Agregar otros estilos de la tarjeta aquí según sea necesario
                        }}>
                            <strong>Perfil</strong>
                        </div><div className="dataUser">
                        <div className="profile-info">
                            <div className="profile-info-row">
                                <strong className="profile-label">Nombre:</strong>
                                <div className="profile-data">
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            defaultValue={user.name}
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    ) : (
                                        <div>{user.name}</div>
                                    )}
                                </div>
                            </div>
                            <div className="profile-info-row">
                                <strong className="profile-label">Apellido:</strong>
                                <div className="profile-data">
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="surname"
                                            className="form-control"
                                            defaultValue={user.surname}
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    ) : (
                                        <div>{user.surname}</div>
                                    )}
                                </div>
                            </div>
                            <div className="profile-info-row">
                                <strong className="profile-label">Email:</strong>
                                <div className="profile-data">
                                    {editing ? (
                                        <input
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            defaultValue={user.email}
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    ) : (
                                        <div>{user.email}</div>
                                    )}
                                </div>
                            </div>
                            {editing && (
                                <div className="profile-info-row">
                                    <strong className="profile-label">Contraseña:</strong>
                                    <div className="profile-data">
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            onChange={(e) => inputHandler(e, setBody)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div></div>
                        <div className="text-center">
                            {editing ? (
                                <div className="text-center">
                                    <Button onClick={() => editHandler(body, token)}>Guardar</Button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="text-center">
                                        <Button
                                            onClick={() => setEditing(true)}
                                            style={{ backgroundColor: '#13326fba' }}
                                            className="d-inline-block me-2"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            onClick={handleDeleteProfile}
                                            style={{
                                                backgroundColor: hovering ? '#FF0000' : '#13326fba',
                                                borderColor: hovering ? '#FF0000' : '#13326fba',
                                            }}
                                            className="d-inline-block"
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {hovering ? 'CUIDADO!' : 'Borrar perfil'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};