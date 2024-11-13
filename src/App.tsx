import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/nav/Navbar";
import { AuthProvider } from "./context/authContext";
import { LikeProvider } from "./actions/LikeContext";
import { CommentProvider } from "./actions/CommentContext";

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
            </Routes>
          </Router>
        </CommentProvider>
      </LikeProvider>
    </AuthProvider>
  );
};

export default App;
