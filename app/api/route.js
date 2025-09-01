export async function GET() {
  return Response.json({
    message: "Great Gatsby AI API",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/health",
      askCharacter: "POST /api/character/ask",
      askCharacterWithContext: "POST /api/character/ask-with-context"
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
      }
    }
  })
}
