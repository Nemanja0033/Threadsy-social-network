import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";
import { auth, db } from '../../firebaseconfig';
import PostCard from '../post/PostCard';
import gsap from "gsap";
import { useAuth } from "../../context/authContext";

const Profile = () => {
  const { authorID } = useParams<{ authorID: string }>();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const { isAuth } = useAuth() ;
  const [loading, setLoading] = useState<boolean>(true);
  const porfileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const getUserPosts = async () => {
      setLoading(true);
      const postsCollectionRef = collection(db, "posts");
      const q = query(postsCollectionRef, where("author.id", "==", authorID));
      const data = await getDocs(q);
      setUserPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };

    if (authorID) {
      getUserPosts();
    }
  }, [authorID]);
  
  useEffect(() => {
    gsap.from(porfileRef.current, { opacity: 0, y: 50 });
    gsap.to(porfileRef.current, { opacity: 1, y: 0, delay: 0.1 });
  }, []);

  return (
    <div ref={porfileRef}>
      {authorID === auth.currentUser?.uid && isAuth ? (
        <h1 className="text-center text-2xl mt-6 font-semibold">My Profile</h1>
      )
      :
      (
        <h1 className="text-center text-2xl mt-6 font-semibold">Author Profile</h1>
      )
    }
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
       <div className="flex justify-center justify-self-center md:w-1/2 w-full">
         <div className="flex-row md:w-full w-full h-full md:mt-6 mt-0  rounded-md shadow-md">
          {userPosts.length === 0 ? (
            <div className="text-center text-xl font-bold mt-5">No posts to show</div>
          ) : (
            userPosts.map(post => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                postData={post.postData}
                author={post.author.name}
                date={post.date.toString()}
                likes={post.likes} authorID={""}              
                />
            ))
          )}
        </div>
       </div>
      )}
    </div>
  );
};

export default Profile;
