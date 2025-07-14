import "./App.css";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  );
}

export default App;
