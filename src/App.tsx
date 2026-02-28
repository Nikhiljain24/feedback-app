// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import StopWatch from "./components/stopWatch/StopWatch";
import FetchData from "./components/fetchData/FetchData";
import Dashboard from "./components/dashboard/Dashboard";
import FeedbackFeed from "./components/feedback/FeedbackFeed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard route */}
        <Route path="/" element={<Dashboard />}>
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
