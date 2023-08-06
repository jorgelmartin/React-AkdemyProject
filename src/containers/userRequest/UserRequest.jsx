import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";
import "../../App.css";
import { AdminButton } from "../../components/AdminButton/AdminButton";

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

            <div className="requestUser">Solicitudes pendientes</div>

            <div className="tableContainerCheck mt-4 tableScroll">
                <div className="">
                    <div className="tableDataRow">
                        <div className="tableHeaderRequest"><strong>Nombre</strong></div>
                        <div className="tableHeaderRequest"><strong>Email</strong></div>
                        <div className="tableHeaderRequest"><strong>Curso</strong></div>
                        <div className="tableHeaderRequest"><strong>Inicio</strong></div>
                        <div className="tableHeaderRequest"><strong>Aceptar</strong></div>
                    </div>
                    {usersReq.slice(0, 7).map((request, i) => (
                        <div className="tableDataRow" key={i}>
                            <div className="tableDataCheck">{request.user.name} {request.user.surname}</div>
                            <div className="tableDataCheck">{request.user.email}</div>
                            <div className="tableDataCheck">{request.program.name}</div>
                            <div className="tableDataCheck">{request.convocation.beginning}</div>
                            <div className="tableDataCheck">
                                <AdminButton
                                    onClick={() => {
                                        handleAcceptRequest(request.id);
                                    }}
                                    text={"✔"}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};