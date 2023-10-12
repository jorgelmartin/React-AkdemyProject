import React, { useState, useEffect, useRef } from "react";
import './MessageConvo.css';
import { createMessage, createReply } from "../../services/apiCalls";
import { format } from 'date-fns';
import { useSelector } from "react-redux";
import { InputText } from "../../components/InputText/InputText";
import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
import { useFetchGetAllMessages } from "../../../hooks/useFetchGetAllMessages";
import { ProgramSelection } from "../../components/ProgramSelection/ProgramSelection";
import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
// import { useFetchGetAllResponses } from "../../../hooks/useFetchGetAllResponses";

export const MessageConvo = () => {
    const userId = useSelector((state) => state.user.data.userId);
    const inscriptions = useFetchPrograms();
    const gettingAllMessages = useFetchGetAllMessages();
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [message, setMessage] = useState("");
    const token = useSelector((state) => state.user.credentials.token);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [updateMessages, setUpdateMessages] = useState(false);
    // const [showResponses, setShowResponses] = useState(false);
    // const responses = useFetchGetAllResponses();
    // const containerRef = useRef(null);

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    
    // Función para manejar el clic en un botón (o evento)
    const handleClick = () => {
        // Cambia el estado para forzar una actualización del componente
        setUpdateMessages(!updateMessages);
    };


    useEffect(() => {
        // Este efecto se ejecutará cada vez que updateMessages cambie
        // Puedes poner aquí cualquier lógica adicional que necesites
    }, [updateMessages]);


    const handleProgramSelect = (programId) => {
        setSelectedProgram(programId);
    };

    const handleMessageSubmit = (e) => {
        e.preventDefault();

        if (!message || !selectedProgram || !userId) {
            alert("Por favor, selecciona un programa antes de enviar el mensaje.");
            return;
        }

        createMessage({
            message: message.message,
            user_id: userId,
            program_id: selectedProgram,
            date: formattedDate
        }, token)
            .then((res) => {
                console.log("Mensaje creado:", res);
                setMessage("");
            })
            .catch((error) => console.log(error));
    };

    const startReplying = (commentId) => {
        console.log("ID de comentario seleccionado:", commentId);
        setIsReplying(true);
        setSelectedCommentId(commentId);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();

        if (!replyContent || !selectedProgram || !userId || !selectedCommentId) {
            alert("Por favor, escribe antes de enviar la respuesta.");
            return;
        }
        console.log("ID de comentario seleccionado:", selectedCommentId);

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
                setSelectedCommentId(null);
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
            <ProgramSelection programs={inscriptions[0]} onSelectProgram={handleProgramSelect} />

            <div className="messageContainer">
                <div className="messageText">

                    {filteredMessages.map((messageItem) => (
                        <div
                            key={messageItem.id}
                            className={`messageItem ${
                                messageItem.user_id === userId ? "messageSend" : "messageFrom"}`
                            }>

                            {/* Verifica si este mensaje es una respuesta */}
                            {messageItem.parent_id !== null && (
                                <div className="responseInfo">
                                    <p>En respuesta a: <strong style={{ fontSize: '0.86em' }}
                                    >{getUserInfo(messageItem.parent_id)}</strong></p>
                                </div>
                            )}
                            <p><strong>{messageItem.user.name} {messageItem.user.surname} </strong><span
                                style={{ fontSize: '0.8em' }}
                            >{messageItem.date}
                            </span>
                            </p>
                            <p>{messageItem.message}</p>

                            {!isReplying && (
                                <div onClick={() => startReplying(messageItem.id)}
                                style={{ color:'brown',
                                    cursor:'pointer',
                                    fontSize: '0.86em',
                                    width:'4em'
                            }}
                                >Responder</div>
                            )}

                            {isReplying && selectedCommentId === messageItem.id && (
                                <div className="d-flex" style={{ height: '3em' }}>
                                    <InputText
                                        type="text"
                                        placeholder="Escribe tu respuesta aquí"
                                        name="replyContent"
                                        value={replyContent}
                                        state={setReplyContent}
                                    />
                                    <div style={{ marginTop:'-1.2em' }}>
                                    <AkdemyButton
                                        onClick={(e) => {
                                            handleReplySubmit(e);
                                            handleClick();
                                        }}
                                        text="Enviar Respuesta"
                                    /></div>
                                </div>
                            )}
                        </div>
                    ))}</div>
                <div
                    style={{
                        display: "flex",
                        height: '3em' 
                    }}>
                    <InputText
                        type="text"
                        placeholder="Escribe tu mensaje aquí"
                        name="message"
                        value={message}
                        state={setMessage}
                    />
                    <div style={{ marginTop:'-1.2em' }}>
                    <AkdemyButton
                        onClick={(e) => {
                            handleMessageSubmit(e);
                            handleClick();
                        }}
                        text="Enviar"
                    /></div>
                </div>
            </div>
        </div>  
    );
};
   {/* {showResponses && responses && responses.length > 0 && (
                            <div className="responsesContainer">
                                {responses.map((response, index) => {
                                    if (response.replyToMessageId === messageItem.id) {
                                        return (
                                            <div key={index} className="responseItem">
                                                <p>{response.user_id}</p>
                                                <p>{response.message}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        )} */}



