import OpenAI from "openai"
import { config, systemPrompt } from "../config/config.js"

const client = new OpenAI({
  apiKey: config.openai.apiKey,
  baseURL: config.openai.baseURL
})

export const getGatsbyResponse = async question => {
  const messages = [
    {
      role: "system",
      content: systemPrompt
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
    question: question
  }
}
