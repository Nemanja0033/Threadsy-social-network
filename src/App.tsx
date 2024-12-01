import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/nav/Navbar";
import { LikeProvider } from "./context/LikeContext";
import { CommentProvider } from "./context/CommentContext";
import ProfilePage from "./pages/ProfilePage";
import { useEffect, useState } from "react";
import ScreenLoader from "./components/loader/ScreenLoader";
import SmNavbar from "./components/nav/SmNavbar";
import { useAuth } from "./context/authContext";

const App = () => {
  const { isAuth } = useAuth();
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
      <LikeProvider>
        <CommentProvider>
          <Router>
            {isAuth ? <Navbar /> : ''}
            <Routes>
              <Route path="/" element={isAuth ? <Home /> : <Login />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:authorID" element={<ProfilePage />} />
            </Routes>
            <SmNavbar />
          </Router>
        </CommentProvider>
      </LikeProvider>
  );
};

export default App;
