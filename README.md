# AI/ML Portfolio Website

A modern, responsive portfolio website built with React and Vite, showcasing AI/ML projects and skills.

## Features

- 🎨 Light/Dark theme toggle with localStorage persistence
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 📧 Contact form integration with Formspree
- 🔧 Easy content management via JSON files

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/     # React components
├── context/        # React context (theme management)
├── data/          # JSON configuration files
├── hooks/         # Custom React hooks
├── styles/        # Global styles and CSS variables
├── assets/        # Static assets (images, resume)
├── App.jsx        # Main app component
└── main.jsx       # Entry point
```

## Configuration

### Personal Information
Edit `src/data/personal.json` to update your name, bio, social links, and contact information.

### Projects
Edit `src/data/projects.json` to add or modify your projects.

### Skills
Edit `src/data/skills.json` to update your technical skills.

## Deployment

This project can be deployed to:
- Vercel (recommended)
- Netlify
- GitHub Pages

## License

MIT
