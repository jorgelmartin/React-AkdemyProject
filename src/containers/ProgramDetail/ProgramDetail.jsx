import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProgramDetail.css";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";

export const ProgramDetail = () => {
    const datosCredencialesRedux = useSelector(userData);
    const navigate = useNavigate();
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

    const handleClick = () => {
        if (!datosCredencialesRedux.credentials?.token) {
            navigate('/register');
        } else {
            navigate('/inscription');
        }
    };

    //SHOW THE DETAIL SERVICE
    return (
        <div className="DetailService">
            <div className="DetailService1">
                {programDetail ? (
                    <>
                        <h2>{programDetail.name}</h2>
                        <img src={`https://laravel-akdemyproject-production.up.railway.app/${programDetail.image}`} alt="" />
                        <h4>{programDetail.description}</h4>
                        <h5>Precio €: {programDetail.price}</h5>
                        <AkdemyButton onClick={handleClick} text={"Solicitar Inscripción"}/>
                    </>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </div>
    );
};