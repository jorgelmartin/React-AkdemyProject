import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { createUserConvocation } from '../../services/apiCalls';
import { useFetchConvocations } from '../../../hooks/useFetchConvocation';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { AkdemyButton } from '../../components/AkdemyButton/AkdemyButton';
import "./Inscription.css";
import { useFetchInscriptions } from '../../../hooks/useFetchInscriptions';
import { ModalAkdemy } from '../../components/ModalAkdemy/ModalAkdemy';

export const Inscription = () => {
    const [convocationData, setConvocationData] = useState({});
    const datosCredencialesRedux = useSelector(userData);
    const [selectedConvocationId, setSelectedConvocationId] = useState({});
    const allInscriptions = useFetchInscriptions();
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const userToken = datosCredencialesRedux?.credentials?.token;
    const userId = datosCredencialesRedux?.data?.userId;
    const convocations = useFetchConvocations();

    //GETTING THE DATA FROM THE SELECTEDCONVOCATION 
    const handleConvocationChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedConvocation = convocations.find((convocation) => convocation.id === selectedId);

        //UPDATE CONVOCATIONDATA FROM THE SELECTED CONVOCATION
        setConvocationData({
            ...convocationData,
            convocation_id: selectedId,
            beginning: selectedConvocation ? selectedConvocation.beginning : '',
            schedule: selectedConvocation ? selectedConvocation.schedule : '',
            program: {
                price: selectedConvocation && selectedConvocation.program ? selectedConvocation.program.price : ''
            }
        });

        //UPDATE SLECTEDCONVOCATIONID STATE WITH SELECTEDID
        setSelectedConvocationId(selectedId);
    };

    //INSCRIPTION HANDLER
    const handleInscription = async (e) => {
        e.preventDefault();

        // VERIFY IF THE USER IS ALREADY IN THE CONVO
        const isAlreadyInscribed = allInscriptions.some(
            (inscription) =>
                inscription.user.id === userId &&
                inscription.convocation.id === selectedConvocationId
        );
        if (isAlreadyInscribed) {
            setShowModal(true);
        } else {

            //MAKE THE INSCRIPTION
            const body = {
                convocation_id: selectedConvocationId,
                user_id: userId,
            };
            navigate('/requestAccepted');
            const result = await createUserConvocation(body, userToken);
            console.log("Inscription created:", result);
        }
    };

    //FILTER AND SHOW ONLY UPCOMING CONVOCATIONS
    const upcomingConvocations = convocations ? convocations.filter(
        convocation => new Date(
            convocation.beginning
        ) > new Date()) : [];

    return (

        //RENDER INSCRIPTION CONTAINER
        <Container >
            <Card style={{
                maxWidth: '25em', margin: '0 auto', backgroundColor: '#9f512121', border: 'green solid 0.1em',
                boxShadow: 'rgb(38, 57, 77) 0em 1.25em 1.875em -0.625em'
            }}>
                <Card.Body>

                    {/* INSCRIPTION TITLE */}
                    <h2 className="textInscription mb-3 display-5">Inscripción:</h2>
                    <div className="gridContainer">
                        <div className="gridItem">

                            {/* GETTING UPCOMING CONVOCATIONS */}
                            <div className="labelCreate">Convocatorias:</div>
                            <select
                                className='inscriptionSelector'
                                value={convocationData.convocation_id}
                                onChange={handleConvocationChange}
                                style={{ width: '10em' }}
                                name="convocationSelect"
                            >
                                <option value={0}>Selecciona convocatoria</option>
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

                        {/* DISPLAY THE BEGINNING DATE */}
                        <div className="gridItem">
                            <div className="labelCreate">Inicio:</div>
                            <span>{convocationData.beginning}</span>
                        </div>

                        {/* DISPLAY SCHELUDE */}
                        <div className="gridItem">
                            <div className="labelCreate">Horarios:</div>
                            <span>{convocationData.schedule}</span>
                        </div>

                        {/* DISPLAY THE PRICE */}
                        <div className="gridItem">
                            <div className="labelCreate">Precio:</div>
                            <span>{convocationData.program && convocationData.program.price}</span>
                        </div>
                    </div>

                    {/* AKDEMY BUTTON */}
                    <div className="d-flex justify-content-center">
                        <AkdemyButton onClick={handleInscription} text="Solicitar" />
                    </div>
                </Card.Body>
            </Card>

            {/* SHOW MODAL */}
            <ModalAkdemy show={showModal} onClose={() => setShowModal(false)} />

        </Container>
    );
};