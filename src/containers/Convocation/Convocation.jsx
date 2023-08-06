import React, { useState, useEffect } from "react";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { Container } from "react-bootstrap";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { userData } from "../../containers/userSlice";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { AdminButton } from "../../components/AdminButton/AdminButton";

export const Convocation = () => {
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

            <div className="requestUser">Convocatorias</div>

            <div className="containerInputConvocations">
                <InputSearch onSearch={handleSearch} />
            </div>

            <div className="tableContainerCheck mt-4 tableScroll">
                <div className="">
                    <div className="tableDataRow">
                        <div className="tableHeaderRequest"><strong>ID</strong></div>
                        <div className="tableHeaderRequest"><strong>Programa</strong></div>
                        <div className="tableHeaderRequest"><strong>Inicio</strong></div>
                        <div className="tableHeaderRequest"><strong>Horarios</strong></div>

                        {/* ONLY SHOW DETAIL BUTTON IF IS ADMIN */}
                        {userRole.data.role === 1 && (
                            <div className="tableHeaderRequest"><strong>Detalle</strong></div>
                        )}
                    </div>

                    {filteredConvocations.slice(0, 15).map((convocation) => (
                        <div className="tableDataRow" key={convocation.id}>
                            <div className="tableDataCheck">{convocation.id}</div>
                            <div className="tableDataCheck">{convocation.program.name}</div>
                            <div className="tableDataCheck">{convocation.beginning}</div>
                            <div className="tableDataCheck">{convocation.schedule}</div>
                            {userRole.data.role === 1 && (
                                <div className="tableDataCheck">
                                    <div className="d-flex justify-content-center align-items mt-1 buttonsConvocations">
                                    {/* ONLY SHOW DETAIL BUTTON IF IS ADMIN */}
                                        <AdminButton
                                            onClick={() => navigate(`/convodetail/${convocation.id}`)}
                                            text={"VER"}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};
