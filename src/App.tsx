import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/nav/Navbar";
import { AuthProvider } from "./context/authContext";
import { LikeProvider } from "./context/LikeContext";
import { CommentProvider } from "./context/CommentContext";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import ScreenLoader from "./components/loader/ScreenLoader";
import SmNavbar from "./components/nav/SmNavbar";

const App = () => {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const screenLoader = () => {
      setLoading(false)
    }

    setTimeout(screenLoader, 400)
  })

  if(loading){
    return(
      <ScreenLoader />
    )
  }
 
  return (
    <AuthProvider>
      <LikeProvider>
        <CommentProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:authorID" element={<ProfilePage />} />
            </Routes>
            <SmNavbar />
          </Router>
        </CommentProvider>
      </LikeProvider>
    </AuthProvider>
  );
};

export default App;
