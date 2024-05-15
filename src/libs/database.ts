import { UserProfileEntity } from "@/types/user";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const addRegisterFormRenderedCount = async () => {
  try {
    return await updateDoc(doc(db, "systemLog", "website"), {
      registerFormRenderedCount: increment(1),
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update register form rendered count");
  }
};

export const setUserProfile = async (profile: UserProfileEntity) => {
  try {
    return await setDoc(doc(db, "users", profile.uid), { ...profile });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to set user profile");
  }
};

export const getUserProfileById = async (
  uid: string
): Promise<UserProfileEntity | null> => {
  try {
    if (!uid) {
      throw new Error(`Invalid ID received: ${uid}`);
    }

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfileEntity;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user profile");
  }
};

export const addUserFriend = async (userId: string, myId: string) => {
  if (userId === myId) {
    console.log("Error: Invalid IDs received");
    throw new Error("Invalid IDs received");
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
    throw new Error("Failed to add a friend");
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

// TODO: pagination feature
export const getUserProfiles = async (): Promise<UserProfileEntity[]> => {
  try {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    const users: UserProfileEntity[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfileEntity);
    });
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user profiles");
  }
};

// TODO: pagination feature
export const getUserProfilesByIds = async (
  ids: string[]
): Promise<UserProfileEntity[]> => {
  try {
    const q = query(collection(db, "users"), where("uid", "in", ids));
    const querySnapshot = await getDocs(q);
    const users: UserProfileEntity[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserProfileEntity);
    });
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user profiles by ids");
  }
};
