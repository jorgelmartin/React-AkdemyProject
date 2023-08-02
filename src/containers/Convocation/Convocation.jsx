import React, { useState, useEffect } from "react";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { Table, Container } from "react-bootstrap";
import "./Convocation.css";
import { useNavigate } from "react-router-dom";
import { inputHandler } from "../../services/UseFul";
import { joinConvocation } from "../../services/apiCalls";
import { useSelector } from 'react-redux';
import { userData } from "../../containers/userSlice";
import { InputSearch } from "../../components/InputSearch/InputSearch";

export const Convocation = () => {
    const [searchText, setSearchText] = useState("");
    const convocations = useFetchConvocations();
    const [filteredConvocations, setFilteredConvocations] = useState([]);
    const navigate = useNavigate();
    const userRole = useSelector(userData);

    useEffect(() => {
        setFilteredConvocations(convocations);
    }, [convocations]);

    const handleSearch = (text) => {
        if (text) {
            const filtered = convocations.filter(
                (convocation) =>
                    convocation.program.name.includes(text) ||
                    convocation.beginning.includes(text) ||
                    convocation.schedule.includes(text) ||
                    convocation.id.toString().includes(text)
            );
            setFilteredConvocations(filtered);
        } else {
            setFilteredConvocations(convocations);
        }
    };

    if (!filteredConvocations) {
        return <div>Cargando...</div>;
    }

    return (
        <Container className="mt-5">
            <div className="containerInput">
                <InputSearch onSearch={handleSearch} />
            </div>
            <div className="tableContainer">
                <table className="customTable">
                    <thead>
                        <tr>
                            <th className="customTitle">ID</th>
                            <th className="customTitle">Programa</th>
                            <th className="customTitle">Inicio</th>
                            <th className="customTitle">Horarios</th>
                            {/* <th className="customTitle">Editar</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredConvocations.slice(0, 15).map((convocation) => (
                            <tr key={convocation.id}>
                                <td className="customData">{convocation.id}</td>
                                <td className="customData">{convocation.program.name}</td>
                                <td className="customData">{convocation.beginning}</td>
                                <td className="customData">{convocation.schedule}

                                    {/* Mostramos los botones según el rol correspondiente */}
                                    {userRole.data.role === 1 ? (
                                        <div className="d-flex justify-content-end buttonsConvocations">
                                            <button
                                                className="buttonUpdate"
                                                onClick={() => navigate(`/convodetail/${convocation.id}`)}
                                            >
                                                VER
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {/* <div className="d-flex justify-content-center buttonsConvocations">
                                        <button
                                            className="buttonJoin"
                                            onClick={() => handleJoinConvocation(convocation.id)}
                                        >
                                            Unirse
                                        </button>
                                    </div> */}
                                        </>
                                    )}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};
