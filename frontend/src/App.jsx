import React, { useState, useRef, useEffect } from "react"
import Header from "./components/Header"
import ChatForm from "./components/ChatForm"
import SuggestedQuestions from "./components/SuggestedQuestions"

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

  const handleSuggestedQuestion = question => {
    setInputMessage(question)
  }

  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <Header />

      {/* Main Chat Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 rounded-lg shadow-sm border flex flex-col bg-app-level1 border-app-border">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-yellow-500 text-gray-900 rounded-br-none"
                      : "rounded-bl-none text-gray-200 bg-app-background"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg rounded-bl-none px-4 py-3 bg-app-background">
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
          {messages.length === 1 && <SuggestedQuestions onQuestionSelect={handleSuggestedQuestion} />}

          <ChatForm
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  )
}

export default App
