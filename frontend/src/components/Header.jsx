import React from "react"
import { ChevronDown } from "lucide-react"

const Header = ({ selectedCharacter, onCharacterChange }) => {
  const characters = [
    { id: "gatsby", name: "Jay Gatsby", subtitle: "Welcome to West Egg, old sport", avatar: "/gatsby.png" },
    { id: "nick", name: "Nick Carraway", subtitle: "Observer from the Midwest", avatar: "/gatsby.png" },
    { id: "daisy", name: "Daisy Buchanan", subtitle: "The voice full of money", avatar: "/daisy.png" }
  ]

  const currentCharacter = characters.find(char => char.id === selectedCharacter) || characters[0]

  return (
    <header className="shadow-sm border-b bg-app-level1 border-app-border">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-500">
                <img src={currentCharacter.avatar} alt={currentCharacter.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{currentCharacter.name}</h1>
              <p className="text-sm text-gray-300">{currentCharacter.subtitle}</p>
            </div>
          </div>

          <div className="relative">
            <select
              value={selectedCharacter}
              onChange={e => onCharacterChange(e.target.value)}
              className="appearance-none bg-app-background border border-app-border rounded-lg px-4 py-2 pr-8 text-gray-200 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none cursor-pointer"
            >
              {characters.map(character => (
                <option key={character.id} value={character.id} className="bg-app-background">
                  {character.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
