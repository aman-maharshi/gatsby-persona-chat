import express from "express"
import cors from "cors"
import { config } from "./config/config.js"
import { createChatService } from "./services/openaiService.js"
import { setupRoutes } from "./routes/routes.js"

// Pure function to create Express app with middleware
const createApp = () => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  return app
}

// Pure function to create server logger
const createServerLogger = port => () => {
  console.log(`🎩 Great Gatsby AI server running on port ${port}`)
  console.log(`📊 Health check: http://localhost:${port}/health`)
  console.log(`📖 API docs: http://localhost:${port}/api`)
}

// Pure function to start server
const startServer = (app, port) => {
  const logger = createServerLogger(port)
  return app.listen(port, logger)
}

// Main function that composes the entire application
const createServer = () => {
  const chatService = createChatService()

  // Compose the application using function composition
  const app = setupRoutes(createApp(), chatService)

  return {
    app,
    start: () => startServer(app, config.port)
  }
}

// Initialize and start the server
const server = createServer()
server.start()
