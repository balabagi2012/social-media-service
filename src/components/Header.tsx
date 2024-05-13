"use client";

import { auth } from "@/utils/firebase";
import { User, getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      console.log(user)
      if (!user) {
        router.push("/auth");
      } else if (!user.emailVerified) {
        router.push("/auth/emailVerification");
      } else if (!user.photoURL) {
        router.push(`/${user.uid}/profileSetting`);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const signOutUser = async () => {
    const auth = getAuth();
    return await signOut(auth);
  };

  return (
    <header>
      {user && <p>{user?.email}</p>}
      {user && <button onClick={signOutUser}>logout</button>}
    </header>
  );
};

export default Header;
