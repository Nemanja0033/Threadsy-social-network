import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/nav/Navbar";
import { AuthProvider } from "./context/authContext";
import { LikeProvider } from "./context/LikeContext";
import { CommentProvider } from "./context/CommentContext";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
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
          </Router>
        </CommentProvider>
      </LikeProvider>
    </AuthProvider>
  );
};

export default App;
