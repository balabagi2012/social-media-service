"use client";

import { UserProfileEntity } from "@/types/user";
import { updateUserProfile } from "@/utils/auth";
import { getUserProfileById, setUserProfile } from "@/utils/database";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileFormProps {
  userId: string;
}

const ProfileForm = (props: ProfileFormProps) => {
  const { userId } = props;

  // TODO: react-hook-form
  const [profile, setProfile] = useState<UserProfileEntity>({
    uid: userId,
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL:
      "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
    company: "",
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
