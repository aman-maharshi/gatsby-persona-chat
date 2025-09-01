import OpenAI from "openai"
import { config, characterPrompts } from "../config/config.js"

const client = new OpenAI({
  apiKey: config.openai.apiKey,
  baseURL: config.openai.baseURL
})

export const getCharacterResponse = async (question, character = "gatsby") => {
  // Validate character
  const validCharacters = ["gatsby", "nick", "daisy"]
  if (!validCharacters.includes(character)) {
    throw new Error(`Invalid character: ${character}. Valid characters are: ${validCharacters.join(", ")}`)
  }

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
    model: config.openai.model,
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
  // Validate character
  const validCharacters = ["gatsby", "nick", "daisy"]
  if (!validCharacters.includes(character)) {
    throw new Error(`Invalid character: ${character}. Valid characters are: ${validCharacters.join(", ")}`)
  }

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
    model: config.openai.model,
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
