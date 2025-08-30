import React from "react"

const AgentMessage = ({ content }) => {
  return (
    <div className="flex justify-start items-start space-x-3">
      <div className="flex-shrink-0 mt-1">
        <div className="w-7 h-7 rounded-full overflow-hidden border border-yellow-500">
          <img src="/gatsby.png" alt="Jay Gatsby" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg rounded-bl-none text-gray-200 bg-app-background">
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}

export default AgentMessage
