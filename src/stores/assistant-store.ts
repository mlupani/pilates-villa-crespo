import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  createMessage,
  createWelcomeMessage,
  MAX_STORED_MESSAGES,
  STORAGE_KEY,
  type AssistantMessage
} from '@/lib/assistant'
import { persistedAssistantSchema } from '@/lib/schemas'

interface AssistantState {
  conversationId: string | null
  messages: AssistantMessage[]
  addUserMessage: (content: string) => void
  addAssistantMessage: (content: string) => void
  setConversationId: (conversationId: string) => void
}

function capMessages (messages: AssistantMessage[]) {
  if (messages.length <= MAX_STORED_MESSAGES) return messages
  return messages.slice(-MAX_STORED_MESSAGES)
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set) => ({
      conversationId: null,
      messages: [createWelcomeMessage()],
      addUserMessage: (content) => {
        set((state) => ({
          messages: capMessages([...state.messages, createMessage('user', content)])
        }))
      },
      addAssistantMessage: (content) => {
        set((state) => ({
          messages: capMessages([
            ...state.messages,
            createMessage('assistant', content)
          ])
        }))
      },
      setConversationId: (conversationId) => {
        set({ conversationId })
      }
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversationId: state.conversationId,
        messages: state.messages
      }),
      merge: (persisted, current) => {
        const parsed = persistedAssistantSchema.safeParse(persisted)
        if (!parsed.success || parsed.data.messages.length === 0) return current

        return {
          ...current,
          conversationId: parsed.data.conversationId,
          messages: capMessages(parsed.data.messages)
        }
      }
    }
  )
)
