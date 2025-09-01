// Pure validation function
const validateRequest = body => {
  if (!body?.question) {
    return { isValid: false, error: "Question is required" }
  }

  const validCharacters = ["gatsby", "nick", "daisy"]
  const character = body.character || "gatsby"

  if (!validCharacters.includes(character)) {
    return {
      isValid: false,
      error: `Invalid character: ${character}. Valid characters are: ${validCharacters.join(", ")}`
    }
  }

  return { isValid: true, character }
}

// Higher-order function to setup routes with chat service
export const setupRoutes = (app, chatService) => {
  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Great Gatsby AI is running" })
  })

  // Main character chat endpoint
  app.post("/api/character/ask", async (req, res) => {
    try {
      const validation = validateRequest(req.body)

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error })
      }

      const response = await chatService.getCharacterResponse(req.body.question, validation.character)
      res.json(response)
    } catch (error) {
      console.error("Error processing character conversation:", error)
      res.status(500).json({
        error: "Failed to process your conversation"
      })
    }
  })

  // New endpoint for character chat with conversation context
  app.post("/api/character/ask-with-context", async (req, res) => {
    try {
      const validation = validateRequest(req.body)

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error })
      }

      // Extract conversation history from request body
      const { question, character, conversationHistory = [] } = req.body

      const response = await chatService.getCharacterResponseWithContext(
        question,
        validation.character,
        conversationHistory
      )
      res.json(response)
    } catch (error) {
      console.error("Error processing character conversation with context:", error)
      res.status(500).json({
        error: "Failed to process your conversation"
      })
    }
  })

  // Backwards compatibility - Gatsby-specific endpoint
  app.post("/api/gatsby/ask", async (req, res) => {
    try {
      const validation = validateRequest(req.body)

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error })
      }

      const response = await chatService.getCharacterResponse(req.body.question, "gatsby")
      res.json(response)
    } catch (error) {
      console.error("Error processing Gatsby conversation:", error)
      res.status(500).json({
        error: "Failed to process your conversation with Gatsby"
      })
    }
  })

  // API documentation
  app.get("/api", (req, res) => {
    res.json({
      message: "Great Gatsby AI API",
      version: "1.0.0",
      endpoints: {
        health: "GET /health",
        askCharacter: "POST /api/character/ask",
        askCharacterWithContext: "POST /api/character/ask-with-context",
        askGatsby: "POST /api/gatsby/ask (legacy)"
      },
      usage: {
        askCharacter: {
          method: "POST",
          url: "/api/character/ask",
          body: { question: "string", character: "gatsby|nick|daisy" },
          example: { question: "Tell me about your dreams", character: "gatsby" }
        },
        askCharacterWithContext: {
          method: "POST",
          url: "/api/character/ask-with-context",
          body: { question: "string", character: "gatsby|nick|daisy", conversationHistory: "array" },
          example: {
            question: "What do you think about that?",
            character: "gatsby",
            conversationHistory: [
              { role: "user", content: "Tell me about your dreams" },
              { role: "assistant", content: "I dream of Daisy..." }
            ]
          }
        },
        askGatsby: {
          method: "POST",
          url: "/api/gatsby/ask",
          body: { question: "string" },
          example: { question: "Tell me about your dreams, Gatsby" }
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

  return app
}
