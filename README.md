# Eric Vang's Portfolio

A modern, single-page React portfolio with a work in progress AI-powered chat widget that helps visitors learn about my projects.

## Features

- Dynamic project listing from a backend API
- AI-powered chat widget for project inquiries
- Clean, responsive design
- Real-time semantic search using Hugging Face's sentence transformers

## Tech Stack

### Frontend
- React with Vite
- TypeScript
- Tailwind CSS
- Axios for API calls

### Backend
- Node.js with Express
- SQLite database
- Hugging Face's sentence-transformers for semantic search
- TypeScript

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- A Hugging Face API key

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ericvang/Personal-Website.git
   cd Personal-Website
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

4. Initialize the database:
   ```bash
   npm run build
   node dist/initDb.js
   ```

## Running the Project

1. Start the backend server (from the server directory):
   ```bash
   npm run dev
   ```

2. In a new terminal, start the frontend development server (from the root directory):
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:8080` in your browser

## Development

- Frontend code is in the `src` directory
- Backend code is in the `server/src` directory
- Database schema and sample data are in `server/src/initDb.ts`

## Building for Production

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Build the backend:
   ```bash
   cd server
   npm run build
   ```

The frontend build will be in the `dist` directory, and the backend build will be in `server/dist`.

