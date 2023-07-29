import { useEffect, useState } from "react";

//SELECTING SERVICES FOR THE APPOINTMENT
export const SelectPrograms = ({handleChange, value}) => {

    //USER SELECTED SERVICE FROM THE FATHER COMPONENT
    const [selectedService, setSelectedService] = useState(value);
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/program/getAll")
            .then((res) => res.json())
            .then((res) => {
                setServices(res.data);
                console.log("Response from API:", res);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <select className="inputAppointment" value={selectedService} onChange={(e) => {
                handleChange(e.target.value); 
                setSelectedService(e.target.value)}}>
                <option value="">Cursos</option>
                {services.map((service) => (
                    <option key={service.id} value={service.id}>
                        {service.name}
                    </option>
                ))}
            </select>
            {/* <div>{selectedService && `Selected service: ${selectedService}`}</div> */}
        </>
    );
};

