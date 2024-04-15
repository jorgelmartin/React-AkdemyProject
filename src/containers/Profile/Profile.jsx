import { useState, useEffect } from "react";
import "./Profile.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { inputCheck, inputHandler } from "../../services/useful";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../containers/userSlice";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
import { deleteProfile, getProfile, updateProfile } from "../../services/ApiCalls";
import { ModalAkdemy } from "../../components/ModalAkdemy/ModalAkdemy";

export const Profile = () => {
    const [user, setUser] = useState({});
    const [editing, setEditing] = useState(false);
    const [body, setBody] = useState({});
    const [id, setId] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hovering, setHovering] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userError, setUserError] = useState({});

    //GETTING TOKEN FROM REDUX
    const datos = useSelector(userData);
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
    const handleDeleteProfile = (e) => {
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
        // RENDER PROFILE CONTAINER
        <div style={{width:'20em'}}>
            {/* MAKING ALERT WITH RED COLOR BEFORE DELETE PROFILE */}
            <div className="mb-2 display-3 mt-5"
                style={{
                    backgroundColor: hovering ? '#FF0000' : '#699f216c',
                    padding: '0.2em',
                    border: '0.01em solid green',
                    borderRadius: '0.2em',
                }}>

                {/* PROFILE TITLE */}
                <strong>Perfil</strong>
            </div>
            {hovering ? "Espera, ¿Seguro deseas borrar tu perfil?" : ''}
            <div className="dataUser">

                {/* PROFILE NAME */}
                <div className="profileLabel">Nombre:</div>
                <div className="profileData">
                    {editing ? (
                        <div>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                defaultValue={user.name}
                                onChange={(e) => inputHandler(e, setBody)}
                                onBlur={(e) => inputCheck(e, setUserError)}
                                autoComplete="name"
                            />
                            <div className="errorText">{userError.nameError}</div>
                        </div>
                    ) : (
                        <div>{user.name}</div>
                    )}
                </div>

                {/* PROFILE SURNAME */}
                <div className="profileLabel">Apellidos:</div>
                <div className="profileData">
                    {editing ? (
                        <div>
                        <input
                            type="text"
                            name="surname"
                            className="form-control"
                            defaultValue={user.surname}
                            onChange={(e) => inputHandler(e, setBody)}
                            onBlur={(e) => inputCheck(e, setUserError)}
                            autoComplete="family-name"
                        />
                        <div className="errorText">{userError.surnameError}</div>
                        </div>
                    ) : (
                        <div>{user.surname}</div>
                    )}
                </div>

                {/* PROFILE EMAIL */}
                <div className="profileLabel">Email:</div>
                <div className="profileData">
                    {editing && datos.data.role === 2 ? (
                        <div>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            defaultValue={user.email}
                            onChange={(e) => inputHandler(e, setBody)}
                            onBlur={(e) => inputCheck(e, setUserError)}
                            autoComplete="email"
                        />
                        <div className="errorText">{userError.emailError}</div>
                        </div>
                    ) : (
                        <div>{user.email}</div>
                    )}

                </div>
                {/* PROFILE PASSWORD, ONLY IF IS EDITING */}
                {editing && datos.data.role === 2 && (
                    <>
                        <div className="profileLabel">Contraseña:</div>
                        <div className="profileData">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                onChange={(e) => inputHandler(e, setBody)}
                                onBlur={(e) => inputCheck(e, setUserError)}
                                autoComplete="current-password"
                            />
                            <div className="errorText">{userError.passwordError}</div>
                        </div>
                    </>
                )}

            </div>
            <div className="containerButtons">
                {/* IF IS EDITING SHOW THIS BUTTON */}
                {editing ? (
                    <div className="buttonGroup">
                        <AkdemyButton
                            onClick={() => editHandler(body, token)}
                            text={"Guardar"}
                        />
                    </div>
                ) : (
                    <div className="buttonGroup">
                        <AkdemyButton
                            onClick={() => setEditing(true)}
                            text={"Editar"}
                        />

                        {/* CHECK IF THE USER IS ADMIN TO HIDE DELETE BUTTON */}
                        {datos.data.role === 2 ? (
                            <Button
                                onClick={() => setShowModal(true)}
                                className={`deleteButton ${hovering ? 'hovered' : ''}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                {hovering ? 'CUIDADO!' : 'Borrar perfil'}
                            </Button>
                        ) : ''}
                    </div>
                )}
            </div>

            {/* MODAL */}
            <ModalAkdemy
                show={showModal}
                onClose={() => setShowModal(false)}
                onDeleteConfirm={handleDeleteProfile}
                title={'¿Seguro que deseas borrar tu perfil?'}
                text={'En caso de que en algún momento desees recuperar tu cuenta, escribe a akdemyproject@email.com.'}
                showConfirmButton={true}
            />
        </div>
    );
};