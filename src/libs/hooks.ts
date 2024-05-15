import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

export const useMe = () => {
  const [me, setMe] = useState<User | null>(null);

  useEffect(() => {
    const unscribe = auth.onAuthStateChanged((user) => {
      setMe(user);
    });
    return () => unscribe();
  });

  return me;
};
