import React from 'react';
import { Modal } from 'react-bootstrap';
import { AkdemyButton } from '../AkdemyButton/AkdemyButton';

export const ModalAkdemy = ({ show, onClose }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title >
                    Inscripción ya solicitada
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className=''>
                <p>Tu solicitud de inscripción para esta convocatoria ya ha sido registrada.</p>
                <AkdemyButton
                    onClick={onClose}
                    text={'Cerrar'}
                />
            </Modal.Body>
        </Modal>
    );
};