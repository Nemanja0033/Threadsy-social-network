import { query, where, getDocs, collection } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/authContext";
import { auth, db } from "../../firebaseconfig";
import { useAnimation } from "../../hooks/useAnimation";
import { Link } from "react-router-dom";
import { onAuthStateChanged  } from "firebase/auth";

const Sidebar = () => {

    const { isAuth } = useAuth();
    const [userDetails, setUserDetails] = useState<any[]>([])
    const [userName, setUserName] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true)
    const sidebarRef = useRef<HTMLDivElement | null>(null)

    const postsCollectionRef = collection(db, "posts")

    useEffect(() => {
        const getUserDetails = async ({}) => {
          const q = query(postsCollectionRef, where("author.id", "==", auth.currentUser?.uid));
          const data = await getDocs(q);
          const userPosts = data.docs.map(doc => doc.data());
          setUserDetails(userPosts);

          if(userPosts.length > 0){
            setUserName(userPosts[0].author.name)
          }
          setLoading(false);
        };

        const unsubscribe = onAuthStateChanged(auth, (user => {
          if(user){
            getUserDetails(user);
          }
          else{
            setLoading(false);
          }
        }))

        return () => unsubscribe();
      }, []);

      useAnimation(sidebarRef)

      return (
        <div className="md:block hidden">
          {isAuth ? (
            loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <div ref={sidebarRef} className="md:w-60 w-full md:mt-20 md:mr-20 md:ml-12 md:mb-0 mb-6 mt-6 h-72 rounded-xl shadow-md flex justify-center">
                <div className="w-full">
                  <h1 className="text-center text-sm text-gray-400">User Summary</h1>
                  <h1 className="text-gray-500 text-center text-xl mb-6 mt-1">
                    {userName}
                  </h1>
                  <p className="text-gray-400 text-sm text-center">My Posts</p>
                  <div className="overflow-auto min-h-9 mt-3 max-h-32 w-full">
                    {userDetails.length > 0 ? (
                      userDetails.map((user, index) => (
                        <h1 key={index} className="text-center flex gap-1 justify-center">
                          {user.title}
                        </h1>
                      ))
                    ) : (
                      <h1 className="text-center">No Posts To Show</h1>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Link to={`/profile/${auth.currentUser?.uid}`}>
                      <button className="btn btn-sm btn-accent mt-3 text-white">My Profile</button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          ) : (
            ''
          )}
        </div>
      );
      
    }      

export default Sidebar