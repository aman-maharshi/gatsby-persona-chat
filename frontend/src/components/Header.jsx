import React from "react"

const Header = () => {
  return (
    <header className="shadow-sm border-b bg-app-level1 border-app-border">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500">
              <img src="/gatsby.png" alt="Jay Gatsby" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Jay Gatsby</h1>
            <p className="text-sm text-gray-300">Welcome to West Egg, old sport</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
