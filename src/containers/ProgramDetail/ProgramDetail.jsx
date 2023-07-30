import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProgramDetail.css";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";

    export const ProgramDetail = () => {
        //GET THE ID VALUE FROM THE URL
        let { id } = useParams();
        const parsedId = parseInt(id); 

        console.log("soyiddd", id);
        //ASSIGN PROGRAMS
        const programs = useFetchPrograms();
        const [programDetail, setProgramDetail] = useState(null);
    
        useEffect(() => {
            // FOUND THE PROGRAM WITH THE ID GET IT FROM THE ARRAY
            const foundProduct = programs.find((item) => item.id === parsedId);
            if (foundProduct) {
                setProgramDetail(foundProduct);
            } else {
                setProgramDetail(null);
            }
        }, [parsedId, programs]);
        console.log("soyiddd", programDetail);

        //SHOW THE DETAIL SERVICE
    return (
        <div className="DetailService">
            <div className="DetailService1">
                {programDetail ? (
                    <>
                        <h2>{programDetail.name}</h2>
                        <img src={`http://localhost:8000/${programDetail.image}`} alt="" />
                        <h4>Descripción: {programDetail.description}</h4>
                        <h5>Precio €: {programDetail.price}</h5>
                    </>
                ) : (
                    <p>Producto no encontrado</p>
                )}
            </div>
        </div>
    );
};