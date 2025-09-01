import { getCharacterResponse } from "@/lib/openaiService"

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
