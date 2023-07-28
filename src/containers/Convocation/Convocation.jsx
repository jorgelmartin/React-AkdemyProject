import React, { useState, useEffect } from "react";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { Table, Container } from "react-bootstrap";
import "./Convocation.css";
import { useNavigate } from "react-router-dom";
import { inputHandler } from "../../services/UseFul";
import { joinConvocation } from "../../services/apiCalls";
import { useSelector } from 'react-redux';
import { userData } from "../../containers/userSlice";

export const Convocation = () => {
    const [searchText, setSearchText] = useState("");
    const convocations = useFetchConvocations();
    const [filteredConvocations, setFilteredConvocations] = useState([]);
    const navigate = useNavigate();
    const userRole = useSelector(userData);

    useEffect(() => {
        setFilteredConvocations(convocations);
    }, [convocations]);

    useEffect(() => {
        const searchAppointment = (text) => {
            let filtered = convocations;
console.log("convocations ", convocations);
            if (text && convocations) {
                filtered = convocations.filter(
                    (convocation) =>
                        convocation.program.name.includes(text) ||
                        convocation.beginning.includes(text) ||
                        convocation.schedule.includes(text)
                );
            }
            setFilteredConvocations(filtered);
        };

        const timeOutId = setTimeout(() => searchAppointment(searchText.text), 500);
        return () => clearTimeout(timeOutId);
    }, [searchText, convocations]);

    // Function to handle the join request
    const handleJoinConvocation = async (id) => {
        try {
            // Make the join request using the service function
            // Replace 'YOUR_ACCESS_TOKEN' with the actual access token of the user
            await joinConvocation("YOUR_ACCESS_TOKEN", id);


            // You can add a success message or trigger any other actions after a successful join request.
            console.log("Solicitud de unirse a la convocatoria enviada correctamente.");

            // If needed, you can also update the local state to reflect the user's request
            // For example, you can set a property like 'isJoinRequested' to true for the corresponding convocation in 'filteredConvocations'.
        } catch (error) {
            // Handle errors if the request fails
            console.error("Error al enviar la solicitud de unirse a la convocatoria", error);
        }
    };

    if (!filteredConvocations) {
        return <div>Cargando...</div>;
    }

    return (
        <Container className="mt-5">
            <input
                className="InputSearch"
                type={"text"}
                name={"text"}
                placeholder={"Buscar convocatoria..."}
                onChange={(e) => inputHandler(e, setSearchText)}
            />
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Programa</th>
                        <th>Inicio</th>
                        <th>Horarios</th>
                        <th>Acciones</th> {/* Agregamos una columna para las acciones */}
                    </tr>
                </thead>
                <tbody>
                    {filteredConvocations.map((convocation) => (
                        <tr key={convocation.id}>
                            <td>{convocation.id}</td>
                            <td>{convocation.program.name}</td>
                            <td>{convocation.beginning}</td>
                            <td>{convocation.schedule}</td>
                            <td>
                                {/* Mostramos los botones según el rol correspondiente */}
                                {userRole.data.role === 1 ? (
                                    <div className="d-flex justify-content-center buttonsConvocations">
                                        <button
                                            className="buttonUpdate"
                                            onClick={() => navigate(`/convodetail/${convocation.id}`)}
                                        >
                                            Detalle
                                        </button>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-center buttonsConvocations">
                                        <button
                                            className="buttonJoin"
                                            onClick={() => handleJoinConvocation(convocation.id)}
                                        >
                                            Unirse
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
