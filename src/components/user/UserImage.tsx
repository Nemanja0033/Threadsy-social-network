import { collection, query, where, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebaseconfig';

const UserImage = ( {authorID}: {authorID: any}) => {

    const [userData, setUserData] = useState<any[]>([]);

    useEffect(() => {
        const getUserData = async () => {
          const userDataCollectionRef = collection(db, "users");
          const q = query(userDataCollectionRef, where("userId", "==", authorID));
          const data = await getDocs(q);
          setUserData(data.docs.map(doc =>({ ...doc.data(), id: doc.id}))); 
        }
    
        getUserData();
      }, []);

  return (
    <div>{userData.map((user) => (
        <img key={Math.random()} className='scale-50 rounded-full m-0' src={user.userPhoto} />
    ))}</div>
  )
}

export default UserImage