"use client";

import { UserProfileEntity } from "@/types/user";
import { updateUserProfile } from "@/utils/auth";
import { setUserProfile } from "@/utils/database";
import { auth } from "@/utils/firebase";
import { useState } from "react";

const ProfileForm = () => {
  // TODO: react-hook-form
  const [profile, setProfile] = useState<UserProfileEntity>({
    uid: auth?.currentUser?.uid ?? "",
    displayName: "",
    email: auth?.currentUser?.email ?? "",
    phoneNumber: "",
    photoURL:
      auth?.currentUser?.photoURL ??
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
    company: "",
  });

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
    } catch (error) {
      console.log(error);
    }
    return;
  };

  //  TODO: Effect to fetch user profile

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={profile.displayName}
        onChange={(e) =>
          setProfile({ ...profile, displayName: e.target.value })
        }
        placeholder="Name"
      />
      <input
        type="text"
        value={profile.phoneNumber}
        onChange={(e) =>
          setProfile({ ...profile, phoneNumber: e.target.value })
        }
        placeholder="Phone"
      />
      <input
        type="text"
        value={profile.photoURL}
        onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
        placeholder="Picture"
      />
      <input
        type="text"
        value={profile.company}
        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
        placeholder="Company"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
