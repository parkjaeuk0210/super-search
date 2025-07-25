# 🚀 Super Search - AI-Powered Search with Neural UI

An AI-powered search engine with a stunning neural interface built with React, Express.js, and Google Gemini 2.0.

![Super Search Banner](https://img.shields.io/badge/AI-Powered%20Search-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript)
![Gemini](https://img.shields.io/badge/Gemini-2.0-orange?style=for-the-badge&logo=google)

## ✨ Features

### 🎨 Neural UI Design
- **Holographic Glass Morphism** - Futuristic translucent effects
- **Interactive Particle System** - Real-time canvas animations that respond to mouse
- **3D Layered Cards** - Depth and parallax effects on search results
- **Dynamic Gradients** - Time-based color themes
- **Voice Search** - Built-in speech recognition
- **Smooth Animations** - Framer Motion powered transitions

### 🤖 AI Capabilities
- **Google Gemini 2.0 Flash** - Latest AI model integration
- **Real-time Web Search** - Live web data with source citations
- **Conversational Follow-ups** - Continue conversations in context
- **Smart Summaries** - AI-generated comprehensive answers

### 🛠️ Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Express.js + TypeScript
- **AI**: Google Gemini 2.0 Flash API
- **UI Components**: Radix UI (shadcn/ui)
- **State Management**: TanStack Query

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Google Cloud account with Gemini API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/parkjaeuk0210/super-search.git
cd super-search
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## 🎮 Usage

1. **Search**: Type your query in the neural search input
2. **Voice Search**: Click the microphone icon to speak your query
3. **Follow-up**: After results appear, ask follow-up questions
4. **Explore**: Use suggested queries for inspiration

## 🏗️ Architecture

```
super-search/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Route pages
│   │   └── lib/         # Utilities
├── server/              # Express backend
│   ├── routes.ts        # API endpoints
│   └── env.ts           # Environment config
└── db/                  # Database schemas
```

## 🎨 UI Components

### Neural Search Input
- Glass morphism design with animated glow
- Voice search integration
- Real-time particle effects
- Loading animations

### Holographic Result Cards
- 3D layered design
- Scroll-based parallax
- Source verification badges
- Interactive hover states

### Neural Background
- Canvas-based particle system
- Mouse interaction physics
- Gradient orb animations
- Performance optimized

## 📝 API Reference

### Search Endpoint
```
GET /api/search?q={query}
```

### Follow-up Endpoint
```
POST /api/follow-up
{
  "sessionId": "xxx",
  "query": "follow-up question"
}
```

## 🔧 Configuration

### Environment Variables
- `GOOGLE_API_KEY` - Your Google Gemini API key
- `NODE_ENV` - Development or production mode

### Customization
- Colors: Edit `tailwind.config.ts`
- Animations: Modify component files
- Particles: Adjust in `NeuralBackground.tsx`

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Docker Support
```dockerfile
# Coming soon
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original project by [@ammaar](https://x.com/ammaar)
- UI redesign and enhancements by [@parkjaeuk0210](https://github.com/parkjaeuk0210)
- Powered by Google Gemini 2.0
- Built with React and Express.js

## 📧 Contact

Park Jaeuk - [@parkjaeuk0210](https://github.com/parkjaeuk0210)

Project Link: [https://github.com/parkjaeuk0210/super-search](https://github.com/parkjaeuk0210/super-search)

---

**Note**: Remember to get your Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey) before running the project.
