import { Heart, MessageSquare } from "lucide-react";
import { PostCardType } from "../../types/PostCardType";
import { useLikeContext } from "../../actions/LikeContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebaseconfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchUserNamesFromPosts from "../../helpers/getUserNames";

const PostCard = ({ title, postData, author, date, id, likes, authorID }: PostCardType) => {
  const [likesState, setLikesState] = useState<number>(likes.count); 
  const [userHasLiked, setUserHasLiked] = useState<boolean>(likes.users.includes(auth.currentUser?.uid));
  const [userNames, setUserNames] = useState<string[]>([]);
  const { toggleLike } = useLikeContext();
  const currentUser = auth.currentUser?.uid;

  const handleLike = async () => {
    const postRef = doc(db, "posts", id);
    let newLikesCount = likesState;

    if (userHasLiked) {
      await updateDoc(postRef, {
        "likes.count": likesState - 1,
        "likes.users": arrayRemove(currentUser),
      });
      newLikesCount -= 1;
      setUserHasLiked(false);
    } else {
      await updateDoc(postRef, {
        "likes.count": likesState + 1,
        "likes.users": arrayUnion(currentUser),
      });
      newLikesCount += 1;
      setUserHasLiked(true);
    }

    setLikesState(newLikesCount); 
    toggleLike(id); 
  };

  useEffect(() => {
    const getUserNames = async () => {
      if (likes.users.length > 0) {
        const names = await fetchUserNamesFromPosts(likes.users);
        setUserNames(names);
      } else {
        setUserNames(['No likes yet']);
      }
    };

    getUserNames();
  }, [likes.users]); 

  useEffect(() => {
    setLikesState(likes.count);
    setUserHasLiked(likes.users.includes(currentUser));
  }, [likes.count, likes.users, currentUser]);

  const openModal = () => {
    const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[600px] mt-6 ml-0 mr-0 flex-row rounded-xl border border-gray-100">
        <div>
          <Link to={`/profile/${authorID}`}><h1 className="text-md font-semibold text-start ml-3 mt-3">@{author}</h1></Link>
          <h1 className="text-sm text-start text-gray-400 ml-3">{date}</h1>
        </div>
        <h1 className="text-2xl ml-3 font-semibold text-center mb-3">{title}</h1>
        <div className="md:overflow-auto overflow-hidden max-h-44 min-h-12 w-full ml-1 mr-1 rounded text-center shadow-sm">
          {postData}
        </div>
        <div className="w-full h-7 bg-white rounded flex justify-center gap-8 shadow-sm items-center">
          <div className="flex items-center gap-1">
            <Heart
              className={`cursor-pointer hover:text-red-500 ${userHasLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            />
            
            <button onClick={openModal}>{likesState}</button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Likes</h3>
                <p className="py-4">{userNames.join('; ')}</p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

          </div>
          <MessageSquare className="cursor-pointer hover:text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
