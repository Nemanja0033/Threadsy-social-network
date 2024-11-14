import { query, where, getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { auth, db } from "../../firebaseconfig";
import { Heart } from "lucide-react";

const Sidebar = () => {

    const { isAuth, userName } = useAuth();
    const [userDetails, setUserDetails] = useState<any[]>([])

    const postsCollectionRef = collection(db, "posts")

    useEffect(() => {
        const getUserDetails = async () => {
          const q = query(postsCollectionRef, where("author.id", "==", auth.currentUser?.uid));
          const data = await getDocs(q);
          setUserDetails(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
    
        getUserDetails();
      }, [])
    

      return (
        <div >
          {isAuth ? (
            <div className="w-60 mr-44 mt-14 h-72 rounded-xl shadow-md flex justify-center">
              <div className="w-full">
                <h1 className="text-center text-sm text-gray-400">User Summary</h1>
                <h1 className="text-gray-500 text-center text-xl mb-6 mt-1">
                  {userName}
                </h1>
                <p className="text-gray-400 text-sm text-center">Post Titles</p>
                <div className="overflow-auto min-h-9 mt-3 max-h-32 w-full shadow-sm">
                  {userDetails.length > 0 ? (
                    userDetails.map((user, index) => (
                      <h1 key={index} className="text-center flex gap-1 justify-center  ">
                        {user.title} <Heart size={12} strokeWidth={2} /> {user.likes.count}
                      </h1>
                    ))
                  ) : (
                    <h1 className="text-center">No posts found</h1>
                  )}
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      );
    }      

export default Sidebar