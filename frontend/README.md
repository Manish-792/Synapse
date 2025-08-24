# AI Agent Frontend

A stunning React frontend for the AI chat agent with modern animations, glassmorphism design, and seamless user experience.

## Features

- 🎨 **Glassmorphism UI**: Beautiful liquid glass design with backdrop blur effects
- ✨ **GSAP Animations**: Smooth, professional animations throughout the interface
- 🎯 **Parallax Effects**: Dynamic background elements that respond to scroll
- 💬 **Real-time Chat**: Seamless communication with the AI agent
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎭 **Loading States**: Beautiful loading indicators and transitions

## Technologies Used

- **React 18** with Vite for fast development
- **Tailwind CSS** for styling and responsive design
- **GSAP** for professional animations
- **Modern ES6+** JavaScript features

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on port 3001

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the frontend directory:
   ```
   VITE_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── LandingSection.jsx    # Hero section with animations
│   │   └── ChatSection.jsx       # Main chat interface
│   ├── App.jsx                   # Main application component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles and Tailwind
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
└── vite.config.js               # Vite configuration
```

## Key Components

### LandingSection
- Hero section with dramatic entrance animations
- Parallax background effects
- Call-to-action button with smooth scroll
- Feature highlights with animated indicators

### ChatSection
- Glassmorphism chat container
- Real-time message animations
- Loading states and error handling
- Responsive message layout
- Clear chat functionality

## Styling

The application uses a sophisticated styling approach:

- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur
- **Gradient Text**: Beautiful gradient text effects
- **Custom Animations**: Tailwind and GSAP animations
- **Responsive Design**: Mobile-first approach with breakpoints

## API Integration

The frontend communicates with the backend API:

- **Endpoint**: `${VITE_API_URL}/chat`
- **Method**: POST
- **Request Body**: `{ message: string, history: array }`
- **Response**: `{ success: boolean, finalResponse: string, history: array }`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:3001)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size with Vite
- Lazy loading for better performance
- Efficient animations with GSAP
- Responsive images and assets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC
