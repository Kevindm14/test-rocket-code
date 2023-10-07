import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Result } from '../utils/types/types'

interface Question {
    id: number
    question: string
    fields: string[]
}

interface QuestionState {
    questions: Question[]
    currentQuestion: number
    loading: boolean
    result: Result
    finished: boolean
}

interface QuestionActions {
    fetchQuestions: () => void
    nextQuestion: () => void
    resetQuestions: () => void
    fillResult: (message: string) => void
    saveResult: () => void
    start: () => void
}

export const useQuestionStore = create(
  persist<QuestionState & QuestionActions>(
    (set, get) => ({
        questions: [],
        currentQuestion: 1,
        loading: false,
        result: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          birthDate: '',
          mothersLastName: '',
          fathersLastName: '',
        },
        finished: false,

        // traer todas las preguntas del archivo json y guardarlas en el store
        fetchQuestions: async () => {
            const res = await fetch('http://localhost:5173/questions.json')
            const questions = await res.json()

            set({ questions })
        },

        // Pasar a la siguiente pregunta
        nextQuestion: () => {
          const { currentQuestion } = get()
          const nextQuestion = currentQuestion + 1

          set({ currentQuestion: nextQuestion })
        },

        // Guardar el resultado de la pregunta
        fillResult: (message: string) => {
          const { currentQuestion, result } = get()
          const currentQuestion2 = currentQuestion - 1

          const { firstName, lastName, mothersLastName, fathersLastName, birthDate } = result

          const fullName = message.split(' ')
          const contactInfo = message.split('-')

          // Si la pregunta es la 1, guardar el nombre completo
          if (currentQuestion2 === 1) {
            set({
              result: {
                firstName: fullName[0],
                lastName: fullName[1],
                fathersLastName: fullName[2],
                mothersLastName: fullName[3],
                birthDate: "",
                email: "",
                phone: "",
              },
            });
          }

          // Si la pregunta es la 2, guardar la fecha de nacimiento
          if (currentQuestion2 === 2) {
            set({
              result: {
                firstName: firstName,
                lastName: lastName,
                mothersLastName: mothersLastName,
                fathersLastName: fathersLastName,
                birthDate: message,
                email: "",
                phone: "",
              },
            });
          }

          // Si la pregunta es la 3, se guarda el email y el teléfono
          if (currentQuestion2 === 3) {
            set({
              result: {
                firstName: firstName,
                lastName: lastName,
                mothersLastName: mothersLastName,
                fathersLastName: fathersLastName,
                birthDate: birthDate,
                email: contactInfo[1],
                phone: contactInfo[0],
              },
            });
          }
        },

        // Enviar la información al servidor
        saveResult: async () => {
          const { result } = get()

          const res = await fetch('http://localhost:3000/api/v1/result', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
          })

          const data = await res.json()

          console.log(data)
        },

        // finalizar el cuestionario
        start: () => {
          set({ finished: true })
        },

        // Reiniciar las preguntas
        resetQuestions: () => {
          set({
            currentQuestion: 1,
            questions: [],
            finished: false,
            result: {
              firstName: "",
              lastName: "",
              mothersLastName: "",
              fathersLastName: "",
              birthDate: "",
              email: "",
              phone: "",
            },
          });
        }
    }),
    {
      name: "questions",
    }
  )
);