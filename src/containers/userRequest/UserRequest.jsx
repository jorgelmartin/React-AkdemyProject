import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";

export const UserRequest = () => {
    const usersReq = useFetchUserRequest();
    const acceptUserRequest = useFetchAcceptRequest();
    const [requestAccepted, setRequestAccepted] = useState(false);

    if (!usersReq) {
        return <div>Loading...</div>;
    }

    const handleAcceptRequest = (id) => {
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
            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Curso</th>
                        <th>Inicio</th>
                        {/* <th>Estado</th> */}
                    </tr>
                </thead>
                <tbody>
                {usersReq.map((request, index) => (
                        <tr key={index}>
                            <td>{request.user.name} {request.user.surname}</td>
                            <td>{request.user.email}</td>
                            <td>{request.program.name}</td>
                            <td>{request.convocation.beginning}</td>
                            {/* <td>{request.status}</td> */}
                            {/* Estado */}
                            <Button onClick={() => {
                                handleAcceptRequest(request.id);
                            }}>Aceptar</Button>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};