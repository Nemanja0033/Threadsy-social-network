import { CirclePlus, House, LogOut, User, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import ThemeToggler from "./ThemeToggler";
import { auth } from "../../firebaseconfig";

const Navbar = () => {
  const { isAuth, setIsAuth } = useAuth();
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
    location.reload();
  };

  const handleClick = () => {
    window.location.href = '/'
  }

  return (
    <div className="w-full bg-base-100 flex justify-between items-center h-[60px] sticky top-0 z-50 shadow-md  rounded-md">
      <div className="md:ml-32 ml-3 flex items-center cursor-pointer">
        <img onClick={handleClick} src="/logo/logo.png" className="md:w-1/4 w-1/5" alt="logo" />
        <h1 onClick={handleClick} className="font-semibold cursor-pointer">DevTalks</h1>
      </div>
      <div className="md:mr-32 mr-3 flex md:gap-8 gap-4 relative items-center">
        <Link to={'/'}><House className="hover:text-primary" /></Link>

        {isAuth ? (
          <div className="relative flex">
          <button onClick={handleToggleCreateModal}>
            <CirclePlus className="hover:text-primary" />
          </button>

          {showCreateModal && (
            <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 border shadow-lg p-2 rounded-md md:w-32 w-20 z-10">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
              <Link 
                to="/createpost" 
                className="text-center flex justify-center mt-2 hover:bg-gray-100"
                onClick={() => setShowCreateModal(false)}
              >
                Create New Post
              </Link>
            </div>
          )}
        </div>
        )
        :
        (
          ''
        )
      
      }

        <div className="flex">
          <button onClick={handleToggleUserModal}>
            {isAuth ? <LogOut className="hover:text-primary" /> : <User className="hover:text-primary" />}
          </button>

          <div className="md:ml-6 ml-3 md:hidden flex">
            <Link to={`/profile/${auth.currentUser?.uid}`}><UserIcon /></Link>
          </div>

          <div className="md:ml-6 ml-3">
            <ThemeToggler />
          </div>

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
