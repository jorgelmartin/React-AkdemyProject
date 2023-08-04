import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";
import "../../App.css";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";

export const UserRequest = () => {
    const usersReq = useFetchUserRequest();
    const acceptUserRequest = useFetchAcceptRequest();
    const [requestAccepted, setRequestAccepted] = useState(false);

    if (!usersReq) {
        return <div>Loading...</div>;
    }

    // ACCEPT REQUEST HANDLER
    const handleAcceptRequest = (id) => {
        // e.preventDefault();
        acceptUserRequest(id)
            .then(() => {
                console.log("Solicitud aceptada correctamente");
                setRequestAccepted(true);
            })
            .catch((error) => {
                console.error("Error al aceptar la solicitud:", error);
            });
    };

    return (

        //RENDER USER REQUEST
        <Container className="mt-5">

            {/* PENDING REQUEST TITLE */}
            <div className="requestUser">Solicitudes pendientes</div>
            <div className="tableContainerCheck mt-4">

                {/* TABLE PENDING REQUEST */}
                <div className="tableHeader">
                    <div className="tableHeaderCheck">Nombre</div>
                    <div className="tableHeaderCheck">Email</div>
                    <div className="tableHeaderCheck">Curso</div>
                    <div className="tableHeaderCheck">Inicio</div>
                </div>
                <div className="tableBodyCheck">

                    {/* MAPPING PENDING USER REQUEST */}
                    {usersReq.slice(0, 7).map((request, index) => (
                        <div className="tableDataRow" key={index}>
                            <div className="tableDataCheck">{request.user.name} {request.user.surname}</div>
                            <div className="tableDataCheck">{request.user.email}</div>
                            <div className="tableDataCheck">{request.program.name}</div>
                            <div className="tableDataCheck">{request.convocation.beginning}
                        </div>

                            {/* AKDEMY BUTTON WITH THE HANDLER */}
                            <AkdemyButton onClick={() => {
                                handleAcceptRequest(request.id);
                            }}
                                text={"✔"} />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};