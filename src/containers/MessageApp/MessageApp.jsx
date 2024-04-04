import React, { useState } from "react";
import './MessageApp.css';
import { createMessage, createReply } from "../../services/apiCalls";
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import { useFetchGetAllMessages } from "../../../hooks/useFetchGetAllMessages";
import { ProgramSelection } from "../../components/ProgramSelection/ProgramSelection";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
import { InputMessage } from "../../components/InputMessage/InputMessage";

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
            console.log("Mensaje creado:", res);
            setMessage("");
            fetchMessages();
            })
        .catch((error) => console.log(error));
};

    const startReplying = (commentId) => {
        setIsReplying(true);
        setSelectedCommentId(commentId);
    };

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
                console.log("Respuesta del servidor:", res);
                setReplyContent("");
                setIsReplying(false);
                setSelectedCommentId('');
                fetchMessages();
            })
            .catch((error) => console.log(error));
    };

    const filteredMessages = gettingAllMessages.filter((messageItem) => {
        return messageItem.program.id === selectedProgram;
    });

    const getUserInfo = (parentId) => {
        // Buscar el mensaje al que se responde en filteredMessages
        const respondingMessage = filteredMessages.find(message => message.id === parentId);

        if (respondingMessage) {
            return `${respondingMessage.user.name} ${respondingMessage.user.surname}`;
        } else {
            return "Usuario desconocido";
        }
    };


    console.log(filteredMessages, "filteredMessages");
    return (
        <div className="containerForum">
            <div className="programSelectionContainer">
                <ProgramSelection programs={inscriptions[0]} onSelectProgram={handleProgramSelect} />
            </div>

            {selectedProgram && (
                <div className="messageContainer">
                    <div className="messageText">
                        {filteredMessages.map((messageItem) => (
                            <div
                                key={messageItem.id}
                                className={`messageItem ${messageItem.user_id === userId ? "messageSend" : "messageFrom"}`}
                            >
                                {/* Verifica si este mensaje es una respuesta */}
                                {messageItem.parent_id !== '' && (
                                    <div className="responseInfo">
                                        <p>En respuesta a: <strong style={{ fontSize: '0.86em' }}>{getUserInfo(messageItem.parent_id)}</strong></p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <strong>{messageItem.user.name} {messageItem.user.surname}</strong>
                                    <div style={{ fontSize: '0.8em', marginLeft: '0.3em' }}>{messageItem.date}</div>

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
                                    )}</div>
                                <p>{messageItem.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Renderización condicional de InputMessage */}
            {selectedProgram && (
                <div style={{}}>
                    {isReplying ? (
                        <InputMessage
                            type={"text"}
                            placeholder={"Escribe tu respuesta aquí"}
                            name={"replyContent"}
                            value={replyContent}
                            state={setReplyContent}
                            onSubmit={handleReplySubmit}
                            text="Enviar"
                        />
                    ) : (
                        <InputMessage
                            type={"text"}
                            placeholder={"Escribe tu mensaje aquí"}
                            name={"message"}
                            value={message}
                            state={setMessage}
                            onSubmit={handleMessageSubmit}
                            text="Enviar"
                        />
                    )}
                </div>
            )}
        </div>
    );
};