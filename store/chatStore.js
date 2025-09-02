import { create } from "zustand"
import { persist } from "zustand/middleware"

const useChatStore = create(
  persist(
    (set, get) => ({
      // Chat state
      messages: {}, // { characterId: [messages] }
      tokenCount: 200,
      currentCharacter: null,

      // Actions
      addMessage: (message, characterId) =>
        set(state => ({
          messages: {
            ...state.messages,
            [characterId]: [...(state.messages[characterId] || []), message]
          }
        })),

      getMessagesForCharacter: characterId => {
        const messages = get().messages
        return messages[characterId] || []
      },

      decrementTokenCount: decrement =>
        set(state => ({
          tokenCount: Math.max(0, state.tokenCount - decrement)
        })),

      setCurrentCharacter: character => set({ currentCharacter: character })
    }),
    {
      name: "chat-storage",
      partialize: state => ({
        messages: state.messages,
        tokenCount: state.tokenCount
      })
    }
  )
)

export default useChatStore
