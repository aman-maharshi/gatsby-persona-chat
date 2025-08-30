import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CharacterSelectionPage from "./pages/CharacterSelectionPage"
import ChatPage from "./pages/ChatPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterSelectionPage />} />
        <Route path="/chat/:characterId" element={<ChatPage />} />
      </Routes>
    </Router>
  )
}

export default App
