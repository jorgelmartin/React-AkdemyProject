import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ConvocationDetail.css";
import { Button } from "react-bootstrap";
import { CreateConvocation } from "../CreateConvocation/CreateConvocation";
import { useFetchConvocations } from "../../../hooks/useFetchConvocation";

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
            { convocationDetail && !editing ? (
                <div className="convocationDetail">
                    <div className="DetailAppointment1">
                        <>
                            <h2>Programa: {convocationDetail.program.name}</h2>
                            <h4>Comienzo: {convocationDetail.beginning}</h4>
                            <h5>Horarios: {convocationDetail.schedule}</h5>
                            {/* <h5>Descripción: {convocationDetail.program.description}</h5>
                            <h5>Precio: {convocationDetail.program.price}</h5> */}
                        </>
                        <Button style={{ backgroundColor: '#13326fba' }}
                onClick={() => {
                    setEditing(!editing);
                }}
            >
                EDITAR
            </Button>
                    </div>
                </div>
                
                ) : (
                <CreateConvocation isUpdate={true} updateData={convocationDetail}></CreateConvocation>
                )
            }
            
        </>
    );
};