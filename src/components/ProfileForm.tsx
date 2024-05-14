"use client";

import { updateUserProfile } from "@/libs/auth";
import { getUserProfileById, setUserProfile } from "@/libs/database";
import { auth } from "@/libs/firebase";
import { UserProfileEntity } from "@/types/user";
import { Box, Button, TextField, Typography } from "@mui/material";
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

  const router = useRouter();

  useEffect(() => {
    getUserProfileById(userId).then((data) => {
      if (data) {
        setProfile(data);
      }
    });
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await Promise.all([
        updateUserProfile({
          ...profile,
          email: auth?.currentUser?.email ?? "",
          uid: auth?.currentUser?.uid ?? "",
        }),
        setUserProfile({
          ...profile,
          email: auth?.currentUser?.email ?? "",
          uid: auth?.currentUser?.uid ?? "",
        }),
      ]);
      router.push(`/${userId}`);
    } catch (error) {
      console.log(error);
    }
    return;
  };

  //  TODO: Effect to fetch user profile

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoFocus
      autoComplete="off"
      sx={{ display: "flex", flexDirection: "column", padding: 2 }}
    >
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
      <TextField
        fullWidth
        variant="outlined"
        label="Picture"
        value={profile.photoURL}
        type="text"
        onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
        helperText="Please enter your photoURL"
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
