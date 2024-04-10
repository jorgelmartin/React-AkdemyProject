import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useFetchUserRequest } from "../../../hooks/useFetchUserRequest";
import { useFetchAcceptRequest } from "../../../hooks/useFetchAcceptRequest";
import "../../App.css";
import { AdminButton } from "../../components/AdminButton/AdminButton";
import { PageButton } from "../../components/PageButton/PageButton";


export const UserRequests = () => {
    const usersReq = useFetchUserRequest();
    const acceptUserRequest = useFetchAcceptRequest();
    const [requestAccepted, setRequestAccepted] = useState(false);
    const [acceptedRequests, setAcceptedRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // UPDATE THE COMPONENT EACH CLICK
    // useEffect(() => {
    // }, [currentPage]);

    // ACCEPT REQUEST HANDLER
    const handleAcceptRequest = (id) => {
        acceptUserRequest(id)
            .then(() => {
                setRequestAccepted(true);

                // FEAT THE ACCEPT REQUEST TO STATE acceptedRequests
                setAcceptedRequests(prevRequests => [...prevRequests, id]);
            })
            .catch((error) => {
                console.error("Error al aceptar la solicitud:", error);
            });
    };

    // CALCULATE START AND END INDEX FOR CURRENT PAGE
    const startIndex = (currentPage - 1) * 7;
    const endIndex = currentPage * 7;

    if (!usersReq) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-5">
            {/* TITLE */}
            <div className="requestUser">Solicitudes pendientes</div>
            <div className="tableContainerCheck mt-4">

                {/* DATA REQUEST */}
                <div className="tableDataRow">
                    <div className="tableHeaderRequest"><strong>Nombre</strong></div>
                    <div className="tableHeaderRequest"><strong>Email</strong></div>
                    <div className="tableHeaderRequest"><strong>Curso</strong></div>
                    <div className="tableHeaderRequest"><strong>Inicio</strong></div>
                    <div className="tableHeaderRequest"><strong>Aceptar</strong></div>
                </div>

                {/* MAPPING USER REQUEST */}
                {usersReq.slice(startIndex, endIndex).map((request) => {
                    if (!acceptedRequests.includes(request.id)) {
                        return (
                            <div className="tableDataRow" key={request.id}>
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
                    return '';
                })}
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-center align-items-center mt-4">
                <PageButton
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    text={'🡰'}
                    design="left"
                />
                <div className="numberPage">{currentPage}</div>
                <PageButton
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= usersReq.length}
                    text={'🡲'}
                    design="right"
                />
            </div>
        </Container>
    );
};