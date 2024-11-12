import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreatePost from "./pages/CreatePost"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost /> } />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App