// import React, { useState, useEffect } from "react";
// import './MessageConvo.css';
// import { createMessage, createReply } from "../../services/apiCalls";
// import { format } from 'date-fns';
// import { useSelector } from "react-redux";
// import { InputText } from "../../components/InputText/InputText";
// import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
// import { useFetchGetAllMessages } from "../../../hooks/useFetchGetAllMessages";
// import { ProgramSelection } from "../../components/ProgramSelection/ProgramSelection";
// import { useFetchPrograms } from "../../../hooks/useFetchPrograms";

// export const MessageConvo = () => {
//     const userId = useSelector((state) => state.user.data.userId);
//     const inscriptions = useFetchPrograms();
//     const gettingAllMessages = useFetchGetAllMessages();
//     const [selectedProgram, setSelectedProgram] = useState(null);
//     const [isReplying, setIsReplying] = useState(false);
//     const [replyContent, setReplyContent] = useState("");
//     const [message, setMessage] = useState("");
//     const token = useSelector((state) => state.user.credentials.token);
//     const [selectedCommentId, setSelectedCommentId] = useState(null);
//     const [responses, setResponses] = useState({});

//     useEffect(() => {
//         // Llama a la función para obtener mensajes cuando cambia selectedProgram
//         if (selectedProgram) {
//             fetchMessages();
//         }
//     }, [selectedProgram]);

//     const currentDate = new Date();
//     const formattedDate = format(currentDate, 'yyyy-MM-dd');

//     // Función para manejar la selección de programas
//     const handleProgramSelect = (programId) => {
//         setSelectedProgram(programId);
//     };

//     const handleMessageSubmit = (e) => {
//         e.preventDefault();

//         if (!message || !selectedProgram || !userId) {
//             // Mostrar un mensaje de error al usuario
//             alert("Por favor, selecciona un programa antes de enviar el mensaje.");
//             return;
//         }

//         // CREATE MESSAGE
//         createMessage({
//             message: message,
//             user_id: userId,
//             program_id: selectedProgram,
//             date: formattedDate
//         }, token)
//             .then((res) => {
//                 console.log("Mensaje creado:", res);
//                 setMessage("");
//                 // Llama a la función para obtener mensajes después de crear uno nuevo
//                 fetchMessages();
//             })
//             .catch((error) => console.log(error));
//     };

//     const startReplying = (commentId) => {
//         console.log("ID de comentario seleccionado:", commentId);
//         setIsReplying(true);
//         setSelectedCommentId(commentId);
//         // Puedes almacenar el ID del mensaje al que se está respondiendo aquí si es necesario.
//     };

//     const handleReplySubmit = () => {
//         if (!replyContent || !selectedProgram || !userId || !selectedCommentId) {
//             alert("Por favor, completa todos los campos antes de enviar la respuesta.");
//             return;
//         }

//         // Verifica si se pasa correctamente el ID del comentario
//         console.log("ID de comentario seleccionado:", selectedCommentId);

//         // CREATE REPLY
//         createReply(selectedCommentId, {
//             message: replyContent,
//             user_id: userId,
//             program_id: selectedProgram,
//             date: formattedDate,
//         }, token)
//             .then((res) => {
//                 console.log("Respuesta del servidor:", res); // Agrega este console.log
//                 setReplyContent("");
//                 setIsReplying(false);
//                 setSelectedCommentId(null);
//                 // Llama a la función para obtener respuestas después de crear una nueva
//                 fetchResponses(selectedCommentId);
//             })
//             .catch((error) => console.log(error));
//     };

//     const fetchMessages = () => {
//         // Llama a la API para obtener mensajes y respuestas
//         // Utiliza el valor de selectedProgram para filtrar los mensajes
//         // Actualiza el estado de 'responses' con las respuestas si es necesario
//     };

