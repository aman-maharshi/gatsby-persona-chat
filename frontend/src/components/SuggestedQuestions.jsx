import React from "react"

const SuggestedQuestions = ({ onQuestionSelect }) => {
  const suggestedQuestions = [
    "Tell me about your dreams and the green light, Gatsby",
    "What was it like at your magnificent parties?",
    "Share your thoughts on love and the American Dream",
    "What do you think about hope and the future?"
  ]

  return (
    <div className="px-6 pb-4">
      <p className="text-sm font-medium text-gray-300 mb-3">Perhaps you'd like to discuss:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(question)}
            className="text-left p-3 text-sm text-gray-300 rounded-lg hover:opacity-80 transition-opacity border"
            style={{ backgroundColor: "#212529", borderColor: "#3a3f44" }}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SuggestedQuestions
