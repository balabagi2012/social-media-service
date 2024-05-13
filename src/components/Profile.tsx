"use client";
import { UserProfileEntity } from "@/types/user";
import { getUserProfileById } from "@/utils/database";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProfileProps {
  userId: string;
}

const Profile = (props: ProfileProps) => {
  const { userId } = props;
  const [profile, setProfile] = useState<UserProfileEntity | null>(null);

  useEffect(() => {
    getUserProfileById(userId).then((data) => {
      if (data) {
        setProfile(data);
      }
    });
  }, [userId]);

  const addFriend = async () => {};

  const removeFriend = async () => {};

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div>
      <h3>{profile.displayName}</h3>
      <p>{profile.email}</p>
      <p>{profile.phoneNumber}</p>
      <p>{profile.company}</p>
      <Image
        src={profile.photoURL}
        alt={profile.displayName}
        width={60}
        height={60}
      />
      {/* TODO: judge if userId === auth.currentUser.uid */}
      <Link href={`/${userId}/profileSetting`}>Edit Profile</Link>
      {/* TODO: judge if userId === auth.currentUser.uid */}
      <button onClick={addFriend}>Add Friend</button>
      <button onClick={removeFriend}>Remove Friend</button>
      <Link href={`/${userId}/friends`}>View Friends</Link>
    </div>
  );
  return;
};

export default Profile;
