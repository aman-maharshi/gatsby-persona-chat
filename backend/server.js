import express from "express"
import cors from "cors"
import { config } from "./config/config.js"
import { getGatsbyResponse } from "./services/openaiService.js"
import { setupRoutes } from "./routes/routes.js"

const app = express()
app.use(cors())
app.use(express.json())

// Setup routes
setupRoutes(app, { getGatsbyResponse })

// Start server
app.listen(config.port, () => {
  console.log(`🎩 Great Gatsby AI server running on port ${config.port}`)
  console.log(`📊 Health check: http://localhost:${config.port}/health`)
  console.log(`📖 API docs: http://localhost:${config.port}/api`)
})
