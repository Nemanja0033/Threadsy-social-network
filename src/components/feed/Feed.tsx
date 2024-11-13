import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebaseconfig';

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
    <div>

    </div>
  )
}

export default Feed