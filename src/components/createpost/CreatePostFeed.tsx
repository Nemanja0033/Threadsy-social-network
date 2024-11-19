import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react'
import { useAuth } from '../../context/authContext';
import { db, auth } from '../../firebaseconfig';

const CreatePostFeed = ({}) => {

  const [postData, setPostData] = useState<string>("");
  const { isAuth } = useAuth();

  const postsCollectionRef = collection(db, "posts");
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
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
    location.reload()
  };

  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
    {isAuth ? (
        <div className='flex justify-center gap-2'>
        <input onClick={() => openModal('my_modal_1')}  className='w-[80%] h-12 border bg-transparent rounded-2xl' placeholder='Start a post. . .' onChange={(e) => {setPostData(e.target.value)}} />
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Start Post</h3>
            <div className="modal-action flex items-center">
            <textarea onClick={() => openModal('my_modal_1')}  className='w-[80%] min-h-32 max-h-28 border bg-transparent rounded-xl' placeholder='Start a post. . .' onChange={(e) => {setPostData(e.target.value)}} />
            <button onClick={createPost} className='btn btn-accent text-white'>Post</button>
            </div>
            <form method="dialog">
                <div className='flex justify-center mt-3'>
                <button className='text-gray-700'>Close</button>
                </div>
            </form>
        </div>
        </dialog>
    </div>
    )
    :
    ''
}
    </>
  )
}

export default CreatePostFeed