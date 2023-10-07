import { Message } from './Message'

export const Name = () => {
    return (
        <Message
            title="¿Cuál es tu nombre?"
            received={false}
            date={new Date()}
            textContent=''
            fields={["Nombre", "Segundo Nombre", "Apellido Paterno", "Apellido Materno"]}
        />
    )
}
