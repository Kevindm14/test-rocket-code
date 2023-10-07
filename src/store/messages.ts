import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
    id: number
    title: string
    fields: string[]
    textContent: string
    received: boolean
    date: Date
}

interface MessageState {
    messages: Message[]
}

interface MessageActions {
    setMessages: (message: Message) => void
    resetMessages: () => void
}

export const useMessageStore = create(
  persist<MessageState & MessageActions>(
    (set) => ({
        messages: [],

        setMessages: async (message: Message) => {
            set((state) => ({
                messages: [...state.messages, message],
            }))
        },

        resetMessages: () => {
          set({ messages: [] })
        }
    }),
    {
      name: "messages",
    }
  )
);