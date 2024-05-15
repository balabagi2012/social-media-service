"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import {
  signInUserWithEmailAndPassword,
  signUpUserWithEmailAndPassword,
} from "@/libs/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./Loading";

interface AuthFormInput {
  email: string;
  password: string;
  repeatPassword?: string;
}

const AuthForm = () => {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AuthFormInput>({
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const switchAuthType = () => {
    setType(type === "signIn" ? "signUp" : "signIn");
  };

  const onSubmit = async (data: AuthFormInput) => {
    try {
      setLoading(true);
      const { email, password, repeatPassword } = data;
      if (type === "signUp" && password !== repeatPassword) {
        throw new Error("Passwords do not match");
      }
      const user =
        type === "signIn"
          ? await signInUserWithEmailAndPassword(email, password)
          : await signUpUserWithEmailAndPassword(email, password);
      setLoading(false);

      if (user) {
        if (!user?.emailVerified) {
          router.push("/auth/emailVerification");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoFocus
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            helperText={
              errors.email ? errors.email.message : "Please enter your email"
            }
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            helperText={
              errors.password
                ? errors.password.message
                : "Please enter your password"
            }
            sx={{ mb: 2 }}
          />
        )}
      />
      {type === "signUp" && (
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="RepeatPassword"
              type="password"
              helperText={
                errors.repeatPassword
                  ? errors.repeatPassword.message
                  : "Please repeat your password"
              }
              sx={{ mb: 2 }}
            />
          )}
        />
      )}
      <Button variant="contained" type="submit" sx={{ mb: 2 }}>{`Sign ${
        type === "signIn" ? "In" : "Up"
      }`}</Button>
      <Typography
        variant="body1"
        onClick={switchAuthType}
        sx={{ textAlign: "center", cursor: "pointer", mb: 2 }}
      >
        {type === "signIn"
          ? "Haven't the account? Let's sign up"
          : "Have the account? Let's sign in"}
      </Typography>
      {loading && <Loading />}
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", cursor: "pointer", mb: 2 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AuthForm;
