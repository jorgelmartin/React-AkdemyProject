import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ConvocationDetail.css";
import { CreateConvocation } from "../CreateConvocation/CreateConvocation";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";

export const ConvocationDetail = () => {

    //GET THE ID VALUE FROM THE URL
    let { id } = useParams();
    const parsedId = parseInt(id);

    const convocations = useFetchConvocations();
    const [convocationDetail, setConvocationDetail] = useState(null);
    const [editing, setEditing] = useState(false);


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
                    <div className="user-list">
                        {convocationDetail.user.map((user) => (
                            <div className="user-item" key={user.id}>
                                <h4>{user.name} {user.surname}</h4>
                                <p>Email: {user.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (

                // IF CLIC IN EDIT USE CREATECONVOCATION COMPONENT FOR EDIT THE ACTUAL CONVOCATION
                <CreateConvocation isUpdate={true} updateData={convocationDetail}/>
            )}
        </>
    );
};