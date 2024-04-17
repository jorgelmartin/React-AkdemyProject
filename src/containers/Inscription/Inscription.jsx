import { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useFetchConvocations } from '../../../hooks/useFetchConvocation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AkdemyButton } from '../../components/AkdemyButton/AkdemyButton';
import "./Inscription.css";
import { useFetchInscriptions } from '../../../hooks/useFetchInscriptions';
import { ModalAkdemy } from '../../components/ModalAkdemy/ModalAkdemy';
import { createUserConvocation } from '../../services/ApiCalls';

export const Inscription = () => {
    const [convocationData, setConvocationData] = useState({});
    const [selectedConvocationId, setSelectedConvocationId] = useState({});
    const allInscriptions = useFetchInscriptions();
    const [showModal, setShowModal] = useState(false);
    const userToken = useSelector((state) => state.user.credentials.token);
    const userId = useSelector((state) => state.user.data.userId);
    const navigate = useNavigate();
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

    // VERIFY IF THE USER IS ALREADY IN THE CONVO
    const isAlreadyInscribed = Array.isArray(allInscriptions) && !!allInscriptions.find(
        (inscription) =>
            inscription.user.id === userId &&
            inscription.convocation.id === selectedConvocationId
    );


    //INSCRIPTION HANDLER
    const handleInscription = (e) => {
        e.preventDefault();

        if (isAlreadyInscribed) {
            setShowModal(true);
        } else {

            // MAKE THE INSCRIPTION
            const body = {
                convocation_id: selectedConvocationId,
                user_id: userId,
            };

            createUserConvocation(body, userToken)
                .then(res => {
                    navigate('/requestAccepted');
                })
                .catch(error => {
                    console.error(error.message);
                });
        }
    };

    //FILTER AND SHOW ONLY UPCOMING CONVOCATIONS
    const upcomingConvocations = convocations ? convocations.filter(
        convocation => new Date(
            convocation.beginning
        ) > new Date()) : [];

    return (

        //RENDER INSCRIPTION CONTAINER
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100%', width: '100%' }}
        >
            <Card style={{
                backgroundColor: '#9f512121', border: 'green solid 0.1em',
                boxShadow: 'rgb(38, 57, 77) 0em 1.25em 1.875em -0.625em'
            }}>
                <Card.Body>

                    {/* INSCRIPTION TITLE */}
                    <h2 className="textInscription mb-3 display-5">Inscripción:</h2>
                    <div className="inscriptionContainer">
                        <div className="dataInscription">

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
                        <div className="dataInscription">
                            <div className="labelCreate">Inicio:</div>
                            <span>{convocationData.beginning}</span>
                        </div>

                        {/* DISPLAY SCHELUDE */}
                        <div className="dataInscription">
                            <div className="labelCreate">Horarios:</div>
                            <span>{convocationData.schedule}</span>
                        </div>

                        {/* DISPLAY THE PRICE */}
                        <div className="dataInscription">
                            <div className="labelCreate">Precio:</div>
                            <span>{convocationData.program && convocationData.program.price}</span>
                        </div>
                    </div>

                    {/* AKDEMY BUTTON */}
                    <div className="d-flex justify-content-center mt-4">
                        <AkdemyButton onClick={handleInscription} text="Solicitar" />
                    </div>
                </Card.Body>
            </Card>

            {/* SHOW MODAL */}
            <ModalAkdemy
                show={showModal} 
                onClose={() => setShowModal(false)}
                title={'Inscripción ya solicitada'}
                text={'Tu solicitud de inscripción para esta convocatoria ya ha sido registrada.'}
                showConfirmButton={false}
            />
        </Container>
    );
};