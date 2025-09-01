const API_BASE_URL = "http://localhost:3000/api"

// Utility function for handling API errors
const handleApiError = (error, fallbackMessage) => {
  console.error("API Error:", error)

  if (error.name === "TypeError" && error.message.includes("fetch")) {
    throw new Error("Network error: Unable to connect to server")
  }

  throw new Error(error.message || fallbackMessage)
}

export const characterApiService = {
  async askCharacter(question, characterId) {
    try {
      const response = await fetch(`${API_BASE_URL}/character/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question, character: characterId })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      handleApiError(error, "Failed to get character response")
    }
  }
}

export default characterApiService
