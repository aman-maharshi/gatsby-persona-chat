"use client"

import { Send, Loader2, Zap } from "lucide-react"

const ChatForm = ({ inputMessage, setInputMessage, handleSendMessage, isLoading, disabled, inputPlaceholder }) => {
  return (
    <div className="border-t p-4 border-app-border">
      <form onSubmit={handleSendMessage} className="flex space-x-3">
        <input
          type="text"
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          placeholder={disabled ? "No tokens remaining" : inputPlaceholder}
          className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all text-gray-200 placeholder-gray-400 bg-app-background border-app-border disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || disabled}
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading || disabled}
          className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-full hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  )
}

export default ChatForm
