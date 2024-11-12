import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(JSON.parse(localStorage.getItem("isAuth") || "false"));
  const [userName, setUserName] = useState<string>(localStorage.getItem("userName") || "");

  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
    localStorage.setItem("userName", userName);
  }, [isAuth, userName]);

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} userName={userName} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} setUserName={setUserName} />} />
      </Routes>
    </Router>
  );
};

export default App;
