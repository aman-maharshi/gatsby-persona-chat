import React from "react"

const UserMessage = ({ content }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg bg-yellow-500 text-gray-900 rounded-br-none">
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  )
}

export default UserMessage
