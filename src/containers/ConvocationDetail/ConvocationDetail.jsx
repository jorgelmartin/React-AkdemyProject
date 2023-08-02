import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ConvocationDetail.css";
import { Button } from "react-bootstrap";
import { CreateConvocation } from "../CreateConvocation/CreateConvocation";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";

export const ConvocationDetail = () => {

    //GET THE ID VALUE FROM THE URL
    let { id } = useParams();
    const parsedId = parseInt(id);
    console.log(parsedId);

    //ASSIGN convocation
    const convocations = useFetchConvocations();
    const [convocationDetail, setConvocationDetail] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        // FOUND THE APPOINTMENT WITH THE ID GET IT FROM THE ARRAY
        console.log("hello", convocations);
        if (convocations && Array.isArray(convocations)) {
            const foundConvocation = convocations.find((item) => item.id === parsedId);
            if (foundConvocation) {
                setConvocationDetail(foundConvocation);
            } else {
                setConvocationDetail(null);
            }
        }
    }, [parsedId, convocations]);
    console.log("convoooo",convocationDetail);
    return (
        <>
    {convocationDetail && !editing ? (
        <div className="convocationDetail">
            <div className="DetailAppointment1">
                <div className="program-info">
                    <h2>Programa: {convocationDetail.program.name}</h2>
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
                </div>
                <AkdemyButton
                    className="edit-button"
                    onClick={() => {
                        setEditing(!editing);
                    }}
                    text={"Editar"}
                />
            </div>
            <h3>Alumnos:</h3>
            <div className="user-list">
                {convocationDetail.user.map((user) => (
                    <div className="user-item" key={user.id}>
                        <h4>{user.name} {user.surname}</h4>
                        <p>Email: {user.email}</p>
                        {/* Aquí puedes mostrar más información sobre el usuario si lo deseas */}
                    </div>
                ))}
            </div>
        </div>
    ) : (
        <CreateConvocation isUpdate={true} updateData={convocationDetail}></CreateConvocation>
    )}
</>
    );
};