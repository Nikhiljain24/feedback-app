// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StopWatch from "./components/stopWatch/StopWatch";
import FetchData from "./components/fetchData/FetchData";
import Dashboard from "./components/dashboard/Dashboard";
import FeedbackFeed from "./components/feedback/FeedbackFeed";
import LoginPage from "./components/auth/LoginPage";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard route */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          {/* Nested routes inside the dashboard */}
          <Route index element={<FeedbackFeed />} />
          <Route path="stopwatch" element={<StopWatch />} />
          <Route path="fetchapi" element={<FetchData />} />
          <Route path="feedback" element={<FeedbackFeed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
