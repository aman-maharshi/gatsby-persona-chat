import { getCharacterResponseWithContext } from "@/lib/aiService"
import { validateRequest } from "@/lib/validation"

export async function POST(request) {
  try {
    const body = await request.json()
    const validation = validateRequest(body)

    if (!validation.isValid) {
      return Response.json({ error: validation.error }, { status: 400 })
    }

    // Extract conversation history from request body
    const { question, character, conversationHistory = [] } = body

    const response = await getCharacterResponseWithContext(question, validation.character, conversationHistory)
    return Response.json(response)
  } catch (error) {
    console.error("Error processing character conversation with context:", error)
    return Response.json(
      {
        error: "Failed to process your conversation"
      },
      { status: 500 }
    )
  }
}
