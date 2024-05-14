"use client";

import {
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
} from "@/libs/auth";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoFocus
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" type="submit" sx={{ mb: 2 }}>{`Sign ${
        type === "signIn" ? "In" : "Up"
      }`}</Button>
      <Typography
        variant="body1"
        onClick={switchAuthType}
        sx={{ textAlign: "center", cursor: "pointer" }}
      >
        {type === "signIn"
          ? "Haven't the account? Let's sign up"
          : "Have the account? Let's sign in"}
      </Typography>
    </Box>
  );
};

export default AuthForm;
