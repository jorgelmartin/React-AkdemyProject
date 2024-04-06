import './AdminButton.css';

export const AdminButton = ({ onClick, text }) => {
    return (
        <button className="AdminButton"  onClick={onClick}>
            {text}
        </button>
    );
};