import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { Post } from "../types/Post";

const fetchUserNamesFromPosts = async (userIds: string[]): Promise<string[]> => {
  const postsCollectionRef = collection(db, "posts");
  const q = query(postsCollectionRef, where("author.id", "in", userIds.length ? userIds : [""]));
  const querySnapshot = await getDocs(q);

  const userNameMap: { [key: string]: string } = {};
  querySnapshot.docs.forEach(doc => {
    const post = doc.data() as Post;
    userNameMap[post.author.id] = post.author.name;
  });

  return userIds.map(uid => userNameMap[uid] || 'Anonymous');
};

export default fetchUserNamesFromPosts;