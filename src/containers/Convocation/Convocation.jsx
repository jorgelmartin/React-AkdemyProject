import React, { useState, useEffect } from "react";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { Container } from "react-bootstrap";
import "./Convocation.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { userData } from "../../containers/userSlice";
import { InputSearch } from "../../components/InputSearch/InputSearch";

export const Convocation = () => {
    const [searchText, setSearchText] = useState("");
    const convocations = useFetchConvocations();
    const [filteredConvocations, setFilteredConvocations] = useState([]);
    const navigate = useNavigate();
    const userRole = useSelector(userData);

    //UPDATE SETFILTEREDCONVOCATIONS WITH CONVOCATIONS
    useEffect(() => {
        setFilteredConvocations(convocations);
    }, [convocations]);

    //HANDLE SEARCH BASED ON THE GIVEN TEXT
    const handleSearch = (text) => {

        //IF THERE IS TEXT
        if (text) {

            //FILTER TEXT IN CONVOCATIONS 
            const filtered = convocations.filter(
                (convocation) =>
                    convocation.program.name.includes(text) ||
                    convocation.beginning.includes(text) ||
                    convocation.schedule.includes(text) ||
                    convocation.id.toString().includes(text)
            );
            //UPDATE WITH THE FILTERED ARRAY FROM CONVOCATIONS
            setFilteredConvocations(filtered);
        } else {
            //IF THERE IS NO TEXT, SHOW CONVOCATIONS
            setFilteredConvocations(convocations);
        }
    };

    //IF THE API DONT WORK SHOW CARGANDO...
    if (!filteredConvocations) {
        return <div>Cargando...</div>;
    }

    return (
        // RENDER THE CONVOCATIONS
        <Container className="mt-5">

            {/* INPUTSEARCH */}
            <div className="containerInput">
                <InputSearch onSearch={handleSearch} />
            </div>

            {/* SHOW THE CONVOCATIONS TABLE */}
            <div className="tableContainer">
                <table className="customTable">
                    <thead>
                        {/* TABLE NAMES */}
                        <tr>
                            <th className="customTitle">ID</th>
                            <th className="customTitle">Programa</th>
                            <th className="customTitle">Inicio</th>
                            <th className="customTitle">Horarios</th>
                            {/* <th className="customTitle">Editar</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        {/* TABLE DATA */}
                        {filteredConvocations.slice(0, 15).map((convocation) => (
                            <tr key={convocation.id}>
                                <td className="customData">{convocation.id}</td>
                                <td className="customData">{convocation.program.name}</td>
                                <td className="customData">{convocation.beginning}</td>
                                <td className="customData">{convocation.schedule}

                                    {/* IF THERE IS ADMIN SHOW THIS BUTTON */}
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
