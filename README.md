## Gatsby Persona Chat

A sophisticated AI-powered chat application that brings three iconic characters from F. Scott Fitzgerald's "The Great Gatsby" to life. Choose between Jay Gatsby, Nick Carraway, or Daisy Buchanan for unique, character-specific conversations in an immersive, beautifully designed interface.

### 🚀 Tech Stack

#### Frontend

- **React 19** - Modern UI library with hooks and functional components
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework with custom utilities
- **Lucide React** - Beautiful, customizable icons
- **date-fns** - Modern JavaScript date utility library
- **ESLint** - Code linting and quality assurance

#### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **OpenAI API** - GPT-powered conversation engine
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

#### ✨ Features

- **Multi-Character Experience**: Choose between Jay Gatsby, Nick Carraway, or Daisy Buchanan
- **Interactive Chat Interface**: Real-time messaging with any character
- **Authentic Personalities**: Each character has distinct voice, mannerisms, and perspectives
- **Character Selector**: Elegant dropdown in header to switch between characters
- **Dynamic Suggested Questions**: Tailored conversation starters based on selected character
- **Character-Specific Welcome Messages**: Personalized greetings for each character
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Message Timestamps**: Formatted timestamps using date-fns
- **Avatar Integration**: Visual representation of characters in messages
- **Smooth Gradients**: Custom CSS utilities for beautiful button effects
- **Auto-scroll**: Automatic scrolling to keep latest messages visible
- **Error Handling**: Graceful error handling and user feedback

#### Prerequisites

- Node.js (v22+ recommended)
- npm or yarn
- OpenAI API key

#### Backend Setup

```bash
cd backend
npm install
# Configure your OpenAI API key in .env
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

### 🔧 Configuration

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_api_key_here
```

### 📝 API Endpoints

- `GET /health` - Health check
- `POST /api/gatsby/ask` - Send message to Gatsby
- `GET /api` - API documentation
