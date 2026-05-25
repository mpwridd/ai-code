# AI Code Generator

A beautiful, production-ready AI code generator powered by Mimo V2.5 Pro. Generate clean, production-ready code from natural language descriptions with support for 8 programming languages.

![AI Code Generator](https://img.shields.io/badge/AI-Code%20Generator-6366f1?style=for-the-badge&logo=vercel&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## ✨ Features

- 🚀 **Code Generation** - Describe what you want in natural language
- 📖 **Code Explanation** - Paste code and get detailed explanations
- 🎨 **8 Languages** - Python, JavaScript, TypeScript, Solidity, Rust, Go, Java, C++
- 🌊 **Streaming Output** - Watch code generate in real-time
- 📋 **Copy to Clipboard** - One-click copy with visual feedback
- 📥 **Download Code** - Save generated code as files
- 📜 **Generation History** - Access past generations with local storage
- 🌙 **Dark/Light Mode** - Beautiful themes for any preference
- 🎯 **Syntax Highlighting** - Full Prism.js highlighting with line numbers
- ⌨️ **Keyboard Shortcuts** - ⌘+Enter to generate
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎭 **Beautiful UI** - Modern code editor aesthetic

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI Model:** Mimo V2.5 Pro (OpenAI-compatible)
- **Syntax Highlighting:** react-syntax-highlighter (Prism)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Hooks + Local Storage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-code.git
cd ai-code
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API configuration:
```env
MIMO_API_BASE_URL=http://100.91.112.121:8317/v1
MIMO_API_KEY=your-api-key-here
MIMO_MODEL=Mimo-V2.5-Pro
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-code/
├── app/
│   ├── api/
│   │   ├── generate/
│   │   │   └── route.ts      # Code generation API endpoint
│   │   └── explain/
│   │       └── route.ts      # Code explanation API endpoint
│   ├── globals.css           # Global styles & CSS variables
│   ├── layout.tsx            # Root layout with fonts
│   └── page.tsx              # Main page component
├── components/
│   ├── Header.tsx            # App header with branding
│   ├── ModeToggle.tsx        # Generate/Explain mode switch
│   ├── LanguageSelector.tsx  # Language dropdown selector
│   ├── CodeInput.tsx         # Text input for prompts/code
│   ├── CodeOutput.tsx        # Output display with states
│   ├── CodeBlock.tsx         # Syntax highlighted code block
│   ├── HistorySidebar.tsx    # Generation history panel
│   ├── ThemeToggle.tsx       # Dark/light mode toggle
│   ├── LoadingSpinner.tsx    # Animated loading indicator
│   └── EmptyState.tsx        # Empty state with suggestions
├── hooks/
│   ├── useCodeGenerator.ts   # Code generation logic hook
│   ├── useLocalStorage.ts    # Persistent storage hook
│   └── useTheme.ts           # Theme management hook
├── lib/
│   ├── mimo.ts               # Mimo API client configuration
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Utility functions
├── .env.example              # Environment variables template
├── .env.local                # Local environment variables
├── .gitignore                # Git ignore rules
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🎨 Features in Detail

### Code Generation
Describe what you want to build in natural language, and the AI generates clean, production-ready code. Examples:
- "Create a REST API with Express.js and JWT authentication"
- "Write a binary search algorithm with error handling"
- "Build a React hook for infinite scrolling"
- "Create an ERC-20 Solidity smart contract"

### Code Explanation
Paste any code snippet and get a detailed explanation of:
- What the code does
- Key concepts and patterns used
- Line-by-line breakdown of complex sections
- Potential improvements and best practices

### Supported Languages
| Language | Icon | Use Cases |
|----------|------|-----------|
| Python | 🐍 | Scripts, data science, ML, web backends |
| JavaScript | ⚡ | Web apps, Node.js, React, Vue |
| TypeScript | 🔷 | Type-safe JS, enterprise apps |
| Solidity | ⛓️ | Ethereum smart contracts, DeFi |
| Rust | 🦀 | Systems programming, WebAssembly |
| Go | 🐹 | Microservices, CLI tools, cloud |
| Java | ☕ | Enterprise apps, Android, Spring |
| C++ | ⚙️ | Performance-critical, games, embedded |

### History Management
- Automatically saves all generations to local storage
- Quick access to past generations
- Copy code directly from history
- Clear individual items or entire history
- Collapsible sidebar for more workspace

### Keyboard Shortcuts
- `⌘ + Enter` / `Ctrl + Enter` - Generate code
- Click any history item to restore it

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Docker

```bash
docker build -t ai-code .
docker run -p 3000:3000 ai-code
```

### Self-Hosted

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Mimo V2.5 Pro](https://mimo.ai/) - AI model
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Prism.js](https://prismjs.com/) - Syntax highlighting

---

Built with ❤️ using Mimo V2.5 Pro
