import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

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
    return null;
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
    return null;
  }
};

export const verifyAuth = async () => {
  const user = auth.currentUser;
  if (!user) {
    return { verifyAuth: false, redirectPath: "/auth/signIn" };
  } else if (!user.emailVerified) {
    return { verifyAuth: false, redirectPath: "/auth/emailVerification" };
  } else {
    return { verifyAuth: true, redirectPath: "/" };
  }
};
