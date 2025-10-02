import { Card } from "antd";
import { useState } from "react";
// import './App.css'
// import { Button } from 'antd'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const Login = () => {
  return (
    <Card>
      <div>hello</div>
    </Card>
  );
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

