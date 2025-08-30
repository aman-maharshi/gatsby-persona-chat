import React from "react"

const Header = ({ selectedCharacter, onCharacterChange }) => {
  const characters = [
    {
      id: "gatsby",
      name: "Jay Gatsby",
      subtitle: "Welcome to West Egg, old sport",
      description: "The enigmatic millionaire with dreams of the green light",
      avatar: "/gatsby.png"
    },
    {
      id: "nick",
      name: "Nick Carraway",
      subtitle: "Observer from the Midwest",
      description: "The thoughtful narrator witnessing the American Dream",
      avatar: "/gatsby.png"
    },
    {
      id: "daisy",
      name: "Daisy Buchanan",
      subtitle: "The voice full of money",
      description: "The beautiful socialite caught between love and wealth",
      avatar: "/daisy.png"
    }
  ]

  return (
    <header className="shadow-sm border-b bg-app-level1 border-app-border">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">The Great Gatsby</h1>
          <p className="text-gray-300">Choose a character to begin your conversation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {characters.map(character => (
            <div
              key={character.id}
              onClick={() => onCharacterChange(character.id)}
              className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:scale-105 ${
                selectedCharacter === character.id
                  ? "border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/20"
                  : "border-app-border bg-app-background hover:border-yellow-400/50"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 ${
                      selectedCharacter === character.id ? "border-yellow-500" : "border-gray-400"
                    }`}
                  >
                    <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-semibold ${
                      selectedCharacter === character.id ? "text-yellow-500" : "text-white"
                    }`}
                  >
                    {character.name}
                  </h3>
                  <p className="text-sm text-gray-300 mb-1">{character.subtitle}</p>
                  <p className="text-xs text-gray-400">{character.description}</p>
                </div>
              </div>

              {selectedCharacter === character.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
