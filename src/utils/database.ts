import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const addRegisterFormRenderedCount = async () => {
  return await updateDoc(doc(db, "systemLog", "website"), {
    registerFormRenderedCount: increment(1),
  });
};

export const setUserProfile = async (userId: string, profile) => {
  return await setDoc(doc(db, "users", userId), { ...profile });
};
