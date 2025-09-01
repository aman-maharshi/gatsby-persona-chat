import OpenAI from "openai"
import { characterPrompts } from "../constants"

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: process.env.GEMINI_BASE_URL
})

export const getCharacterResponse = async (question, character = "gatsby") => {
  const messages = [
    {
      role: "system",
      content: characterPrompts[character]
    },
    {
      role: "user",
      content: question
    }
  ]

  const response = await client.chat.completions.create({
    model: process.env.GEMINI_MODEL,
    messages
  })

  return {
    success: true,
    answer: response.choices[0].message.content,
    question: question,
    character: character,
    timestamp: new Date().toISOString()
  }
}

export const getCharacterResponseWithContext = async (question, character = "gatsby", conversationHistory = []) => {
  // Build messages array with conversation history
  const messages = [
    {
      role: "system",
      content: characterPrompts[character]
    },
    // Add conversation history (excluding welcome message)
    ...conversationHistory
      .filter(msg => msg.role === "user" || (msg.role === "assistant" && !msg.isWelcomeMessage))
      .map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      })),
    // Add current question
    {
      role: "user",
      content: question
    }
  ]

  const response = await client.chat.completions.create({
    model: process.env.GEMINI_MODEL,
    messages
  })

  return {
    success: true,
    answer: response.choices[0].message.content,
    question: question,
    character: character,
    timestamp: new Date().toISOString()
  }
}
