import { Heart, MessageSquare, SendHorizontal, Trash } from "lucide-react";
import { PostCardType } from "../../types/PostCardType";
import { useLikeContext } from "../../context/LikeContext";
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseconfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchUserNamesFromPosts from "../../helpers/getUserNames";
import { useAuth } from "../../context/authContext";
import UserImage from "../user/UserImage";

const PostCard = ({ title, postData, author, date, id, likes, authorID }: PostCardType) => {
  const { isAuth } = useAuth();
  const [likesState, setLikesState] = useState<number>(likes.count);
  const [userHasLiked, setUserHasLiked] = useState<boolean>(likes.users.includes(auth.currentUser?.uid));
  const [userNames, setUserNames] = useState<string[]>([]);
  const [comments, setComments] = useState<{ text: string; user: string; date: any }[]>([]);
  const [newComment, setNewComment] = useState<string>("");
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

  const handleCommentSubmit = async () => {
    const postRef = doc(db, "posts", id);
    const comment = {
      text: newComment,
      user: auth.currentUser?.displayName || "Anonymous",
      date:  new Date().toLocaleString('en-US', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });
    setComments([...comments, comment]);
    setNewComment("");
  };

  const deletePost = async (id: string) => {
    const post = doc(db, 'posts', id);
    await deleteDoc(post);
    location.reload();
  }

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

  useEffect(() => {
    const fetchComments = async () => {
      const postRef = doc(db, "posts", id);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        const postData = postSnap.data();
        setComments(postData?.comments || []);
      }
    };

    fetchComments();
  }, [id]);


  const openModal = (modalId: string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[600px] mt-6 ml-0 mr-0 flex-row rounded-xl">
        <div className="flex justify-between">
          <div className="flex-row">
            <Link to={`/profile/${authorID}`}><h1 className="flex justify-center items-center text-md text-gray-500 font-semibold text-start ml-3 mt-3"><UserImage  authorID={authorID} /> {author}</h1></Link>
            <h1 className="text-sm text-start text-gray-400 ml-3">{date}</h1>
          </div>
          <div className="mr-3">
          {isAuth && authorID === auth.currentUser?.uid && 
          <Trash onClick={() => deletePost(id)} size={20} className="hover:text-primary cursor-pointer" />}
          </div>
        </div>
        <h1 className="text-2xl ml-3 font-semibold text-center mb-3">{title}</h1>
        <div className="md:overflow-auto overflow-hidden max-h-44 min-h-12 w-full ml-1 mr-1 rounded text-center shadow-sm">
          {postData}
        </div>
        <div className="w-full h-7 rounded flex justify-center gap-8 shadow-sm items-center">
          <div className="flex items-center gap-1">
            <Heart size={20}
              className={`cursor-pointer hover:text-primary ${userHasLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            />
            
            <button onClick={() => openModal(`like_modal_${id}`)}>{likesState}</button>
            <dialog id={`like_modal_${id}`} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Likes</h3>
                <p className="py-4">{userNames.join('; ')}</p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>

          <button className="flex gap-2" onClick={() => openModal(`comment_modal_${id}`)}><MessageSquare size={20} className="cursor-pointer hover:text-primary" />{comments.length}</button>
          <dialog id={`comment_modal_${id}`} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Comments</h3>
              <div className="mt-3 mb-3 overflow-auto min-h-12 max-h-32">
              {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="mb-2">
                      <strong>{comment.user}</strong> <span className="text-sm text-gray-400">{comment.date}</span>
                      <br />
                      {comment.text}
                    </div>
                  ))
                ) : (
                  <div>
                    <h1 className="text-center">No comments yet!</h1>
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-center items-center">
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="input input-bordered w-full mb-4 h-10" 
                />
                <button onClick={handleCommentSubmit}><SendHorizontal className="hover:text-primary" /></button>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button className="text-gray-700">Close</button>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
