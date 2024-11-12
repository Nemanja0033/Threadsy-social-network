import { CirclePlus, House, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { isAuth, userName, setIsAuth } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleToggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
    setShowUserModal(false); 
  };

  const handleToggleUserModal = () => {
    setShowUserModal(!showUserModal);
    setShowCreateModal(false); 
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
    localStorage.removeItem("userName");
    setShowUserModal(false);
  };

  const handleClick = () => {
    window.location.href = '/'
  }

  return (
    <div className="w-full bg-white flex justify-between items-center h-[60px] shadow-md relative">
      <div className="md:ml-32 ml-3 flex items-center cursor-pointer">
        <img onClick={handleClick} src="/logo/logo.png" className="md:w-1/4 w-1/5" alt="logo" />
        <h1 onClick={handleClick} className="text-gray-700 font-semibold cursor-pointer">DevTalks</h1>
      </div>
      <div className="md:mr-32 mr-3 flex md:gap-8 gap-4 relative">
        <Link to={'/'}><House className="hover:text-gray-400" /></Link>

        <div className="relative">
          <button onClick={handleToggleCreateModal}>
            <CirclePlus className="hover:text-gray-400" />
          </button>

          {showCreateModal && (
            <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 bg-white border shadow-lg p-2 rounded-md md:w-32 w-20 z-10">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
              <Link 
                to="/createpost" 
                className="text-black text-center flex justify-center mt-2 hover:bg-gray-100"
                onClick={() => setShowCreateModal(false)}
              >
                Create New Post
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={handleToggleUserModal}>
            {isAuth ? <span>{userName}</span> : <User className="hover:text-gray-400" />}
          </button>

          {showUserModal && (
            <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 bg-white border shadow-lg p-2 rounded-md md:w-20 w-12 z-10">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
              {isAuth ? (
                <button onClick={handleLogout} className="text-black text-center flex justify-center mt-2 hover:bg-gray-100">
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="text-black text-center flex justify-center mt-2 hover:bg-gray-100"
                  onClick={() => setShowUserModal(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
