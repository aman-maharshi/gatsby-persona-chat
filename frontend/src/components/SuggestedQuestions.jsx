import React from "react"

const SuggestedQuestions = ({ onQuestionSelect }) => {
  const suggestedQuestions = [
    "Do you believe one can truly repeat the past?",
    "What was it like at your magnificent parties?"
  ]

  return (
    <div className="px-6 pb-4">
      <p className="text-sm font-medium text-gray-300 mb-3">Perhaps you'd like to discuss:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionSelect(question)}
            className="text-left p-3 text-sm text-gray-300 cursor-pointer rounded-lg hover:opacity-80 transition-opacity border bg-app-background border-app-border"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SuggestedQuestions
