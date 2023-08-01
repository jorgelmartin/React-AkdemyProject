import React, { useState, useEffect } from "react";
import { deleteProfile, getProfile, updateProfile } from "../../services/apiCalls";
import "./Profile.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { inputHandler } from "../../services/UseFul";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../containers/userSlice";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";

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

    //SHOW ALERT BEFORE DELETE PROFILE
    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };

    //DELETE PROFILE
    const handleDeleteProfile = () => {
        e.preventDefault();
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
                    setUser(data.data);
                    setId(data.data.id);
                })
                .catch((error) => {
                    console.error('Error al obtener el perfil:', error);
                });
        }
    }, [editing, token]);

    return (
        <div style={{ minWidth: '20em' }}>
            {/* MAKING ALERT WITH RED COLOR BEFORE DELETE PROFILE */}
            <div className="text-center mb-3  display-3 mt-5" style={{
                backgroundColor: hovering ? '#FF0000' : '#699f216c',
                padding: '1rem',
                border: '1px solid green',
                borderRadius: '0.5rem',
                text: "Editar"
            }}>
                <strong>Perfil</strong>
            </div>{hovering ? "Espera, ¿Seguro deseas borrar tu perfil?" : null}
            <div className="dataUser">

                <div className="profile-info">
                    <div className="profile-info-row">
                        <strong className="profile-label">Nombre:</strong>
                        <div className="profile-data">
                            {editing ? (
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        defaultValue={user.name}
                                        onChange={(e) => inputHandler(e, setBody)}
                                    />
                                </div>
                            ) : (
                                <div>{user.name}</div>
                            )}
                        </div>
                    </div>
                    <div className="profile-info-row">
                        <strong className="profile-label">Apellidos:</strong>
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
                    <div className="">
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
                </div>
            </div>
            <div className="text-center">
                {editing ? (
                    <div className="">
                        <AkdemyButton
                            onClick={() => editHandler(body, token)} text={"Guardar"} />
                    </div>
                ) : (
                    <div className="">
                        <div className="">
                            <AkdemyButton
                                onClick={() => setEditing(true)}
                                text={"Editar"}
                            />


                            {/* CHECK IF THE USER IS ADMIN  TO HIDE DELETE BUTTON */}
                            {datos.data.role === 2 ? (
                                <Button
                                    onClick={handleDeleteProfile}
                                    style={{
                                        backgroundColor: hovering ? '#FF0000' : '#90a729fd',
                                        borderColor: hovering ? '#FF0000' : '#13326fba',
                                    }}
                                    className="deleteButton"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {hovering ? 'CUIDADO!' : 'Borrar perfil'}
                                </Button>
                            ) : null}
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
};