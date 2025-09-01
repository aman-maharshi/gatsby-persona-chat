import { getCharacterResponse } from "@/lib/openaiService"
import { validateRequest } from "@/lib/validation"

export async function POST(request) {
  try {
    const body = await request.json()
    const validation = validateRequest(body)

    if (!validation.isValid) {
      return Response.json({ error: validation.error }, { status: 400 })
    }

    const response = await getCharacterResponse(body.question, validation.character)
    return Response.json(response)
  } catch (error) {
    console.error("Error processing character conversation:", error)
    return Response.json(
      {
        error: "Failed to process your conversation"
      },
      { status: 500 }
    )
  }
}
