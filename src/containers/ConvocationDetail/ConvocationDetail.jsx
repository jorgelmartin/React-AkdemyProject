import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ConvocationDetail.css";
import { CreateConvocation } from "../CreateConvocation/CreateConvocation";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
import { useFetchInscriptions } from "../../../hooks/useFetchInscriptions";

export const ConvocationDetail = () => {

    //GET THE ID VALUE FROM THE URL
    let { id } = useParams();
    const parsedId = parseInt(id);

    const convocations = useFetchConvocations();
    const [convocationDetail, setConvocationDetail] = useState(null);
    const [editing, setEditing] = useState(false);
    // const studentAccepted = useFetchInscriptions();
    const allStudentAccepted = useFetchInscriptions();
    console.log(allStudentAccepted, "Hola");

    const studentAccepted = Array.isArray(allStudentAccepted) ? allStudentAccepted.filter((item) => item.convocation.id === parsedId) : [];


    // Agrega un console.log para verificar studentAccepted
    console.log("studentAccepted:", studentAccepted);
    //SEARCH IN THE ARRAY CONVOCATIONS COMPARING THE ID GETING FROM parsedId
    useEffect(() => {
        if (convocations && Array.isArray(convocations)) {
            const foundConvocation = convocations.find((item) => item.id === parsedId);
            if (foundConvocation) {
                setConvocationDetail(foundConvocation);
            } else {
                setConvocationDetail(null);
            }
        }
    }, [parsedId, convocations]);


    return (
        <>

            {/* IF IS NOT EDITING SHOW */}
            {convocationDetail && !editing ? (

                //DETAIL PROGRAM GETTING FROM USEPARAMS
                <div className="convocationDetail">
                    <div className="program-info">
                        <h2>Curso: {convocationDetail.program.name}</h2>
                        <div className="program-details">
                            <div className="detail-item">
                                <strong>Comienzo:</strong> {convocationDetail.beginning}
                            </div>
                            <div className="detail-item">
                                <strong>Horarios:</strong> {convocationDetail.schedule}
                            </div>
                            <div className="detail-item">
                                <strong>Descripción:</strong> {convocationDetail.program.description}
                            </div>
                            <div className="detail-item">
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

                    {/* SHOW THE STUDENT BY CONVOCATION */}
                    <h3>Alumnos:</h3>
                    <div>
                        {studentAccepted.map((item) => {
                            if (item.status === 1) {
                                return (
                                    <div key={item.id}>
                                        <h5>{item.user.name} {item.user.surname}</h5>
                                        <p>{item.user.email}</p>
                                    </div>
                                );
                            }
                            return null; // Omitir estudiantes con status diferente de true
                        })}
                    </div>
                </div>
            ) : (

                // IF CLIC IN EDIT USE CREATECONVOCATION COMPONENT FOR EDIT THE ACTUAL CONVOCATION
                <CreateConvocation isUpdate={true} updateData={convocationDetail} />
            )}
        </>
    );
};