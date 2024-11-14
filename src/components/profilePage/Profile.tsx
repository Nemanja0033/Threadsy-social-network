import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { db } from '../../firebaseconfig';
import PostCard from '../post/PostCard';

const Profile = () => {
  const { authorID } = useParams<{ authorID: string }>();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold mt-3">Author Profile</h1>
      <h1 className="text-center text-xl font-semibold text-gray-400">Posts</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
       <div className="flex justify-center justify-self-center md:w-1/2 w-full">
         <div className="flex-row md:w-full w-full md:h-[86vh] h-screen md:overflow-auto md:mt-6 mt-0 overflow-auto bg-white rounded-md shadow-md">
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
