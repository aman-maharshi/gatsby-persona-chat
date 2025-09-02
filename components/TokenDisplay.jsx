import React from "react"
import { Zap } from "lucide-react"

const TokenDisplay = ({ tokenCount }) => {
  // Determine token status colors
  const getTokenStatus = () => {
    if (tokenCount <= 0) return { color: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/20" }
    if (tokenCount <= 50)
      return { color: "text-yellow-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/20" }
    return { color: "text-green-500", bgColor: "bg-green-500/10", borderColor: "border-green-500/20" }
  }

  const tokenStatus = getTokenStatus()

  return (
    <div className="flex items-center space-x-2 absolute top-5 left-16 sm:top-auto sm:left-auto sm:right-4 sm:bottom-4">
      <div
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${tokenStatus.bgColor} ${tokenStatus.borderColor}`}
      >
        <Zap className={`w-5 h-5 ${tokenStatus.color}`} />
        <span className={`text-sm font-medium ${tokenCount <= 0 ? "text-red-400" : "text-white"}`}>{tokenCount}</span>
        <span className="text-xs text-gray-400">tokens</span>
      </div>
    </div>
  )
}

export default TokenDisplay
