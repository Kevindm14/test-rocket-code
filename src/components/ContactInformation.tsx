import { Message } from './Message'

export const ContactInformation = () => {
    return (
        <Message
            title={"Datos de Contacto"}
            received={false}
            date={new Date()}
            textContent=''
            fields={['Telefono', 'Correo Electronico']}
        />
    );
};

