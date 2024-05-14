import { UserProfileEntity } from "@/types/user";
import {
  deleteField,
  doc,
  getDoc,
  increment,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const addRegisterFormRenderedCount = async () => {
  return await updateDoc(doc(db, "systemLog", "website"), {
    registerFormRenderedCount: increment(1),
  });
};

export const setUserProfile = async (profile: UserProfileEntity) => {
  return await setDoc(doc(db, "users", profile.uid), { ...profile });
};

export const getUserProfileById = async (
  uid: string
): Promise<UserProfileEntity | null> => {
  if (!uid) {
    console.log("Error: Invalid ID received: ", uid);
    return null;
  }

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfileEntity;
  } else {
    return null;
  }
};

export const addUserFriend = async (userId: string, myId: string) => {
  if (userId === myId) {
    console.log("Error: Invalid ID received");
    return null;
  }
  try {
    await runTransaction(db, async (transaction) => {
      transaction.update(doc(db, "users", userId), {
        [`friends.${myId}`]: true,
      });
      transaction.update(doc(db, "users", myId), {
        [`friends.${userId}`]: true,
      });
      return true;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const removeUserFriend = async (userId: string, myId: string) => {
  if (userId === myId) {
    console.log("Error: Invalid ID received");
    return null;
  }
  try {
    await runTransaction(db, async (transaction) => {
      transaction.update(doc(db, "users", userId), {
        [`friends.${myId}`]: deleteField(),
      });
      transaction.update(doc(db, "users", myId), {
        [`friends.${userId}`]: deleteField(),
      });
      return true;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
