"use client"

import { MessageSquare } from "lucide-react"

const SuggestedQuestions = ({ onQuestionSelect, character = "gatsby" }) => {
  const characterQuestions = {
    gatsby: ["Tell me about your dreams and the green light, Gatsby", "Do you believe one can truly repeat the past?"],
    nick: ["What did you think of Gatsby when you first met him?", "What's your perspective on the American Dream?"],
    daisy: ["How do you feel about your role in society?", "What do you think about love and wealth?"]
  }

  const suggestedQuestions = characterQuestions[character] || characterQuestions.gatsby

  return (
    <div className="px-6 pb-4">
      <div className="flex items-center space-x-2 mb-3">
        <MessageSquare className="w-4 h-4 text-gray-400" />
        <p className="text-sm font-medium text-gray-300">Perhaps you'd like to discuss:</p>
      </div>
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
