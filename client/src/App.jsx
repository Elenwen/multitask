import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AccountActivated from "./pages/AccountActivated";
import Task from "./pages/Task";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-activated" element={<AccountActivated />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
