import React from 'react';
import styled from 'styled-components';
import profile from '../assets/profile.svg';

export interface MessageProps {
    title?: string;
    textContent: string;
    received: boolean;
    date: Date;
    fields?: string[];
}

export const Message: React.FC<MessageProps> = ({ title, fields, textContent, received }) => {
    return (
        // enviar un parametro a la funcion para que sepa si es recibido o enviado
        <Box received={received ? 1 : undefined}>
            {!received && <Image src={profile} alt="profile" />}
            <TextContent received={received ? 1 : undefined}>
                <QuestionTitle>{title}</QuestionTitle>
                <p>{textContent}</p>
                <QuestionFields>
                    {fields?.map((field) => (
                        <Field key={field}>{field}</Field>
                    ))}
                </QuestionFields>
            </TextContent>
        </Box>
    );
};

const Box = styled.div<{ received?: number }>`
    display: flex;
    gap: 1em;
    flex-direction: ${(props) => props.received ? 'row-reverse' : 'row'};
    margin-bottom: 2em;
    background: #FFF;
`;

const QuestionTitle = styled.h3`
    font-size: 1.5em;
    margin: 0;
    margin-bottom: .5em;
`;

const Field = styled.div`
    padding: .5em;
    width: 100%;
    color: #A3A3A3;
    border-radius: 5px;
    pointer-events: none;
    background: #FFF;
`

const QuestionFields = styled.div`
    font-size: .9em;
    font-weight: 500;
    color: #000;
    display: flex;
    flex-direction: column;
    margin: 0;
    gap: .5em;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);
`

const TextContent = styled.div<{ received?: number }>`
    background:  ${(props) => props.received ? '#0A7CFF' : '#F3F3F5'};
    color: ${(props) => props.received ? '#FFF' : '#140505'};
    border-top-left-radius: 10px;
    display: ${(props) => props.received ? 'flex' : 'block'};
    align-items: center;
    width: 100%;
    font-size: .9em;
    border-bottom-left-radius: ${(props) => props.received ? '10px' : '0'};
    border: 2px solid #000;
    padding: 1em;

    @media (min-width: 768px) {
        width: 50%;
    }
`