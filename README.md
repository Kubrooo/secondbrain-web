# SecondBrain Web Client

The frontend user interface for the SecondBrain application. This Single Page Application (SPA) is built with React and Vite, featuring a minimalist design system powered by Tailwind CSS.

**Live Demo:** https://secondbrain-web-theta.vercel.app/

## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v3)
- **Routing:** React Router DOM
- **Testing:** Vitest & React Testing Library
- **Deployment:** Vercel

## Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository
   git clone <your-frontend-repo-url>
   cd secondbrain-web

2. Install dependencies
   npm install

3. Start the development server
   npm run dev

The application will run at http://localhost:5173.

## Available Scripts

- npm run dev
  Starts the development server with Hot Module Replacement (HMR).

- npm run build
  Builds the app for production to the "dist" folder.

- npm run preview
  Locally preview the production build.

- npm test
  Runs unit tests using Vitest.

- npm run lint
  Runs ESLint to check for code quality issues.

## Project Structure
```bash
secondbrain-web/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page views (Home, AddNote)
│   ├── App.jsx        # Main layout and routing logic
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles and Tailwind directives
├── .github/workflows  # CI/CD configurations
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies and scripts
```
## Backend Integration

This frontend is designed to consume the SecondBrain API. Ensure the backend server is running locally on port 3000 (default) during development to enable data persistence features.

## License

This project is for educational purposes.
