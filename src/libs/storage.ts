import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { storage } from "./firebase";
import { nanoid } from "nanoid";

export const uploadUserPicture = async (userId: string, file: string) => {
  try {
    const fileType = extractFileType(file);
    const fileName = nanoid();
    const metadata = {
      contentType: `image/${fileType}`,
    };
    const storageRef = ref(
      storage,
      `users/${userId}/profilePicture/${fileName}.${fileType}`
    );
    await uploadString(storageRef, file, "data_url", metadata);
    const fileURL = await getDownloadURL(storageRef);
    return fileURL;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upload a picture");
  }
};

export const removeUserPicture = async (userId: string, fileName: string) => {
  try {
    const storageRef = ref(
      storage,
      `users/${userId}/profilePicture/${fileName}`
    );
    await deleteObject(storageRef);
    return;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to remove a picture");
  }
};

export const extractFileType = (file: string) => {
  const fileType = file.split(";")[0].split("/")[1];
  return fileType;
};