//     const fetchResponses = (messageId) => {
//         // Llama a la API para obtener respuestas para el mensaje con 'messageId'
//         // Actualiza el estado 'responses' con las respuestas obtenidas
//     };

//     // Filtra los mensajes según el programa seleccionado
//     const filteredMessages = gettingAllMessages.filter((messageItem) => {
//         return messageItem.program.id === selectedProgram;
//     });

//     return (
//         <div className="containerForum">
//             <ProgramSelection programs={inscriptions[0]} onSelectProgram={handleProgramSelect} />
//             <div className="messageContainer">
//                 {filteredMessages.map((messageItem) => (
//                     <div
//                         key={messageItem.id}
//                         className={`messageItem ${messageItem.user_id === userId ? "messageSend" : "messageFrom"}`}
//                     >
//                         <p>{messageItem.user.name} {messageItem.user.surname} {messageItem.date}</p>
//                         <p>{messageItem.message}</p>
//                         {!isReplying && (
//                             <button onClick={() => startReplying(messageItem.id)}>Responder</button>
//                         )}

//                         {isReplying && selectedCommentId === messageItem.id && (
//                             <div>
//                                 <InputText
//                                     type="text"
//                                     placeholder="Escribe tu respuesta aquí"
//                                     name="replyContent"
//                                     value={replyContent}
//                                     state={setReplyContent}
//                                 />
//                                 <AkdemyButton
//                                     onClick={handleReplySubmit}
//                                     text="Enviar Respuesta"
//                                 />
//                             </div>
//                         )}

//                         {/* Mostrar respuestas debajo del mensaje si existen */}
//                         {responses[messageItem.id] && (
//                             <div className="responsesContainer">
//                                 {responses[messageItem.id].map((response, index) => (
//                                     <div key={index} className="responseItem">
//                                         <p>{response.user_id}</p>
//                                         <p>{response.message}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <InputText
//                 type="text"
//                 placeholder="Escribe tu mensaje aquí"
//                 name="message"
//                 value={message}
//                 state={setMessage}
//             />
//             <AkdemyButton
//                 onClick={handleMessageSubmit}
//                 text="Enviar"
//             />
//         </div>
//     );
// };

// ---------------------------------------

// import React, { useState, useEffect } from "react";
// import './MessageConvo.css';
// import { createMessage, createReply } from "../../services/apiCalls";
// import { format } from 'date-fns';
// import { useSelector } from "react-redux";
// import { InputText } from "../../components/InputText/InputText";
// import { AkdemyButton } from "../../components/AkdemyButton/AkdemyButton";
// import { useFetchGetAllMessages } from "../../../hooks/useFetchGetAllMessages";
// import { ProgramSelection } from "../../components/ProgramSelection/ProgramSelection";
// import { useFetchPrograms } from "../../../hooks/useFetchPrograms";
// import { useFetchGetAllResponses } from "../../../hooks/useFetchGetAllResponses";

// export const MessageConvo = () => {
//     const userId = useSelector((state) => state.user.data.userId);
//     const inscriptions = useFetchPrograms();
//     const gettingAllMessages = useFetchGetAllMessages();
//     const [selectedProgram, setSelectedProgram] = useState(null);
//     const [isReplying, setIsReplying] = useState(false);
//     const [replyContent, setReplyContent] = useState("");
//     const [message, setMessage] = useState("");
//     const token = useSelector((state) => state.user.credentials.token);
//     const [selectedCommentId, setSelectedCommentId] = useState(null);
//     const [showResponses, setShowResponses] = useState(false);

//     // const [responses, setResponses] = useState({});
//     const responses = useFetchGetAllResponses();

//     useEffect(() => {
//         // Llama a la función para obtener mensajes cuando cambia selectedProgram
//         if (selectedProgram) {
//             fetchMessages();
//         }
//     }, [selectedProgram]);

//     const currentDate = new Date();
//     const formattedDate = format(currentDate, 'yyyy-MM-dd');

//     // Función para manejar la selección de programas
//     const handleProgramSelect = (programId) => {
//         setSelectedProgram(programId);
//     };

//     const handleMessageSubmit = (e) => {
//         e.preventDefault();

//         if (!message || !selectedProgram || !userId) {
//             // Mostrar un mensaje de error al usuario
//             alert("Por favor, selecciona un programa antes de enviar el mensaje.");
//             return;
//         }

