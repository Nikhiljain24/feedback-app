# Feedback Social Media Platform

A modern, scalable feedback application designed for capturing, managing, and interacting with user feedback. Built as a monorepo containing a full-stack architecture with a React frontend and a FastAPI backend.

## 🚀 Key Features

*   **User Authentication**: Secure signup and login powered by JWT authentication (OAuth2 Password Bearer).
*   **Feedback Management**: Users can submit feature requests, bug reports, and general enhancements.
*   **Interactive Feed**: A responsive dashboard to browse, categorize (Feature, Bug, Enhancement), and filter feedback.
*   **Upvoting System**: Users can upvote feedback to bubble up the most requested features.
*   **Global State Management**: Powered by Redux Toolkit for seamless state updates and tracking.

## 🛠️ Tech Stack

### Frontend
*   **React** (with Vite for blazing fast build and HMR)
*   **TypeScript** (for type safety and maintainability)
*   **Ant Design** (for premium, responsive UI components)
*   **Redux Toolkit** (for global state management)

### Backend
*   **FastAPI** (High-performance Python web framework)
*   **Pydantic** (Data validation and serialization)
*   **RESTful API** structured with FastAPI's `APIRouter` pattern.
*   In-memory data store for quick demonstration (easily extensible to PostgreSQL/MySQL via SQLAlchemy).

## 📂 Project Structure (Monorepo)

```text
FeedbackApp/
├── fastapi-server/       # Backend service
│   ├── app/              # Core FastAPI application
│   │   ├── routers/      # Separated API routes (auth, feedback)
│   │   ├── main.py       # FastAPI application entry point
│   │   ├── schemas.py    # Pydantic models for data validation
│   │   └── auth.py       # Authentication utilities and JWT handlers
│   └── requirements.txt  # Python dependencies
├── src/                  # Frontend application
│   ├── components/       # React UI components (auth, dashboard, feedback)
│   ├── redux/            # Redux store and slices
│   ├── services/         # Centralized API service for frontend-backend communication
│   ├── App.tsx           # Main React component
│   └── main.tsx          # Application entry point
├── package.json          # Node.js dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## 💻 Getting Started

### Prerequisites

*   Node.js (v18+)
*   Python (3.9+)

### 1. Start the Backend (FastAPI)

Navigate to the `fastapi-server` directory, install dependencies, and start the server.

```bash
cd fastapi-server
# Optional: Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn passlib[bcrypt] python-jose[cryptography] python-multipart

# Start the server
uvicorn app.main:app --reload --port 8000
```
> The API will be running at `http://localhost:8000`. You can view the interactive Swagger documentation at `http://localhost:8000/docs`.

### 2. Start the Frontend (React + Vite)

Open a new terminal, navigate to the root directory of the project, install dependencies, and start the frontend.

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
> The frontend application will be running at `http://localhost:5173`.

## 📈 Future Enhancements

*   **Database Integration**: Replace the in-memory store with an SQL database (e.g., PostgreSQL using SQLAlchemy).
*   **User Profiles**: Add personalized user profiles and feedback history.
*   **Commenting System**: Allow threaded discussions on feedback items.
*   **Dark Mode**: Implement a global dark mode toggle.

## 🚀 Future Roadmap

*   **Guest Mode**: Allow unauthenticated users to view the feed with 'read-only' permissions.
*   **AI Integration**: Add a 'Refine with AI' button using a small LLM (like Phi or Ollama) to polish feedback descriptions.
*   **Database Migration**: Move from in-memory storage to a persistent PostgreSQL database.

## 📄 License
This project is licensed under the MIT License.
