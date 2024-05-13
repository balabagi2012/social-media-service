"use client";

import {
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
} from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthForm = () => {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const switchAuthType = () => {
    setType(type === "signIn" ? "signUp" : "signIn");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user =
      type === "signIn"
        ? await signInUserWithEmailAndPassword(email, password)
        : await signUpUserWithEmailAndPassword(email, password);
    if (!user?.emailVerified) {
      router.push("/auth/emailVerification");
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">{`Sign ${type === "signIn" ? "In" : "Up"}`}</button>
      <button onClick={switchAuthType}>{`Sign ${
        type === "signIn" ? "Up" : "In"
      }`}</button>
    </form>
  );
};

export default AuthForm;
