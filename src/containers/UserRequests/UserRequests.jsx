import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";
import "../../App.css";
import { AdminButton } from "../../components/AdminButton/AdminButton";

export const UserRequests = () => {
    const usersReq = useFetchUserRequest();
    const acceptUserRequest = useFetchAcceptRequest();
    const [requestAccepted, setRequestAccepted] = useState(false);
    const [acceptedRequests, setAcceptedRequests] = useState([]);

    //UPDATE THE COMPONENTE EACH CLIC
    useEffect(() => {
    }, [requestAccepted]);

    // ACCEPT REQUEST HANDLER
    const handleAcceptRequest = (id) => {
        acceptUserRequest(id)
            .then(() => {
                console.log("Solicitud aceptada correctamente");
                setRequestAccepted(true);

                // FEAT THE ACCEPT REQUEST TO STATE acceptedRequests
                setAcceptedRequests(prevRequests => [...prevRequests, id]);
            })
            .catch((error) => {
                console.error("Error al aceptar la solicitud:", error);
            });
    };

    if (!usersReq) {
        return <div>Loading...</div>;
    }


    return (
        <Container className="mt-5">

            {/* TITLE */}
            <div className="requestUser">Solicitudes pendientes</div>
            <div className="tableContainerCheck mt-4 tableScroll">

                {/* DATA REQUEST */}
                    <div className="tableDataRow">
                        <div className="tableHeaderRequest"><strong>Nombre</strong></div>
                        <div className="tableHeaderRequest"><strong>Email</strong></div>
                        <div className="tableHeaderRequest"><strong>Curso</strong></div>
                        <div className="tableHeaderRequest"><strong>Inicio</strong></div>
                        <div className="tableHeaderRequest"><strong>Aceptar</strong></div>
                    </div>

                    {/* MAPPING USER REQUEST */}
                    {usersReq.slice(0, 7).map((request, i) => {
                        if (!acceptedRequests.includes(request.id)) {
                            return (
                                <div className="tableDataRow" key={i}>
                                    <div className="tableDataCheck">{request.user.name} {request.user.surname}</div>
                                    <div className="tableDataCheck">{request.user.email}</div>
                                    <div className="tableDataCheck">{request.program.name}</div>
                                    <div className="tableDataCheck">{request.convocation.beginning}</div>

                                    {/* ADMIN BUTTON TO ACCEPT REQUEST */}
                                    <div className="tableDataCheck">
                                        <AdminButton
                                            onClick={() => {
                                                handleAcceptRequest(request.id);
                                            }}
                                            text={"✔"}
                                        />
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
        </Container>
    );
};
