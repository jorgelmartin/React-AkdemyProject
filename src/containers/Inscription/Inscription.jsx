import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { createUserConvocation } from '../../services/apiCalls';
import { useFetchConvocations } from '../../../hooks/useFetchConvocation';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { AkdemyButton } from '../../components/AkdemyButton/AkdemyButton';
import "./Inscription.css";


export const Inscription = () => {
    const [convocationData, setConvocationData] = useState({});
    const datosCredencialesRedux = useSelector(userData);
    const [selectedConvocationId, setSelectedConvocationId] = useState({});

    const navigate = useNavigate();

    const userToken = datosCredencialesRedux?.credentials?.token;
    const userId = datosCredencialesRedux?.data?.userId;

    const convocations = useFetchConvocations(); // Fetch convocations from the API
    console.log(convocations)
    const handleConvocationChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedConvocation = convocations.find((convocation) => convocation.id === selectedId);

        setConvocationData({
            ...convocationData,
            convocation_id: selectedId,
            beginning: selectedConvocation ? selectedConvocation.beginning : '',
            schedule: selectedConvocation ? selectedConvocation.schedule : '',
            program: {
                price: selectedConvocation && selectedConvocation.program ? selectedConvocation.program.price : ''
            }
        });
        setSelectedConvocationId(selectedId); // Update the selectedConvocationId state
    };

    const handleInscription = async (e) => {
        e.preventDefault();
        const body = {
            convocation_id: selectedConvocationId,
            user_id: userId,
        };
        navigate('/requestAccepted');
        const result = await createUserConvocation(body, userToken);
        console.log("User-Convocation created:", result);
        
    };

    const upcomingConvocations = convocations ? convocations.filter(
        convocation => new Date(
            convocation.beginning
        ) > new Date()) : [];

    return (
        <Container >
            <Card style={{ maxWidth: '25em', margin: '0 auto', backgroundColor: '#9f512121', border: 'green solid 0.1em'}}>
                <Card.Body>
                    <h2 className="textInscription mb-3 display-5">Inscripción:</h2>
                    <div className="grid-container">
                        <div className="grid-item">
                            <div className="labelCreate">Convocatorias:</div>
                            <select
                                value={convocationData.convocation_id}
                                onChange={handleConvocationChange}
                                style={{ width: '10em' }}
                            >
                                <option value={0}>Seleccione una convocatoria</option>
                                {upcomingConvocations.length > 0 ? (
                                    upcomingConvocations.map((convocation) => (
                                        <option key={convocation.id} value={convocation.id}>
                                            {convocation.program.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No hay convocatorias próximas</option>
                                )}
                            </select>
                        </div>
                        <div className="grid-item">
                            <div className="labelCreate">Inicio:</div>
                            {/* Display the beginning date */}
                            <span>{convocationData.beginning}</span>
                        </div>
                        <div className="grid-item">
                            <div className="labelCreate">Horarios:</div>
                            {/* Display the schedule */}
                            <span>{convocationData.schedule}</span>
                        </div>
                        <div className="grid-item">
                            <div className="labelCreate">Precio:</div>
                            {/* Display the price of the program */}
                            <span>{convocationData.program && convocationData.program.price}</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <AkdemyButton onClick={handleInscription} text="Solicitar" />

                    </div>

                </Card.Body>
            </Card>
        </Container>
    );
};