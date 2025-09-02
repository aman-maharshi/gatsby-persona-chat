"use client"

import { ArrowLeft, Zap } from "lucide-react"

const ChatHeader = ({ character, onBackClick, tokenCount }) => {
  // Determine token status colors
  const getTokenStatus = () => {
    if (tokenCount <= 0) return { color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/20" }
    if (tokenCount <= 50)
      return { color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/20" }
    return { color: "text-green-500", bgColor: "bg-green-500/10", borderColor: "border-green-500/20" }
  }

  const tokenStatus = getTokenStatus()

  return (
    <header className="shadow-sm border-b bg-app-level1 border-app-border relative">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackClick}
            className="flex items-center cursor-pointer space-x-2 px-4 py-2 text-gray-300 hover:text-yellow-500 hover:bg-app-background rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden md:block">Back to Characters</span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500">
              <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">{character.name}</h1>
              <p className="text-sm text-gray-300">Online</p>
            </div>
          </div>
          {/* Token Display */}
          <div className="flex items-center space-x-2 absolute left-16 sm:left-auto sm:right-4">
            <div
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${tokenStatus.bgColor} ${tokenStatus.borderColor}`}
            >
              <Zap className={`w-5 h-5 ${tokenStatus.color}`} />
              <span className={`text-sm font-medium ${tokenCount <= 0 ? "text-red-400" : "text-white"}`}>
                {tokenCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader
