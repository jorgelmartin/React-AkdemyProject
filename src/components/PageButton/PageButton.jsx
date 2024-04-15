import './PageButton.css';

//CREATE COMPONENT PAGE BUTTON
export const PageButton = ({ onClick, text, disabled, design }) => {

    const buttonClasses = ["pageButton"];
    if (design === "right") {
        buttonClasses.push("pageRight");
    } else if (design === "left") {
        buttonClasses.push("pageLeft");
    }

    return (
        <button
            className={buttonClasses.join(" ")}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};