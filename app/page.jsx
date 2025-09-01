"use client"

import { useRouter } from "next/navigation"
import { characters } from "../constants"

export default function Home() {
  const router = useRouter()

  const handleCharacterSelect = characterId => {
    router.push(`/chat/${characterId}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-app-background">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">The Great Gatsby</h1>
            <p className="text-xl text-gray-300 mb-8">Choose a character to begin your conversation</p>
            <p className="text-gray-400">
              Step into the world of F. Scott Fitzgerald and engage with iconic characters from the Jazz Age
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {characters.map(character => (
              <div
                key={character.id}
                onClick={() => handleCharacterSelect(character.id)}
                className="relative cursor-pointer rounded-xl border-2 border-app-border bg-app-level1 p-8 transition-all duration-300 hover:scale-105 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-500/10 group flex flex-col h-full"
              >
                <div className="text-center flex-1 flex flex-col">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-400 group-hover:border-yellow-500 transition-colors duration-300">
                      <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors duration-300">
                    {character.name}
                  </h3>

                  <p className="text-lg text-yellow-400 mb-4 font-medium">{character.subtitle}</p>

                  <p className="text-gray-400 leading-relaxed mb-6 flex-1">{character.description}</p>

                  <button className="w-full cursor-pointer py-3 px-6 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors duration-200 group-hover:shadow-lg mt-auto flex items-center justify-center space-x-2">
                    Start Conversation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
