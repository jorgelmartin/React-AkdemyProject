import { useEffect, useState } from "react";
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
    const allStudentAccepted = useFetchInscriptions();

    const studentAccepted = Array.isArray(allStudentAccepted) ? allStudentAccepted.filter((item) => item.convocation.id === parsedId) : [];

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
                    <div className="programInfo">
                        <h2 className="titleDetail">Curso: {convocationDetail.program.name}</h2>
                        <div className="programDetails">
                            <div className="detailItem">
                                <strong>Comienzo:</strong> {convocationDetail.beginning}
                            </div>
                            <div className="detailItem">
                                <strong>Horarios:</strong> {convocationDetail.schedule}
                            </div>
                            <div className="detailItem">
                                <strong>Descripción:</strong> {convocationDetail.program.description}
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

                    {/* SHOW THE STUDENT BY CONVOCATION */}
                    <h3 className="titleDetail">Alumnos:</h3>
                    <div className="studentList">
                        {studentAccepted.map((item) => {
                            if (item.status === 1) {
                                return (
                                    <div key={item.id} className="studentItem">
                                        <h5>{item.user.name} {item.user.surname}</h5>
                                        <p>{item.user.email}</p>
                                    </div>
                                );
                            }
                            return '';
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