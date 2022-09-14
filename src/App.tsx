import { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/style.scss";
import "./styles/media-query.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Header } from "./components";
import { About, AddEditBlog, Auth, Detail, Home, NotFound } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./services/firebase";
import { signOut, User } from "firebase/auth";

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/auth");
      setActive("login");
    });
  };
  return (
    <>
      <ToastContainer position="top-center" />
      <Header
        active={active}
        setActive={setActive}
        user={user}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<AddEditBlog user={user} />} />
        <Route path="/update/:id" element={<AddEditBlog user={user} />} />
        <Route path="/auth" element={<Auth setActive={setActive} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
