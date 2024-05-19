"use client";
import { Controller, useForm } from "react-hook-form";

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
        rules={{
          required: "Please enter your email",
          minLength: {
            value: 3,
            message: "email must be at least 6 characters",
          },
          pattern: /^[\w-]+@([\w-]+\.)+[\w-]+$/,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            id="email"
            label="Email"
            type="email"
            FormHelperTextProps={{ error: true }}
            helperText={errors?.email?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Please enter your password",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            id="password"
            label="Password"
            type="password"
            FormHelperTextProps={{ error: true }}
            helperText={errors?.password?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      {type === "signUp" && (
        <Controller
          name="repeatPassword"
          control={control}
          rules={{
            required: "Please repeat your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              id="repeatPassword"
              label="RepeatPassword"
              type="password"
              FormHelperTextProps={{ error: true }}
              helperText={errors?.repeatPassword?.message}
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
          id="error"
          sx={{ textAlign: "center", cursor: "pointer", mb: 2 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AuthForm;
