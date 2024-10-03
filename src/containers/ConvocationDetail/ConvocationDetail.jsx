import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ConvocationDetail.css";
import { CreateConvocation } from "../CreateConvocation/CreateConvocation";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
import { useFetchInscriptions } from "../../../hooks/useFetchInscriptions";
import { PageButton } from "../../components/PageButton/PageButton";

export const ConvocationDetail = () => {

    let { id } = useParams();
    const parsedId = parseInt(id);
    const convocations = useFetchConvocations();
    const [convocationDetail, setConvocationDetail] = useState('');
    const [editing, setEditing] = useState(false);
    const allStudentInscriptions = useFetchInscriptions();
    const [currentPage, setCurrentPage] = useState(1);

    //FILTER ALL STUDENT ACCEPTED BY CONVOCATION
    const studentAccepted = Array.isArray(allStudentInscriptions) ? allStudentInscriptions
        .filter((item) => item.convocation.id === parsedId && item.status === 1
        )
        : [];

    //SEARCH IN THE ARRAY CONVOCATIONS COMPARING THE ID GETING FROM parsedId
    useEffect(() => {
        if (convocations && Array.isArray(convocations)) {
            const foundConvocation = convocations.find((item) => item.id === parsedId);
            if (foundConvocation) {
                setConvocationDetail(foundConvocation);
            } else {
                setConvocationDetail('');
            }
        }
    }, [parsedId, convocations]);

    // CALCULATE START AND END INDEX FOR CURRENT PAGE
    const startIndex = (currentPage - 1) * 4;
    const endIndex = currentPage * 4;

    return (
        <>
            {/* IF IS NOT EDITING SHOW */}
            {!editing ? (
                <>
                    {convocationDetail && (
                        //DETAIL PROGRAM GETTING FROM USEPARAMS
                        <div className="convocationDetail">
                            <div className="borderProgramInfo">
                                <div className="programInfo">
                                    <h2 className="titleDetail">{convocationDetail.program.name}</h2>
                                    <div className="programDetails">
                                        <div className="detailItem">
                                            <strong>Comienzo:</strong> {convocationDetail.beginning}
                                        </div>
                                        <div className="detailItem">
                                            <strong>Horarios:</strong> {convocationDetail.schedule}
                                        </div>
                                        <div className="detailItem">
                                            <strong>Precio:</strong> {convocationDetail.program.price}
                                        </div>
                                    </div>
                                    {/* AKDEMY BUTTON */}
                                    <AkdemyButton
                                        onClick={() => {
                                            setEditing(!editing);
                                        }}
                                        text={"Editar"}
                                    />
                                </div>
                            </div>
                            {/* SHOW THE STUDENT BY CONVOCATION */}
                            <h3 className="titleDetail">Alumnos</h3>

                            {studentAccepted.length > 0 ? (
                                <div className="tableContainerData">
                                    <div className="tableDataRow">

                                        {/* USERS TABLE */}
                                        <div className="tableDataHeader">Nombre</div>
                                        <div className="tableDataHeader">Email</div>
                                    </div>
                                    {studentAccepted.slice(startIndex, endIndex).map((item) => {
                                        return (
                                            <div key={item.id} className="tableDataRow">
                                                <div className="tableDataData">{item.user.name} {item.user.surname}</div>
                                                <div className="tableDataData">{item.user.email}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div>No hay alumnos inscritos</div>
                            )}

                            {/* PAGINATION */}
                            {studentAccepted.length > 4 ? (
                                <div className="d-flex justify-content-center align-items-center mt-3">
                                    <PageButton
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        text={'◁'}
                                        design="left"
                                    />
                                    <div className="numberPage">{currentPage}</div>
                                    <PageButton
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={endIndex >= studentAccepted.length}
                                        text={'▷'}
                                        design="right"
                                    />
                                </div>
                            ) : ''}
                        </div>
                    )}
                </>
            ) : (
                // IF CLIC IN EDIT USE CREATECONVOCATION COMPONENT FOR EDIT THE ACTUAL CONVOCATION
                <CreateConvocation isUpdate={true} updateData={convocationDetail} />
            )}
        </>
    );
};