import { createContext, useContext, useState, ReactNode } from 'react';

interface Likes {
  [postId: string]: boolean;
}

interface LikeContextType {
  likes: Likes;
  toggleLike: (postId: string) => void;
}

const LikeContext = createContext<LikeContextType | null>(null);

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const [likes, setLikes] = useState<Likes>({});

  const toggleLike = (postId: string) => {
    setLikes((prevLikes) => {
      const isLiked = prevLikes[postId] || false;
      return {
        ...prevLikes,
        [postId]: !isLiked,
      };
    });
  };

  return (
    <LikeContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

export const useLikeContext = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLikeContext mora biti korišćen unutar LikeProvider-a');
  }
  return context;
};
