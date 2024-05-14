"use client";
import {
  addUserFriend,
  getUserProfileById,
  removeUserFriend,
} from "@/libs/database";
import { useMe } from "@/libs/hooks";
import { UserProfileEntity } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileArea from "./ProfileArea";

interface ProfileProps {
  userId: string;
}

const Profile = (props: ProfileProps) => {
  const { userId } = props;
  const me = useMe();
  const [profile, setProfile] = useState<UserProfileEntity | null>(null);

  const fetchProfile = async (userId: string) => {
    const data = await getUserProfileById(userId);
    if (data) {
      setProfile(data);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId]);

  const isMe = me?.uid === userId;

  const isFriend = profile?.friends?.[me?.uid ?? ""] ?? false;

  const addFriend = async () => {
    if (me && profile) {
      try {
        await addUserFriend(userId, me?.uid ?? "");
        setProfile({
          ...profile,
          friends: { ...(profile?.friends ?? {}), [me.uid]: true },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFriend = async () => {
    if (me && profile) {
      try {
        await removeUserFriend(userId, me?.uid ?? "");
        const newFriends = { ...profile?.friends };
        delete newFriends[me.uid];
        setProfile({
          ...profile,
          friends: newFriends,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const renderEditProfile = () => {
    return isMe && <Link href={`/${userId}/profileSetting`}>Edit Profile</Link>;
  };

  const renderFriendButton = () => {
    if (!isMe) {
      return isFriend ? (
        <button onClick={removeFriend}>Remove Friend</button>
      ) : (
        <button onClick={addFriend}>Add Friend</button>
      );
    }
  };

  const renderViewFriends = (friends: string[]) => {
    return (
      <Link href={`/${userId}/friends`}>View Friends:({friends.length})</Link>
    );
  };

  return (
    <div>
      <ProfileArea profile={profile} />
      {renderEditProfile()}
      {renderFriendButton()}
      {renderViewFriends(Object.keys(profile.friends ?? {}))}
    </div>
  );
  return;
};

export default Profile;
