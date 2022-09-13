import { useState } from "react";
import "./styles/App.css";
import "./styles/style.scss";
import "./styles/media-query.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { About, AddEditBlog, Auth, Detail, Home, NotFound } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [active, setActive] = useState("home");
  return (
    <>
      <ToastContainer position="top-center" />
      <Header active={active} setActive={setActive} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<AddEditBlog />} />
        <Route path="/update/:id" element={<AddEditBlog />} />
        <Route path="/login" element={<Auth setActive={setActive} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
