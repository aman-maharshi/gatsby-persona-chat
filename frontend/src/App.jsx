import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CharacterSelection from "./components/CharacterSelection"
import ChatScreen from "./components/ChatScreen"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterSelection />} />
        <Route path="/chat/:characterId" element={<ChatScreen />} />
      </Routes>
    </Router>
  )
}

export default App
