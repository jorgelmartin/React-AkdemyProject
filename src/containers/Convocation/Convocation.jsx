import { useState, useEffect } from "react";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { Container } from "react-bootstrap";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { userData } from "../../containers/userSlice";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { AdminButton } from "../../components/AdminButton/AdminButton";
import { PageButton } from "../../components/PageButton/PageButton";

export const Convocation = () => {
    const convocations = useFetchConvocations();
    const [filteredConvocations, setFilteredConvocations] = useState([]);
    const navigate = useNavigate();
    const userRole = useSelector(userData);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setFilteredConvocations(convocations);
    }, [convocations]);

    //HANDLE SEARCH BASED ON THE GIVEN TEXT
    const handleSearch = (text) => {
        if (text) {
            const searchText = text.toLowerCase();
            const filtered = convocations.filter(
                (convocation) =>
                    convocation.program.name.toLowerCase().includes(searchText) ||
                    convocation.beginning.toLowerCase().includes(searchText) ||
                    convocation.schedule.toLowerCase().includes(searchText) ||
                    convocation.id.toString().toLowerCase().includes(searchText)
            );
            setFilteredConvocations(filtered);
            setCurrentPage(1);
        } else {
            setFilteredConvocations(convocations);
        };
    };

    // CALCULATE START AND END INDEX FOR CURRENT PAGE
    const startIndex = (currentPage - 1) * 7;
    const endIndex = currentPage * 7;

    //IF THE API DONT WORK SHOW CARGANDO...
    if (!filteredConvocations) {
        return <div>Cargando...</div>;
    }

    return (
        // RENDER THE CONVOCATIONS
        <Container>

            {/* TITLE */}
            <div className="requestUser mt-5">Convocatorias</div>

            {/* INPUT SEARCH */}
            <InputSearch onSearch={handleSearch} />

            {/* TABLE HEADER */}
            <div className="tableContainerCheck mt-4">
                <div className="tableDataRow">
                    <div className="tableHeaderRequest"><strong>Programa</strong></div>
                    <div className="tableHeaderRequest"><strong>Inicio</strong></div>
                    <div className="tableHeaderRequest"><strong>Horarios</strong></div>

                    {/* ONLY SHOW DETAIL IF IS ADMIN */}
                    {userRole.data.role === 1 && (
                        <div className="tableHeaderRequest"><strong>Detalle</strong></div>
                    )}
                </div>

                {/* MAPPING THE CONVOCATIONS */}
                {filteredConvocations.slice(startIndex, endIndex).map((convocation) => {
                    return (
                        <div className="tableDataRow" key={convocation.id}>
                            <div className="tableDataCheck">{convocation.program.name}</div>
                            <div className="tableDataCheck">{convocation.beginning}</div>
                            <div className="tableDataCheck">{convocation.schedule}</div>

                            {/* ONLY SHOW DETAIL BUTTON IF IS ADMIN */}
                            {userRole.data.role === 1 && (
                                <div className="tableDataCheck">
                                    <div className="d-flex justify-content-center align-items mt-1 buttonsConvocations">
                                        <AdminButton
                                            onClick={() => navigate(`/convodetail/${convocation.id}`)}
                                            text={"VER"}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
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
                    disabled={endIndex >= filteredConvocations.length}
                    text={'🡲'}
                    design="right"
                />
            </div>
        </Container>
    );
};
