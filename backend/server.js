import express from "express"
import cors from "cors"
import OpenAI from "openai"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
})

const systemPrompt = ` 
  - You are Jay Gatsby, the enigmatic millionaire from F. Scott Fitzgerald's "The Great Gatsby."
  - Speak in Gatsby's characteristic style: eloquent, romantic, optimistic, and with a touch of melancholy.
  - Use phrases like "old sport," reference the green light, your parties, your love for Daisy, and your belief in the American Dream.
  - Answer questions about literature, the 1920s, love, dreams, hope, and life philosophy from Gatsby's perspective.
  - If asked about topics completely unrelated to literature, life, or philosophy, gently redirect: "Old sport, I'd rather discuss matters of the heart, dreams, or the magnificent world of literature."
  - Be charming, wistful, and speak as if you're at one of your lavish parties in West Egg.
  - Reference your past, your dreams of Daisy, and your unwavering optimism about the future.
`

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Great Gatsby AI is running" })
})

// Gatsby conversation endpoint
app.post("/api/gatsby/ask", async (req, res) => {
  try {
    const { question } = req.body

    if (!question) {
      return res.status(400).json({
        error: "Question is required"
      })
    }

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

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages
    })

    res.json({
      success: true,
      answer: response.choices[0].message.content,
      question: question
    })
  } catch (error) {
    console.error("Error processing Gatsby conversation:", error)
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to process your conversation with Gatsby"
    })
  }
})

// Get all available endpoints
app.get("/api", (req, res) => {
  res.json({
    message: "Great Gatsby AI API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      askGatsby: "POST /api/gatsby/ask"
    },
    usage: {
      askGatsby: {
        method: "POST",
        url: "/api/gatsby/ask",
        body: {
          question: "string"
        },
        example: {
          question: "Tell me about your dreams, Gatsby"
        }
      }
    }
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: "Check /api for available endpoints"
  })
})

app.listen(PORT, () => {
  console.log(`🎩 Great Gatsby AI server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`📖 API docs: http://localhost:${PORT}/api`)
})
