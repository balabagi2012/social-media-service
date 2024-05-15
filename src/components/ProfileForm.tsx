"use client";

import { updateUserProfile } from "@/libs/auth";
import { getUserProfileById, setUserProfile } from "@/libs/database";
import { auth } from "@/libs/firebase";
import { uploadUserPicture } from "@/libs/storage";
import { UserProfileEntity } from "@/types/user";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface ProfileFormProps {
  userId: string;
}

const ProfileForm = (props: ProfileFormProps) => {
  const { userId } = props;
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<UserProfileEntity>({
    defaultValues: {
      uid: userId,
      displayName: "",
      email: "",
      phoneNumber: "",
      photoURL:
        "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
      company: "",
      friends: {},
    },
  });

  const [picture, setPicture] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    getUserProfileById(userId)
      .then((data) => {
        if (data) {
          reset(data);
        }
      })
      .catch((error) => {
        setError((error as Error).message);
      });
  }, [reset, userId]);

  const selectFile = () => {
    document.getElementById("user-avatar-input")?.click();
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Resize and compress the image
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Use data_url format to display the image in the browser, and it will be upload to Firebase Storage when submitting the form
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: UserProfileEntity) => {
    try {
      let photoURL = data.photoURL;
      if (picture) {
        photoURL = await uploadUserPicture(userId, picture);
      }
      await Promise.all([
        // update auth
        updateUserProfile({
          ...data,
          email: auth?.currentUser?.email ?? "",
          uid: auth?.currentUser?.uid ?? "",
          photoURL,
        }),
        // update database
        setUserProfile({
          ...data,
          email: auth?.currentUser?.email ?? "",
          uid: auth?.currentUser?.uid ?? "",
          photoURL,
        }),
      ]);
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoFocus
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column", padding: 2 }}
    >
      <Controller
        name="photoURL"
        rules={{
          required: "Please upload your avatar",
          minLength: { value: 3, message: "Please enter a valid URL" },
          pattern: /^https:\/\//,
        }}
        control={control}
        render={({ field }) => (
          <Box
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Image
              src={picture || field?.value}
              width={100}
              height={100}
              alt="user-avatar"
            />
            <Button onClick={selectFile}>Select File</Button>
            <input
              type="file"
              accept="image/*"
              id="user-avatar-input"
              onChange={handlePictureChange}
              style={{ display: "none" }}
            ></input>
          </Box>
        )}
      />
      <Controller
        name="displayName"
        control={control}
        rules={{
          required: "Please enter your name",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            label="Name"
            type="text"
            FormHelperTextProps={{ error: true }}
            helperText={errors?.displayName?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: "Please enter your phone number",
          minLength: {
            value: 9,
            message: "Phone number must be at least 9 digits",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            label="Phone"
            type="text"
            FormHelperTextProps={{ error: true }}
            helperText={errors?.phoneNumber?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Controller
        name="company"
        control={control}
        rules={{
          required: "Please enter your company",
          minLength: {
            value: 2,
            message: "Company must be at least 9 digits",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            label="Company"
            type="text"
            FormHelperTextProps={{ error: true }}
            helperText={errors?.company?.message}
            sx={{ mb: 2 }}
          />
        )}
      />
      <Button variant="contained" type="submit" sx={{ mb: 2 }}>
        Save
      </Button>
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

export default ProfileForm;
