import "./App.css";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import EditPage from "./pages/EditPage";

function App() {
  const [loding, setLoading] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    document.documentElement.setAttribute("data-theme", theme);

    setLoading(false);
  }, []);
  if (loding) {
    return (
      <>
        <div className="flex justify-center items-center h-screen w-full bg-black ">
          <span className="loading loading-infinity loading-md"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
