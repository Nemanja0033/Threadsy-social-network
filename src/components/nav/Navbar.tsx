import { CirclePlus, House, LogOut, User, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import ThemeToggler from "./ThemeToggler";

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
    <div className="w-full bg-base-100 flex md:justify-center items-center h-[60px] sticky top-0 z-50 shadow-md  rounded-md">
      <div className="md:ml-32 ml-3 flex items-center cursor-pointer">
        <img onClick={handleClick} src="/logo/logo.png" className="md:w-1/3 w-1/3" alt="logo" />
      </div>
      <div className={`${isAuth ? 'md:mr-52' : 'md:mr-96'} mr-3 flex md:gap-32 gap-4 relative items-center`}>
        <Link to={'/'}><House className="hover:text-primary hidden md:flex" /></Link>

        {isAuth ? (
          <div className="md:relative hidden md:flex ">
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

          <button onClick={handleToggleUserModal}>
            {isAuth ? <LogOut className="hover:text-primary" /> : <User className="hover:text-primary" />}
          </button>

          {isAuth ? (
            <div className="hidden md:flex">
            <Link to={`/profile/${localStorage.getItem("userID")}`}><UserIcon /></Link>
          </div>
          )
          :
          (
            ''
          )
        }

          <div className="md:ml-6 ml-3 border-l pl-3 border-gray-700">
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
  );
};

export default Navbar;
