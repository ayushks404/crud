import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Todo from "./pages/todo";

function App() {

  const KEY = "token";

  const token = localStorage.getItem(KEY);
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
