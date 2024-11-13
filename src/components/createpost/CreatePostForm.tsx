import { useEffect, useRef, useState } from "react"
import gsap from "gsap";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const CreatePostForm = () => {
  let navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [postData, setPostData] = useState<string>("");
  const newPostRef = useRef(null);
  const { isAuth } = useAuth();

  const postsCollectionRef = collection(db, "posts")
  const createPost = async () => {
    await addDoc(postsCollectionRef, 
      { title, postData, author: {
        name: auth.currentUser?.displayName , 
        id: auth.currentUser?.uid 
      },
        date: new Date().getTime()
    });
      navigate('/');
  }

useEffect(() => {
  document.title = 'Dev Talks | Create a New Post'
}, [])

useEffect(() => {
  gsap.from(newPostRef.current, { opacity: 0, x: 50 });
  gsap.to(newPostRef.current, { opacity: 1, x: 0, delay: 0.5 });
}, []);


  return (
    <>
      {isAuth ? (
        <div ref={newPostRef} className="md:w-1/3 md:h-[70vh] h-[100vh] w-full md:mt-20 rounded flex justify-center justify-self-center items-start bg-white shadow-md">
        <div className="flex-row md:mt-12 mt-44">
          <div className="flex justify-center items-center mb-6">
            <h1 className="md:text-xl text-3xl font-semibold">Create A Post</h1>
          </div>
          <div className="flex-row">
            <input className="border rounded shadow-sm w-full md:h-auto h-12" type="text" placeholder="Post Title . . . " onChange={(e) => {setTitle(e.target.value)}} />
            <textarea className="border rounded shadow-sm w-full md:h-44 h-96 mt-6" placeholder="Post Text . . ." onChange={(e) => {setPostData(e.target.value)}} />
            <button onClick={createPost} className="flex justify-center mt-3 border w-full md:h-auto h-12 rounded text-xl hover:shadow-md hover:bg-gray-100">Submit</button>
          </div>
        </div>
      </div>
      )
      :
      (
        <div>
          <h1 className="font-semibold text-center text-4xl mt-32">Please Login</h1>
          <div className="flex justify-center mt-6">
              <Link to={'/login'}>Click Here To Login</Link>
          </div>
        </div>
      )
      }
    </>
  )
}

export default CreatePostForm