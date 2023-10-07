import { Message } from "./Message";

export const BirthDayDate = () => {
  return (
    <Message
        title={"Cual es tu fecha de nacimiento?"}
        received={false}
        date={new Date()}
        textContent=''
        fields={["Dia", "Mes", "Año"]}
    />
  );
};
