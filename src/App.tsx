import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/CharactersPage";
import Login from "./pages/login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
