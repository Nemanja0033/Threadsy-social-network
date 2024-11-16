import { query, where, getDocs, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";

export const setUsersInFirestore =  async () => {
    const userCollectionRef = collection(db, "users");
    const userQuery = query(userCollectionRef, where("userId", "==", auth.currentUser?.uid));
    const querySnapshot = await getDocs(userQuery);

    if(querySnapshot.empty) {
      await addDoc(userCollectionRef, {
        username: auth.currentUser?.displayName,
        userId: auth.currentUser?.uid,
        userPhoto: auth.currentUser?.photoURL,
      })
    }
}