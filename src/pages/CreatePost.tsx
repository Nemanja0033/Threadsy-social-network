import { useEffect, useRef } from "react"
import gsap from "gsap";

const CreatePost = () => {

  const newPostRef = useRef(null);

useEffect(() => {
  document.title = 'Dev Talks | Create a New Post'
}, [])

useEffect(() => {
  gsap.from(newPostRef.current, { opacity: 0, x: 50 });
  gsap.to(newPostRef.current, { opacity: 1, x: 0, delay: 0.5 });
}, []);


  return (
    <div ref={newPostRef} className="md:w-1/3 md:h-[70vh] h-[100vh] w-full md:mt-20 rounded flex justify-center justify-self-center items-start bg-white shadow-md">
      <div className="flex-row md:mt-12 mt-44">
        <div className="flex justify-center items-center mb-6">
          <h1 className="md:text-xl text-3xl font-semibold">Create a New Post</h1>
        </div>
        <div className="flex-row">
          <input className="border rounded shadow-sm w-full md:h-auto h-12" type="text" placeholder="Post Title . . . " />
          <textarea className="border rounded shadow-sm w-full md:h-44 h-96 mt-6" placeholder="Post Text . . ." />
          <button className="border md:w-20 w-44 md:h-auto h-12 rounded text-xl hover:shadow-md hover:bg-gray-100">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost