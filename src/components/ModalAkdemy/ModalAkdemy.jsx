import { Modal } from 'react-bootstrap';
import { AkdemyButton } from '../AkdemyButton/AkdemyButton';

export const ModalAkdemy = ({ show, onClose, onDeleteConfirm, title, text }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title >
                {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{text}</p>
                <div className='d-flex justify-content-between align-items-center'>
                <AkdemyButton
                    onClick={onClose}
                    text={'Cerrar'}
                />
                <AkdemyButton 
                onClick={onDeleteConfirm} 
                text={'Confirmar'} 
                />
                </div>
            </Modal.Body>
        </Modal>
    );
};