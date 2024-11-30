import { collection, getDocs, query, orderBy} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '../../firebaseconfig';
import PostCard from '../post/PostCard';
import { useAnimation } from '../../hooks/useAnimation';
import Sidebar from '../nav/Sidebar';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import CreatePostFeed from '../createpost/CreatePostFeed';

const Feed = () => {
  const { isAuth } = useAuth()
  const [postList, setPostList] = useState<any[]>([]);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const q = query(postsCollectionRef, orderBy("createdAt", "desc"));
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [postList]); 

  useAnimation(feedRef);

  if(postList.length == 0){
    return <div className='flex justify-center items-center mt-12'>
              <span className="loading loading-spinner loading-lg"></span>
          </div>
  }
  

  return (
    <div className='md:flex flex-row justify-center'>
      <Sidebar />
      <div ref={feedRef} className={`flex justify-center ${isAuth ? 'mr-64' : 'mr-0'} md:w-1/2 w-full`}>
        <div className='flex-row w-full h-auto md:mt-6 mt-0 overflow-auto rounded-md md:shadow-md shadow-none '>
          {!isAuth ? (
            <div className='flex gap-3 justify-center md:mt-3 mt-12'>
              <h1 className='text-center font-semibold text-2xl'>Login to explore more features</h1>
              <Link to={'/login'}>
                <button className="btn btn-sm btn-accent text-white">Login</button>
              </Link>

            </div>
          )
          :
          (
            <div className='md:mt-3 mt-12'>
            <CreatePostFeed />
            </div>
          )
        }
         {
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
              avatar={post.author.id}
            />
          ))
         }
        </div>
      </div>
    </div>
  );
};

export default Feed;
