import './AdminButton.css';

export const AdminButton = ({ onClick, children, text }) => {
    return (
        <button className="AdminButton"  onClick={onClick}>
            {children} {text}
        </button>
    );
};