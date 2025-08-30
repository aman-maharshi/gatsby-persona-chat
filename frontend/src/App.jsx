import React, { useState, useRef, useEffect } from "react"
import { Loader2, Send } from "lucide-react"

const App = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Greetings, old sport! I'm Jay Gatsby, and I'm delighted you've joined me at my estate in West Egg. Pour yourself a drink and let's discuss dreams, literature, love, and the endless possibilities that tomorrow may bring. What's on your mind tonight?"
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async e => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = { role: "user", content: inputMessage }
    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3000/api/gatsby/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: inputMessage })
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      const assistantMessage = { role: "assistant", content: data.answer }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage = {
        role: "assistant",
        content:
          "My apologies, old sport. It seems there's been a mishap with our connection. Please ensure the server is running on port 3000."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const suggestedQuestions = [
    "Tell me about your dreams and the green light, Gatsby",
    "What was it like at your magnificent parties?",
    "Share your thoughts on love and the American Dream",
    "What do you think about hope and the future?"
  ]

  const handleSuggestedQuestion = question => {
    setInputMessage(question)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#212529" }}>
      {/* Header */}
      <header className="shadow-sm border-b" style={{ backgroundColor: "#272b2f", borderColor: "#3a3f44" }}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500">
                <img src="/gatsby.png" alt="Jay Gatsby" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Jay Gatsby</h1>
              <p className="text-sm text-gray-300">Welcome to West Egg, old sport</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Messages Container */}
        <div
          className="flex-1 rounded-lg shadow-sm border mb-6 flex flex-col"
          style={{ backgroundColor: "#272b2f", borderColor: "#3a3f44" }}
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-yellow-500 text-gray-900 rounded-br-none"
                      : "rounded-bl-none text-gray-200"
                  }`}
                  style={message.role === "assistant" ? { backgroundColor: "#212529" } : {}}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg rounded-bl-none px-4 py-3" style={{ backgroundColor: "#212529" }}>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm font-medium text-gray-300 mb-3">Perhaps you'd like to discuss:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left p-3 text-sm text-gray-300 rounded-lg hover:opacity-80 transition-opacity border"
                    style={{ backgroundColor: "#212529", borderColor: "#3a3f44" }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <div className="border-t p-4" style={{ borderColor: "#3a3f44" }}>
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder="What's on your mind tonight, old sport?"
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-200 placeholder-gray-400"
                style={{ backgroundColor: "#212529", borderColor: "#3a3f44" }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
