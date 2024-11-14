export type LikeContextType = {
    likes: Record<string, boolean>;
    toggleLike: (postId: string) => void;
  }
  