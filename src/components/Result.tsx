import styled from 'styled-components'
import { useQuestionStore } from "../store/questions"
import { useMessageStore } from '../store/messages';

export const Result = () => {
    const result = useQuestionStore(state => state.result);
    const { resetQuestions } = useQuestionStore();
    const { resetMessages } = useMessageStore();

    const startAgain = () => {
        // reinicia las preguntas
        resetQuestions();
        // reinicia los mensajes
        resetMessages();
    }

    return (
        <Wrapper>
            <Content>
                <p style={{ "fontSize": "2em", "width": "300px" }}>Hola {result.firstName}, Gracias por responder el formulario</p>

                <Box>
                    <span>Nombre</span>
                    <p>{result.firstName}</p>
                </Box>

                <Box>
                    <span>Apellido</span>
                    <p>{result.lastName}</p>
                </Box>

                <Box>
                    <span>Correo Electronico</span>
                    <p>{result.email}</p>
                </Box>

                <Box>
                    <span>Telefono</span>
                    <p>{result.phone}</p>
                </Box>

                <Button onClick={startAgain}>Empieza de nuevo!</Button>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    background: #0A7CFF;
    height: 100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5em;
    padding: .5em;
    width: 100%;
    border-radius: 5px;
    pointer-events: none;
`

const Content = styled.div`
    color: #000;
    font-weight: 900;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 5em 3em;
    border-radius: 20px;
    background: #fff;
    justify-content: center;
    align-items: center;
    text-align: center;
`

const Button = styled.button`
    background: #000;
    cursor: pointer;
    border-radius: 20px;
    border: none;
    color: #FFF;
    font-weight: 900;
    font-size: 1em;
    padding: .5em 1em;
`