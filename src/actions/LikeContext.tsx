import { createContext, useContext, useState, ReactNode } from 'react';
import { LikeContextType } from '../types/LikeContextType';

const LikeContext = createContext<LikeContextType | null>(null);

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const [likes, setLikes] = useState<Record<string, boolean>>({});

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
