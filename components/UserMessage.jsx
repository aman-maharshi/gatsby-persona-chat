"use client"

import { format, parseISO, isValid } from "date-fns"

const UserMessage = ({ content, timestamp }) => {
  const formatTime = isoString => {
    if (!isoString) return ""
    try {
      const date = parseISO(isoString)
      return isValid(date) ? format(date, "h:mm a") : ""
    } catch (error) {
      return ""
    }
  }

  return (
    <div className="flex justify-end message-appear">
      <div className="max-w-xs lg:max-w-md xl:max-w-lg">
        <div className="px-4 py-3 rounded-lg bg-yellow-500 text-gray-900 rounded-br-none">
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
        {timestamp && <p className="text-xs text-gray-400 mt-1 text-right">{formatTime(timestamp)}</p>}
      </div>
    </div>
  )
}

export default UserMessage
