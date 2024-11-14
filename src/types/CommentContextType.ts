export type Comment = {
    userId: string;
    text: string;
    date: number;
  }
  
  export type Post = {
    postId: string;
    comments: Comment[];
  }
  