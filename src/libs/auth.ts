import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { UserProfileEntity } from "@/types/user";

export const signUpUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserProfile = async (profile: UserProfileEntity) => {
  try {
    if (auth.currentUser) {
      const { displayName, photoURL } = profile;
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
    }
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update auth profile");
  }
};
