import React from "react";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import { useNavigate } from "react-router-dom";
import "./Home.css";


//SHOW PROGRAMS AT HOME PAGE
export const Home = () => {

    const programs = useFetchPrograms();

    if (!programs) {
        // Opción: Mostrar un mensaje de carga o un spinner mientras los datos se cargan.
        return <div>Cargando...</div>;
      }
    console.log();
    const navigate = useNavigate();
    console.log("Soy los programas", programs);
    return (
        <>
        {/* MAPPING SERVICES AT HOME PAGE */}
            <div className="productCardContainer">
            {programs.map((program) => (
                <div key={program.id} className="productCardDesign">
                    {/* <img className="productImgDesign" src={program.image} alt={program.name} onClick={() => navigate(`/servicedetail/${product.id}`)} /> */}
                    <h1>{program.name}</h1>
                </div>
            ))}
        </div>
        </>
    );
};   