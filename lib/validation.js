// Validation utilities for API routes

export const validateRequest = body => {
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
