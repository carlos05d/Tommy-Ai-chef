# Tommy AI Chef Application

## Overview
Tommy AI Chef is a culinary assistant application that helps users with recipe suggestions, meal planning, and cooking guidance. The application features a clean, responsive interface with both light and dark mode support.

## Key Features
- 🍳 AI-powered recipe suggestions
- 💬 Interactive chat interface
- 📚 Recipe history tracking
- ⚙️ User profile management
- 🌙 Dark/light mode toggle
- 📱 Mobile-responsive design

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Next.js (v14 or higher)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Application Structure
```
.
├── app/
│   ├── chat/          # Chat interface with AI chef
│   ├── dashboard/     # Main dashboard
│   ├── history/       # Recipe history
│   ├── profile/       # User profile and settings
│   └── signup/        # User registration
├── components/
│   ├── navbar.tsx     # Bottom navigation bar
│   └── ui/           # UI components
├── public/            # Static assets
└── README.md          # This file
```

## Configuration
The application uses the following environment variables:
- `NEXT_PUBLIC_API_URL` - Base URL for API endpoints
- `NEXT_PUBLIC_AI_SERVICE_KEY` - API key for AI service

Create a `.env.local` file in the root directory to set these variables.

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## Dark Mode
The application supports system-preference dark mode with manual override in profile settings. The toggle is located in the profile page under Settings.

## Troubleshooting
If you encounter issues:
1. Clear browser cache
2. Delete `node_modules` and reinstall dependencies
3. Check console for errors

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
