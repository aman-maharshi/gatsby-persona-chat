import OpenAI from "openai"
import { config, systemPrompt } from "../config/config.js"

// Create OpenAI client instance
const createOpenAIClient = () =>
  new OpenAI({
    apiKey: config.openai.apiKey,
    baseURL: config.openai.baseURL
  })

// Pure function to create messages array
const createMessages = question => [
  {
    role: "system",
    content: systemPrompt
  },
  {
    role: "user",
    content: question
  }
]

// Pure function to create chat completion request
const createChatCompletionRequest = messages => ({
  model: config.openai.model,
  messages
})

// Higher-order function that creates the chat service
export const createChatService = () => {
  const client = createOpenAIClient()

  return {
    // Pure function to get response from OpenAI
    getGatsbyResponse: async question => {
      const messages = createMessages(question)
      const request = createChatCompletionRequest(messages)

      const response = await client.chat.completions.create(request)

      return {
        success: true,
        answer: response.choices[0].message.content,
        question: question
      }
    }
  }
}
