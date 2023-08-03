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

    useEffect(() => {
        // Aquí, si la solicitud se ha aceptado exitosamente (requestAccepted es true),
        // volvemos a cargar las solicitudes para obtener los datos actualizados.
        if (requestAccepted) {
            setRequestAccepted(false); // Reiniciamos el estado a false para futuras actualizaciones
            usersReq.refetch(); // Esta función debe existir en el hook useFetchUserRequest para recargar las solicitudes.
        }
    }, [requestAccepted, usersReq]);

    if (!usersReq) {
        return <div>Loading...</div>;
    }

    const handleAcceptRequest = (id) => {
        // e.preventDefault();
        console.log("Valor de id:", id); 
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
        <Container className="mt-5">
            <div className="requestUser">Solicitudes pendientes</div>
            <div className="tableContainerCheck mt-4">
                <div className="tableHeader">
                    <div className="tableHeaderCheck">Nombre</div>
                    <div className="tableHeaderCheck">Email</div>
                    <div className="tableHeaderCheck">Curso</div>
                    <div className="tableHeaderCheck">Inicio</div>
                    {/* <div className="tableHeaderCheck">Aceptar</div> */}
                    {/* <div className="tableHeaderCheck">Aceptar</div> */}
                </div>
                <div className="tableBodyCheck">
                {usersReq.slice(0, 7).map((request, index) => (
                        <div className="tableDataRow" key={index}>
                            <div className="tableDataCheck">{request.user.name} {request.user.surname}</div>
                            <div className="tableDataCheck">{request.user.email}</div>
                            <div className="tableDataCheck">{request.program.name}</div>
                            <div className="tableDataCheck">{request.convocation.beginning}
                            </div>
                            {/* <div className="tableDataCheck">{request.status}</div> */}
                            {/* Estado */}
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