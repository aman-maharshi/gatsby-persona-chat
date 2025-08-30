import React from "react"
import { Loader2, Send } from "lucide-react"

const ChatForm = ({ inputMessage, setInputMessage, handleSendMessage, isLoading }) => {
  return (
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
  )
}

export default ChatForm
