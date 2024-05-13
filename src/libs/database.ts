import { UserProfileEntity } from "@/types/user";
import {
  deleteField,
  doc,
  getDoc,
  increment,
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
  return await updateDoc(doc(db, "users", userId), {
    [`friends.${myId}`]: true,
  });
};

export const removeUserFriend = async (userId: string, myId: string) => {
  if (userId === myId) {
    console.log("Error: Invalid ID received");
    return null;
  }
  return await updateDoc(doc(db, "users", userId), {
    [`friends.${myId}`]: deleteField(),
  });
};