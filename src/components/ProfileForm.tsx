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

interface ProfileFormProps {
  userId: string;
}

const ProfileForm = (props: ProfileFormProps) => {
  const { userId } = props;
  const [error, setError] = useState<string | null>(null);

  // TODO: react-hook-form
  const [profile, setProfile] = useState<UserProfileEntity>({
    uid: userId,
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL:
      "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
    company: "",
    friends: {},
  });

  const [picture, setPicture] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    getUserProfileById(userId)
      .then((data) => {
        if (data) {
          setProfile(data);
        }
      })
      .catch((error) => {
        setError((error as Error).message);
      });
  }, [userId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let photoURL = profile.photoURL;
      if (picture) {
        photoURL = await uploadUserPicture(userId, picture);
      }
      await Promise.all([
        // update auth
        updateUserProfile({
          ...profile,
          email: auth?.currentUser?.email ?? "",
          uid: auth?.currentUser?.uid ?? "",
          photoURL,
        }),
        // update database
        setUserProfile({
          ...profile,
          email: auth?.currentUser?.email ?? "",
          uid: auth?.currentUser?.uid ?? "",
          photoURL,
        }),
      ]);
      router.replace(`/`);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoFocus
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column", padding: 2 }}
    >
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
          src={picture || profile?.photoURL}
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
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        value={profile.displayName}
        type="text"
        onChange={(e) =>
          setProfile({ ...profile, displayName: e.target.value })
        }
        helperText="Please enter your name"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Phone"
        value={profile.phoneNumber}
        type="text"
        onChange={(e) =>
          setProfile({ ...profile, phoneNumber: e.target.value })
        }
        helperText="Please enter your phoneNumber"
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Company"
        value={profile.company}
        type="text"
        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
        helperText="Please enter your company"
        sx={{ mb: 2 }}
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
