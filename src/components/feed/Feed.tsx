import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebaseconfig';
import PostCard from '../post/PostCard';

const Feed = () => {

    const [postList, setPostList] = useState<any[]>([]);

    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
           setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getPosts();
    }, [])

  return (
    <div className='flex justify-center'>
      <div className='flex-row md:w-1/2 w-full md:h-[86vh] h-screen md:overflow-auto md:mt-6 mt-0 overflow-hidden bg-white rounded shadow-md'>
        {postList.map((post) => (
           <PostCard title={post.title} postData={post.postData} author={post.author.name} />
        ))}
      </div>  
    </div>
  )
}

export default Feed