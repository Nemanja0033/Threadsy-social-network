import { collection, getDocs, query, orderBy} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { db } from '../../firebaseconfig';
import PostCard from '../post/PostCard';
import { useAnimation } from '../../helpers/useAnimation';

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

  useAnimation(feedRef);

  return (
    <div className='flex justify-center'>
      <div ref={feedRef} className='flex justify-center md:w-1/2 w-full'>
        <div className='flex-row w-full h-full md:mt-6 mt-0  bg-white rounded-md shadow-md'>
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
    </div>
  );
};

export default Feed;
