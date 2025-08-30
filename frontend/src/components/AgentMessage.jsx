import React from "react"
import { format, parseISO, isValid } from "date-fns"

const AgentMessage = ({ content, timestamp }) => {
  const formatTime = isoString => {
    if (!isoString) return ""
    const date = parseISO(isoString)
    return isValid(date) ? format(date, "h:mm a") : ""
  }

  return (
    <div className="flex justify-start items-start space-x-3">
      <div className="flex-shrink-0 mt-1">
        <div className="w-7 h-7 rounded-full overflow-hidden border border-yellow-500">
          <img src="/gatsby.png" alt="Jay Gatsby" className="w-full h-full object-cover" />
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
