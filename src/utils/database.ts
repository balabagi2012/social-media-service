import { doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserProfileEntity } from "@/types/user";

export const addRegisterFormRenderedCount = async () => {
  return await updateDoc(doc(db, "systemLog", "website"), {
    registerFormRenderedCount: increment(1),
  });
};

export const setUserProfile = async (profile: UserProfileEntity) => {
  return await setDoc(doc(db, "users", profile.uid), { ...profile });
};
