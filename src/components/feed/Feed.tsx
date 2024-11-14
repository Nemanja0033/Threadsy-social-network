import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '../../firebaseconfig';
import PostCard from '../post/PostCard';
import gsap from 'gsap';

const Feed = () => {
  const [postList, setPostList] = useState<any[]>([]);
  const feedRef = useRef(null);

  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const q = query(postsCollectionRef, orderBy("createdAt", "desc"));
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [postList]); 

  useEffect(() => {
    gsap.from(feedRef.current, { opacity: 0, y: 50 });
    gsap.to(feedRef.current, { opacity: 1, y: 0, delay: 0.1 });
  }, []);

  return (
    <>
      <h1 className='text-center text-2xl font-semibold mt-3'>Feed</h1>
      <div ref={feedRef} className='flex justify-center'>
        <div className='flex-row md:w-1/2 w-full md:h-[86vh] h-screen md:overflow-auto md:mt-6 mt-0 overflow-auto bg-white rounded-md shadow-md'>
          {postList.length == 0 ? (
            <div className='flex justify-center'>
             <span className="loading loading-spinner loading-md"></span>
            </div>
          )
          :
          (
            postList.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                postData={post.postData}
                author={post.author.name}
                date={post.date.toString()}
                likes={post.likes}
                authorID={post.author.id}
              />
            ))
          )
        }
        </div>
      </div>
    </>
  );
};

export default Feed;
