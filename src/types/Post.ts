export type Post = {
    postId: string;
    comments: any;
    id: string;
    title: string;
    postData: string;
    author: {
      id: string;
      name: string;
    };
    date: string;
    likes: {
      count: number;
      users: string[];
    };
    createdAt: any;
  }
  