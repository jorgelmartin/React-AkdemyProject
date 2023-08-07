import React from "react";
import { Container, Table } from "react-bootstrap";
import { useFetchRequestAccepted } from "../../../hooks/useFetchRequestAccepted";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const MyPrograms = () => {

    //GET USERDATA FROM REDUX
    const datosCredencialesRedux = useSelector(userData);

    //GET THE ID FROM USER
    const userId = datosCredencialesRedux?.data?.userId;

    //GET THE REQUEST ACCEPTED
    const usersReq = useFetchRequestAccepted(userId);
    console.log("hello ", usersReq);
    if (!usersReq) {
        return <div>Loading...</div>;
    }

    return (

        //RENDER MY PROGRAMS CONTAINER
        <Container className="mt-4">
            <div className="requestUser">Mis cursos</div>
            <Table striped bordered hover responsive>


                {/* TABLE OF USER PROGRAMS */}
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Curso</th>
                        <th>Inicio</th>
                    </tr>
                </thead>
                <tbody>

                    {/* DATA FROM USER PRORGAMS */}
                    {usersReq.map((request, i) => (
                        <tr key={i}>
                            <td>{request.user.name} {request.user.surname}</td>
                            <td>{request.program.name}</td>
                            <td>{request.convocation.beginning}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};