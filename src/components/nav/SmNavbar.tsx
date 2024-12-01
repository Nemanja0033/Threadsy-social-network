import { CirclePlusIcon, Home, User } from "lucide-react"
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseconfig";

const SmNavbar = () => {
    const { isAuth } = useAuth();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleToggleCreateModal = () => {
        setShowCreateModal(!showCreateModal);
    };
    
  return (
    <div className={`md:hidden ${!isAuth ? 'hidden' : 'fixed'} bottom-0 z-50 bg-base-100 w-full h-[70px] flex justify-around items-center gap-4`}>
        <Link to={'/'}>
            <Home className="cursor-pointer hover:text-primary" />
        </Link>
        <CirclePlusIcon className="cursor-pointer hover:text-primary" onClick={isAuth ? handleToggleCreateModal : undefined} />
        {showCreateModal && (
            <div className="absolute bottom-[40px] left-1/2 transform bg-base-100 -translate-x-1/2 border shadow-lg p-2 rounded-md md:w-32 w-20 z-10">
              <Link 
                to="/createpost" 
                className="text-center flex justify-center mt-2 hover:bg-gray-100"
                onClick={() => setShowCreateModal(false)}
              >
                Create New Post
              </Link>
            </div>
          )}
      <Link to={`${isAuth ? `/profile/${auth.currentUser?.uid}` : '/'}`}>
        <User className="cursor-pointer hover:text-primary" />
      </Link>
    </div>
  )
}

export default SmNavbar