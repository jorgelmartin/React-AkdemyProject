import { useState } from "react";
import './MessageApp.css';
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import { useFetchGetAllMessages } from "../../../hooks/useFetchGetAllMessages";
import { ProgramSelection } from "../../components/ProgramSelection/ProgramSelection";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import { InputMessage } from "../../components/InputMessage/InputMessage";
import { createMessage, createReply, deleteMessage } from "../../services/ApiCalls";

export const MessageApp = () => {
    const userId = useSelector((state) => state.user.data.userId);
    const inscriptions = useFetchPrograms();
    const [gettingAllMessages, fetchMessages] = useFetchGetAllMessages();
    const [selectedProgram, setSelectedProgram] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [message, setMessage] = useState("");
    const token = useSelector((state) => state.user.credentials.token);
    const [selectedCommentId, setSelectedCommentId] = useState('');
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    const handleProgramSelect = (programId) => {
        setSelectedProgram(programId);
    };

    // CREATE MESSAGE
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (!message) {
            return;
        }

        createMessage({
            message: message.message,
            user_id: userId,
            program_id: selectedProgram,
            date: formattedDate
        }, token, selectedProgram)
            .then((res) => {
                setMessage("");
                fetchMessages();
            })
            .catch((error) =>
                console.log(error));
    };

    const startReplying = (commentId) => {
        setIsReplying(true);
        setSelectedCommentId(commentId);
    };

    // REPLY MESSAGE
    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (!replyContent) {
            return;
        }

        createReply(selectedCommentId, {
            message: replyContent.replyContent,
            user_id: userId,
            program_id: selectedProgram,
            date: formattedDate,
        }, token)
            .then((res) => {
                setReplyContent("");
                setIsReplying(false);
                setSelectedCommentId('');
                fetchMessages();
            })
            .catch((error) => console.log(error));
    };

    // DELETE MESSAGE
    const handleDeleteMessage = (messageId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este mensaje?');
        if (!confirmDelete) {
            return;
        }

        deleteMessage(messageId, token)
            .then((res) => {
                console.log("Mensaje eliminado:", res);
                fetchMessages();
            })
            .catch((error) => console.error("Error al eliminar el mensaje:", error));
    };

    const filteredMessages = gettingAllMessages.filter((messageItem) => {
        return messageItem.program.id === selectedProgram;
    });

    // GET USER DATA FOR RESPONSE
    const getUserInfo = (parentId) => {
        const respondingMessage = filteredMessages.find(message => message.id === parentId);
        return `${respondingMessage.user.name} ${respondingMessage.user.surname}`;
    };

    return (
        <div className="containerForum">

            {/* PROGRAM SELECTION */}
            <ProgramSelection programs={inscriptions[0]} onSelectProgram={handleProgramSelect} />

            {selectedProgram && (
                <div className="messageContainer col-lg-10 col-12">
                    <div className="messageText">

                        {/* SHOW FILTERED MESSAGES */}
                        {filteredMessages.map((messageItem) => (

                            // CHECK WHO SEND THE MESSAGE
                            <div
                                key={messageItem.id}
                                className={`messageItem ${messageItem.user_id === userId ? "messageSend" : "messageFrom"}`}
                            >
                                {/* CHECK IF THE MESSAGE IS AN ANSWER */}
                                {messageItem.parent_id && (
                                    <div className="responseInfo" style={{ fontSize: '0.86em' }}>
                                        <p>En respuesta a:
                                            <strong style={{ marginLeft: '0.3em', fontSize: '1em' }}>
                                                {getUserInfo(messageItem.parent_id)}
                                            </strong>
                                        </p>
                                    </div>
                                )}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>


                                    <strong>{messageItem.user.name} {messageItem.user.surname}</strong>
                                    <div
                                        style={{
                                            fontSize: '0.8em',
                                            marginLeft: '0.3em'
                                        }}
                                    >{messageItem.date}

                                    </div>

                                    {/* IF IS NOT REPLYING SHOW OPTION TO REPLAY */}
                                    {!isReplying && (
                                        <div
                                            onClick={() => startReplying(messageItem.id)}
                                            style={{
                                                color: 'brown',
                                                cursor: 'pointer',
                                                fontSize: '1.2em',
                                                marginLeft: '0.3em'
                                            }}
                                        >
                                            ↺
                                        </div>
                                    )}
                                </div>

                                {/* SHOW MESSAGE */}
                                <p>{messageItem.message}</p>

                                {/* SHOW DELETE MESSAGE OPTION IN MESSAGE IF IS THE SAME USER ID */}
                                {messageItem.user_id === userId && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}>
                                        <div
                                            onClick={() => handleDeleteMessage(messageItem.id)}
                                            className="deleteMessageButton"

                                        >
                                            X
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* INPUTMESSAGE */}
            {selectedProgram && (
                <div style={{}}>
                    {isReplying ? (
                        <InputMessage
                            type={"text"}
                            placeholder={"Escribe tu respuesta aquí"}
                            name={"replyContent"}
                            state={setReplyContent}
                            onClick={handleReplySubmit}
                            text="Enviar"
                        />
                    ) : (
                        <InputMessage
                            type={"text"}
                            placeholder={"Escribe tu mensaje aquí"}
                            name={"message"}
                            state={setMessage}
                            onClick={handleMessageSubmit}
                            text="Enviar"
                        />
                    )}
                </div>
            )}
        </div>
    );
};