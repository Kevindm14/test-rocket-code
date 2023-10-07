import styled from 'styled-components'
import { useQuestionStore } from './store/questions';
import { Chat } from './components/Chat';

function App() {
  const { fetchQuestions } = useQuestionStore()
  const questions = useQuestionStore(state => state.questions)

  return (
    <Main>
      {questions.length === 0 ? (
        <Wrapper>
          <Title>
            Chat Test
          </Title>
          <Button onClick={fetchQuestions}>Iniciar</Button>
      </Wrapper>
      ) : (
        <Chat />
      )}
    </Main>
  )
}

const Main = styled.main`
  height: 100vh;
  gap: 1em;
  background: #f3f3f5;
`

const Title = styled.h1`
  color: #0A7CFF;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 3em;
  text-align: center;
`

const Wrapper = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1em;
  background: #FFF;
  padding: 1em;

  @media (min-width: 768px) {
    padding: 10em;
    background: #F3F3F5;
  }

`;

const Button = styled.button`
  background: #0A7CFF;
  cursor: pointer;
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: 900;
  font-size: 1.5em;
  padding: .5em;

  &:hover {
    background: #2d8fff;
  }
`

export default App
