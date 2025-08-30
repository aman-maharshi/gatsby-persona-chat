// Pure validation function
const validateQuestion = body =>
  !body?.question ? { isValid: false, error: "Question is required" } : { isValid: true }

// Higher-order function to setup routes with chat service
export const setupRoutes = (app, chatService) => {
  // Health check
  app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Great Gatsby AI is running" })
  })

  // Main Gatsby chat endpoint
  app.post("/api/gatsby/ask", async (req, res) => {
    try {
      const validation = validateQuestion(req.body)

      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error })
      }

      const response = await chatService.getGatsbyResponse(req.body.question)
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
        askGatsby: "POST /api/gatsby/ask"
      },
      usage: {
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
