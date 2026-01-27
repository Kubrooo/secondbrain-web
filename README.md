# SecondBrain Web Client

The frontend user interface for the SecondBrain application. This Single Page Application (SPA) is built with React and Vite, featuring a minimalist design system powered by Tailwind CSS.

**Live Demo:** [https://secondbrain-web-theta.vercel.app/](https://secondbrain-web-theta.vercel.app/)

---

## Interface Preview

| **Add New Note** | **Dashboard Home** |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/9415533e-51ad-449b-bf96-7942feaeb52a" width="100%" alt="Home Page"> | <img src="https://github.com/user-attachments/assets/2dc8aedb-9916-4386-bf24-0c975bdf24e6" width="100%" alt="Add Note Page"> |

---

## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v3)
- **Routing:** React Router DOM
- **Deployment:** Vercel

## Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (Node Package Manager)

## Installation

1. **Clone the repository**
   git clone https://github.com/Kubrooo/secondbrain-web.git
   cd secondbrain-web

2. **Install dependencies**
   npm install

3. **Setup Environment**
   Create a .env file in the root directory and add your backend URL:
   VITE_API_URL="your backend url"

4. **Start the development server**
   npm run dev

The application will run at http://localhost:5173.

## Project Structure
```
secondbrain-web/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page views (Home, AddNote, NotFound)
│   ├── App.jsx        # Main layout and routing logic
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles and Tailwind directives
├── .github/workflows  # CI/CD configurations
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies and scripts
```
## Backend Integration

This frontend is designed to consume the **SecondBrain API**. Ensure the backend server is running or the `VITE_API_URL` environment variable is pointing to a valid production server.

## License

This project is for educational purposes.
