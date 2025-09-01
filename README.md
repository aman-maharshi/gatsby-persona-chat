## Gatsby Persona Chat

A sophisticated AI-powered chat application that brings three iconic characters from F. Scott Fitzgerald's "The Great Gatsby" to life. Choose between Jay Gatsby, Nick Carraway, or Daisy Buchanan for unique, character-specific conversations in an immersive, beautifully designed interface.

## 🚀 **Features**

### **Backend API**

- ✅ Character validation (Gatsby, Nick, Daisy)
- ✅ Conversation context support
- ✅ Error handling and validation
- ✅ Health check endpoint
- ✅ API documentation
- ✅ Legacy endpoint support

### **Frontend UI**

- ✅ Character selection page
- ✅ Real-time chat interface
- ✅ Suggested questions
- ✅ Responsive design
- ✅ Dark theme with Gatsby aesthetics
- ✅ Message timestamps
- ✅ Loading states

## 🛠️ **Setup**

1. **Install dependencies:**

```bash
npm install
```

2. **Create a `.env` file in the root directory with your API keys:**

```env
# OpenAI/Gemini Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_BASE_URL=gemini_base_url_here
GEMINI_MODEL=gemini_model_here
```

3. **Run the development server:**

```bash
npm run dev
```

## 🎭 **Available Characters**

- **Jay Gatsby** - The enigmatic millionaire with dreams of the green light
- **Nick Carraway** - The thoughtful narrator witnessing the American Dream
- **Daisy Buchanan** - The beautiful socialite caught between love and wealth

## 🌐 **API Endpoints**

### **Health Check**

- **GET** `/api/health` - Check if the API is running

### **Character Chat**

- **POST** `/api/character/ask` - Ask a character a question
- **POST** `/api/character/ask-with-context` - Ask with conversation history

### **API Documentation**

- **GET** `/api` - View all available endpoints and usage examples

## 📱 **Frontend Routes**

- **`/`** - Character selection page
- **`/chat/[characterId]`** - Chat interface with specific character

## 🎨 **UI Components**

- **CharacterSelectionPage** - Main landing page with character cards
- **ChatPage** - Full chat interface with message history
- **ChatForm** - Message input and send functionality
- **ChatHeader** - Navigation and character info
- **UserMessage** - User message display
- **AgentMessage** - Character response display
- **SuggestedQuestions** - Quick question suggestions

## 🔧 **Technical Stack**

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI/Gemini API integration
- **Styling**: Custom CSS variables, Tailwind CSS
- **Icons**: SVG icons (no external icon library)

## 🚀 **Usage Examples**

### **Basic Character Chat**

```bash
curl -X POST http://localhost:3000/api/character/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Tell me about your dreams", "character": "gatsby"}'
```

### **Chat with Context**

```bash
curl -X POST http://localhost:3000/api/character/ask-with-context \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What do you think about that?",
    "character": "gatsby",
    "conversationHistory": [
      {"role": "user", "content": "Tell me about your dreams"},
      {"role": "assistant", "content": "I dream of Daisy..."}
    ]
  }'
```

## 🎯 **Getting Started**

1. Start the development server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Select a character to begin chatting
4. Use suggested questions or type your own
5. Enjoy conversations with Gatsby, Nick, and Daisy!

## 🔍 **Development**

- **API Routes**: Located in `app/api/`
- **Components**: Located in `components/`
- **Services**: Located in `lib/`
- **Styling**: Custom CSS in `app/globals.css`

The application is now a complete full-stack Next.js app with integrated backend API and frontend UI!
