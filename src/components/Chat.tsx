import styled from 'styled-components'
import { Send } from './icons/Send'
import { useState } from 'react';
import { Message, useMessageStore } from '../store/messages';
import { useQuestionStore } from '../store/questions';
import { Message as MsgComponent } from './Message';
import { Name } from './Name';
import { Result } from './Result';

export const Chat = () => {
    const finished = useQuestionStore((state) => state.finished);
    const questions = useQuestionStore((state) => state.questions);
    const currentQuestion = useQuestionStore((state) => state.currentQuestion);
    const messages = useMessageStore((state) => state.messages);
    const [message, setMessage] = useState('');
    const { setMessages } = useMessageStore();
    const { nextQuestion, fillResult, saveResult, start } = useQuestionStore();

    const sendMessage = (event) => {
        // si el usuario presiona enter y el mensaje no esta vacio entonces envia el mensaje y pasa a la siguiente pregunta
        if ((event.key === 'Enter' && message !== '') || (event.type === 'click' && message !== '')) {
            const newMessage: Message = {
                id: messages.length + 1,
                textContent: message,
                title: '',
                fields: [],
                received: true,
                date: new Date(),
            };

            // agrega el mensaje a la lista de mensajes
            setMessages(newMessage);
            // limpia el input
            setMessage('')
            // pasa a la siguiente pregunta
            nextQuestion()
            // guarda el resultado de la pregunta
            fillResult(message);

            // si ya no hay mas preguntas entonces termina el chat
            if (currentQuestion === questions.length) return;

            // muestra la siguiente pregunta
            showNextComponent();
        }
    };

    const showNextComponent = () => {
        const nextComponent = questions[currentQuestion];

        const nextMessage: Message = {
            id:  messages.length + 1,
            title: nextComponent.question,
            fields: nextComponent.fields,
            textContent: '',
            received: false,
            date: new Date(),
        };

        setMessages(nextMessage);
    };


    const startResult = () => {
        // guarda el resultado en la base de datos
        saveResult();
        // muestra el resultado
        start();
    }

    if (finished) return <Result />

    return (
        <Main>
            <ChatTitle>
                <h1>Hola!</h1>
            </ChatTitle>
            <ChatWindow>
                <Name />
                {messages.map((message, index) => (
                    <MsgComponent
                        key={index}
                        title={message.title}
                        textContent={message.textContent}
                        received={message.received}
                        date={message.date}
                        fields={message.fields}
                    />
                ))}
            </ChatWindow>
            <ChatFooter>
                {currentQuestion > questions.length ? (
                    <StartButton onClick={startResult}>Iniciar</StartButton>
                ) : (
                    <>
                        <ChatInput
                            type="text"
                            required={true}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyDown={sendMessage}
                            placeholder="Escribe tu respuesta aqui..."
                        />
                        <ChatSend onClick={sendMessage}>
                            <Send />
                        </ChatSend>
                    </>
                )}
            </ChatFooter>
        </Main>
    )
}

// styles
const Main = styled.main`
    display: flex;
    flex-direction: column;
    background: #FFF;
    height: 100vh;

    @media (min-width: 768px) {
        margin: 0 10em;
    }
`

const ChatWindow = styled.div`
    height: 100%;
    background: #FFF;
    padding: 1em 1.5em;
    overflow-y: auto;
`

const ChatTitle = styled.div`
    color: #000;
    border-bottom: 1px solid #E0E0E0;
    padding: .4em .7em;

    h1 {
        margin: 0;
        margin-left: .2em;
        font-size: 2em;
        font-weight: 900;
    }
`

const ChatFooter = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
`

const ChatInput = styled.input`
    border: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 1.5em;
    font-size: 1em;
    font-weight: 600;
    background: #F3F3F5;
    outline: none;
    width: 90%;

    ::placeholder {
        color: red;
    }
`

const ChatSend = styled.div`
    cursor: pointer;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #0A7CFF;
    border: none;
    color: white;
    font-weight: 900;
    font-size: 1.5em;
    padding: .5em;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    &:hover {
        background: #2d8fff;
    }
`

const StartButton = styled.button`
    background: #0A7CFF;
    width: 100%;
    cursor: pointer;
    border: none;
    color: white;
    font-weight: 900;
    font-size: 1.5em;
    padding: .5em;
`