//         // CREATE MESSAGE
//         createMessage({
//             message: message.message,
//             user_id: userId,
//             program_id: selectedProgram,
//             date: formattedDate
//         }, token)
//             .then((res) => {
//                 console.log("Mensaje creado:", res);
//                 setMessage("");
//                 // Llama a la función para obtener mensajes después de crear uno nuevo
//                 fetchMessages();
//             })
//             .catch((error) => console.log(error));
//     };

//     const startReplying = (commentId) => {
//         console.log("ID de comentario seleccionado:", commentId);
//         setIsReplying(true);
//         setSelectedCommentId(commentId);
//         // Puedes almacenar el ID del mensaje al que se está respondiendo aquí si es necesario.
//     };

//     const handleReplySubmit = () => {
//         if (!replyContent || !selectedProgram || !userId || !selectedCommentId) {
//             alert("Por favor, completa todos los campos antes de enviar la respuesta.");
//             return;
//         }

//         // Verifica si se pasa correctamente el ID del comentario
//         console.log("ID de comentario seleccionado:", selectedCommentId);

//         // CREATE REPLY
//         createReply(selectedCommentId, {
//             message: replyContent.replyContent,
//             user_id: userId,
//             program_id: selectedProgram,
//             date: formattedDate,
//         }, token)
//             .then((res) => {
//                 console.log("Respuesta del servidor:", res); // Agrega este console.log
//                 setReplyContent("");
//                 setIsReplying(false);
//                 setSelectedCommentId(null);
//                 // Llama a la función para obtener respuestas después de crear una nueva
//                 fetchResponses(selectedCommentId);
//             })
//             .catch((error) => console.log(error));
//     };
    
//     const fetchMessages = () => {
//     // Llama a la API para obtener mensajes y respuestas
//     // Utiliza el valor de selectedProgram para filtrar los mensajes
//     // Actualiza el estado de 'responses' con las respuestas si es necesario
// };

// const fetchResponses = (messageId) => {
//     // Llama a la API para obtener respuestas para el mensaje con 'messageId'
//     // Actualiza el estado 'responses' con las respuestas obtenidas
// };


//     // Filtra los mensajes según el programa seleccionado
//     const filteredMessages = gettingAllMessages.filter((messageItem) => {
//         return messageItem.program.id === selectedProgram;
//     });
//     console.log(responses, "responn");
//     return (
//         <div className="containerForum">
//             <ProgramSelection programs={inscriptions[0]} onSelectProgram={handleProgramSelect} />
//             <div className="messageContainer">
//                 {filteredMessages.map((messageItem) => (
//                     <div
//                         key={messageItem.id}
//                         className={`messageItem ${messageItem.user_id === userId ? "messageSend" : "messageFrom"}`}
//                     >
//                         <p>{messageItem.user.name} {messageItem.user.surname} {messageItem.date}</p>
//                         <p>{messageItem.message}</p>
//                         {!isReplying && (
//                             <button onClick={() => startReplying(messageItem.id)}>Responder</button>
//                         )}

//                         {isReplying && selectedCommentId === messageItem.id && (
//                             <div>
//                                 <InputText
//                                     type="text"
//                                     placeholder="Escribe tu respuesta aquí"
//                                     name="replyContent"
//                                     value={replyContent}
//                                     state={setReplyContent}
//                                 />
//                                 <AkdemyButton
//                                     onClick={handleReplySubmit}
//                                     text="Enviar Respuesta"
//                                 />
//                             </div>
//                         )}

//                         {/* Mostrar respuestas debajo del mensaje si existen */}
//                         {showResponses && responses && responses.length > 0 && (
//                             <div className="responsesContainer">
//                                 {responses.map((response, index) => {
//                                     console.log("Contenido de response:", response);
//                                     // Verificar si la respuesta está asociada al mensaje actual
//                                     // Puedes usar un campo como 'replyToMessageId' para identificarlo
//                                     if (response.replyToMessageId === messageItem.id) {
//                                         console.log("Contenido de response:", response); // Agrega este console.log
//                                         return (
//                                             <div key={index} className="responseItem">
//                                                 <p>{response.user_id}</p>
//                                                 <p>{response.message}</p>
//                                             </div>
//                                         );
//                                     }
//                                     return null; // Si no se cumple la condición, devuelve null o puedes omitirlo
//                                 })}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <InputText
//                 type="text"
//                 placeholder="Escribe tu mensaje aquí"
//                 name="message"
//                 value={message}
//                 state={setMessage}
//             />
//             <AkdemyButton
//                 onClick={handleMessageSubmit}
//                 text="Enviar"
//             />
//         </div>
//     );
// };

