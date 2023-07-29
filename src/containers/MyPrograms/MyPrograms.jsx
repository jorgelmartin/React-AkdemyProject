import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useFetchRequestAccepted } from "../../../hooks/useFetchRequestAccepted";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const MyPrograms = () => {

    const datosCredencialesRedux = useSelector(userData);
    const userId = datosCredencialesRedux.data.userId;
    const usersReq = useFetchRequestAccepted(userId);

console.log("que traigo",datosCredencialesRedux);
    if (!usersReq) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Curso</th>
                        <th>Inicio</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                {usersReq.map((request, index) => (
                        console.log("request.id:", request.id),
                        <tr key={index}>
                            <td>{request.user.name} {request.user.surname}</td>
                            <td>{request.program.name}</td>
                            <td>{request.convocation.beginning}</td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};