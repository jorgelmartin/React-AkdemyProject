import React from "react";
import { Container } from "react-bootstrap";
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
    if (!usersReq) {
        return <div>Loading...</div>;
    }

    return (

        //RENDER MY PROGRAMS CONTAINER
        <Container className="mt-4">
        <div className="requestUser">Mis cursos</div>

        {/* TABLE OF USER PROGRAMS */}
        <div className="tableContainerCheck mt-4">
                <div className="tableDataRow">
                    <div className="tableHeaderRequest"><strong>Nombre</strong></div>
                    <div className="tableHeaderRequest"><strong>Curso</strong></div>
                    <div className="tableHeaderRequest"><strong>Inicio</strong></div>
                </div>

                {/* MAPPING USER PROGRAMS */}
                {usersReq.map((request, i) => (
                    <div className="tableDataRow" key={i}>
                        <div className="tableDataCheck">{request.user.name} {request.user.surname}</div>
                        <div className="tableDataCheck">{request.program.name}</div>
                        <div className="tableDataCheck">{request.convocation.beginning}</div>
                    </div>
                ))}
            </div>
    
    </Container>
    );
};