import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";

export const MyPrograms = () => {


    if (!usersReq) {
        return <div>Loading...</div>;
    }

    // return (
    //     <Container className="mt-4">
    //         <Table striped bordered hover responsive>
    //             <thead>
    //                 <tr>
    //                     <th>Nombre</th>
    //                     <th>Apellidos</th>
    //                     <th>Curso</th>
    //                     <th>Inicio</th>
    //                     <th>Estado</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //             {usersReq.map((request, index) => (
    //                     console.log("request.id:", request.id),
    //                     <tr key={index}>
    //                         <td>{request.user.name}</td>
    //                         <td>{request.user.surname}</td>
    //                         <td>{request.program.name}</td>
    //                         <td>{request.convocation.beginning}</td>
    //                         <td>{request.status}</td>
    //                         {/* Estado */}
    //                         <Button onClick={() => {
    //                             handleAcceptRequest(request.id);
    //                         }}>Aceptar</Button>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </Table>
    //     </Container>
    // );
};