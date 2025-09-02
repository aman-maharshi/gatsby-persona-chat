"use client"

import { useState, useRef, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import ChatForm from "@/components/ChatForm"
import SuggestedQuestions from "@/components/SuggestedQuestions"
import UserMessage from "@/components/UserMessage"
import AgentMessage from "@/components/AgentMessage"
import ChatHeader from "@/components/ChatHeader"
import { characterApiService } from "@/lib/apiService"
import { characters } from "@/constants"
import TokenDisplay from "@/components/TokenDisplay"

export default function ChatPage({ params }) {
  const { characterId } = use(params)
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [tokenCount, setTokenCount] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tokenCount")
      return saved ? parseInt(saved, 10) : 100
    }
    return 100
  })
  const messagesEndRef = useRef(null)

  const currentCharacter = characters.find(char => char.id === characterId)
  const isChatDisabled = tokenCount <= 0

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Save tokenCount to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tokenCount", tokenCount.toString())
    }
  }, [tokenCount])

  // Initialize with welcome message when component mounts
  useEffect(() => {
    const character = characters.find(char => char.id === characterId)
    if (character) {
      setMessages([
        {
          role: "assistant",
          content: character.welcomeMessage,
          timestamp: new Date().toISOString(),
          character: characterId
        }
      ])
    }
  }, [characterId])

  const handleSendMessage = async e => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading || isChatDisabled) return

    const userMessage = { role: "user", content: inputMessage, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const data = await characterApiService.askCharacter(inputMessage, characterId)
      const assistantMessage = {
        role: "assistant",
        content: data.answer,
        timestamp: data.timestamp || new Date().toISOString(),
        character: data.character || characterId
      }
      setMessages(prev => [...prev, assistantMessage])
      setTokenCount(prev => Math.max(0, prev - 25))
    } catch (error) {
      console.error("Error:", error)
      const errorMessage = {
        role: "assistant",
        content:
          error.message === "Network error: Unable to connect to server"
            ? "My apologies, old sport. It seems there's been a mishap with our connection. Please ensure the server is running on port 3000."
            : `I apologize, but I encountered an issue: ${error.message}`,
        timestamp: new Date().toISOString(),
        character: characterId
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = question => {
    setInputMessage(question)
  }

  const handleBackToSelection = () => {
    router.push("/")
  }

  if (!currentCharacter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-app-background">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Character not found</h2>
          <button
            onClick={handleBackToSelection}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors duration-200"
          >
            Return to Character Selection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <ChatHeader character={currentCharacter} onBackClick={handleBackToSelection} tokenCount={tokenCount} />

      {/* Main Chat Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full sm:px-4 sm:py-6 border-t border-neutral-700 sm:border-t-transparent flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 rounded-lg shadow-sm border flex flex-col bg-app-level1 border-app-border">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[80vh] sm:max-h-[72vh]">
            {messages.map((message, index) =>
              message.role === "user" ? (
                <UserMessage key={index} content={message.content} timestamp={message.timestamp} />
              ) : (
                <AgentMessage
                  key={index}
                  content={message.content}
                  timestamp={message.timestamp}
                  character={message.character || characterId}
                />
              )
            )}

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

          <div className="mt-auto">
            {/* Suggested Questions */}
            {messages.length === 1 && !isChatDisabled && (
              <SuggestedQuestions onQuestionSelect={handleSuggestedQuestion} character={characterId} />
            )}

            <ChatForm
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              isLoading={isLoading}
              disabled={isChatDisabled}
              inputPlaceholder={currentCharacter.inputPlaceholder}
            />
          </div>
        </div>
      </main>

      <TokenDisplay tokenCount={tokenCount} />
    </div>
  )
}
