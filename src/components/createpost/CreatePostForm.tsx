import { useEffect, useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useAnimation } from "../../hooks/useAnimation";

const CreatePostForm = () => {
  let navigate = useNavigate();

  const [postData, setPostData] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const newPostRef = useRef<HTMLDivElement | null>(null);
  const { isAuth } = useAuth();

  const postsCollectionRef = collection(db, "posts");
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postData,
      author: {
        name: auth.currentUser?.displayName, 
        id: auth.currentUser?.uid 
      },
      date: new Date().toLocaleString('en-US', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      }),
      likes: {
        count: 0,
        users: [],
      },
      createdAt: serverTimestamp(), 
    });
    navigate('/');
  };

  useEffect(() => {
    document.title = 'Dev Talks | Create a New Post';
  }, []);

  useAnimation(newPostRef);

  return (
    <>
      {isAuth ? (
        <div ref={newPostRef} className="md:w-1/3 md:h-[70vh] h-[100vh] w-full md:mt-20 flex justify-center justify-self-center items-star shadow-md rounded-md">
          <div className="flex-row md:mt-12 mt-44">
            <div className="flex justify-center items-center mb-6">
              <h1 className="md:text-xl text-3xl font-semibold">Create A Post</h1>
            </div>
            <div className="flex-row">
              <input className="border-gray-700 h-7 border bg-transparent rounded shadow-sm w-full" placeholder="Post Title . . ." type="text" onChange={(e) => {setTitle(e.target.value)}} />
              <textarea className="border-gray-700 border bg-transparent rounded shadow-sm w-full md:h-44 h-96 mt-6" placeholder="Post Text . . ." onChange={(e) => {setPostData(e.target.value)}} />
              <button onClick={createPost} className="btn btn-accent w-full text-white" >Submit</button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-semibold text-center text-4xl mt-32">Please Login</h1>
          <div className="flex justify-center mt-6">
            <Link to={'/login'}>Click Here To Login</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostForm;
