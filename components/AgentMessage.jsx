"use client"

import { format, parseISO, isValid } from "date-fns"
import { characters } from "@/constants"

const AgentMessage = ({ content, timestamp, character = "gatsby" }) => {
  const formatTime = isoString => {
    if (!isoString) return ""
    try {
      const date = parseISO(isoString)
      return isValid(date) ? format(date, "h:mm a") : ""
    } catch (error) {
      return ""
    }
  }

  const currentCharacter = characters.find(char => char.id === character) || characters[0]

  return (
    <div className="flex justify-start items-start space-x-3 message-appear">
      <div className="flex-shrink-0 mt-1">
        <div className="w-7 h-7 rounded-full overflow-hidden border border-yellow-500">
          <img src={currentCharacter.avatar} alt={currentCharacter.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="max-w-xs lg:max-w-md xl:max-w-lg">
        <div className="px-4 py-3 rounded-lg rounded-bl-none text-gray-200 bg-app-background">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
        {timestamp && <p className="text-xs text-gray-400 mt-1">{formatTime(timestamp)}</p>}
      </div>
    </div>
  )
}

export default AgentMessage
