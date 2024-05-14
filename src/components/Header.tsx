"use client";

import { auth } from "@/libs/firebase";
import { User, getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
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
      {user ? (
        <Link href={`/${user.uid}`}>{user?.email}</Link>
      ) : (
        "Authenticating..."
      )}
      {user && <button onClick={signOutUser}>Sign Out</button>}
    </header>
  );
};

export default Header;
