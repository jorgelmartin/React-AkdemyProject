import React from "react";
import { useFetchUsers } from "../../../hooks/useFetchUsers";
import { Container, Form, Card, Table } from "react-bootstrap";
import "./Users.css";

export const Users = () => {

    const users = useFetchUsers();
    if (!users) {
        return <div>Loading...</div>;
    }

    return (
        
            <Container className="mt-5">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        
    );
}