// src/App.tsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import StopWatch from "./components/stopWatch/StopWatch";
import FetchData from "./components/fetchData/FetchData";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard route */}
        <Route path="/" element={<Dashboard />}>
          {/* Nested routes inside the dashboard */}
          <Route path="stopwatch" element={<StopWatch />} />
          <Route path="fetchapi" element={<FetchData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
