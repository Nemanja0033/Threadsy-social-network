import  { createContext, useContext, useState, ReactNode } from "react";
import { db } from "../firebaseconfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

interface Comment {
  userId: string;
  text: string;
  date: number;
}

interface Post {
  postId: string;
  comments: Comment[];
}

interface CommentContextType {
  addComment: (postId: string, commentText: string) => void;
  comments: Post[];
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
};

interface CommentProviderProps {
  children: ReactNode;
}

export const CommentProvider = ({ children }: CommentProviderProps) => {
  const [comments, setComments] = useState<Post[]>([]);

  const addComment = async (postId: string, commentText: string) => {
    const newComment = {
      userId: "currentUserId", 
      text: commentText,
      date: new Date().getTime(),
    };

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: arrayUnion(newComment),
    });

    setComments((prevComments) => {
      return prevComments.map((post) =>
        post.postId === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      );
    });
  };

  return (
    <CommentContext.Provider value={{ addComment, comments }}>
      {children}
    </CommentContext.Provider>
  );
};
