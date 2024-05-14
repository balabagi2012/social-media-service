"use client";
import {
  addUserFriend,
  getUserProfileById,
  removeUserFriend,
} from "@/libs/database";
import { useMe } from "@/libs/hooks";
import { UserProfileEntity } from "@/types/user";
import { Box, Button, Modal, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileArea from "./ProfileArea";
import { useRouter } from "next/navigation";

interface ProfileProps {
  userId: string;
}

const Profile = (props: ProfileProps) => {
  const { userId } = props;
  const me = useMe();
  const [profile, setProfile] = useState<UserProfileEntity | null>(null);
  const [friends, setFriends] = useState<UserProfileEntity[]>([]);
  const [showFriends, setShowFriends] = useState(false);
  const router = useRouter();
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

  const editProfile = async () => {
    router.push(`/${userId}/profileSetting`);
  };

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

  const viewFriend = async () => {
    setShowFriends(true);
  };

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const renderEditProfile = () => {
    return (
      isMe && (
        <Button variant="outlined" onClick={editProfile}>
          Edit Profile
        </Button>
      )
    );
  };

  const renderFriendButton = () => {
    if (!isMe) {
      return isFriend ? (
        <Button variant="outlined" onClick={removeFriend}>
          Remove Friend
        </Button>
      ) : (
        <Button variant="outlined" onClick={addFriend}>
          Add Friend
        </Button>
      );
    }
  };

  const renderViewFriends = () => {
    return (
      <Button variant="outlined" onClick={viewFriend} sx={{ ml: "auto" }}>
        View Friend
      </Button>
    );
  };

  return (
    <Box>
      <ProfileArea profile={profile} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {renderEditProfile()}
        {renderFriendButton()}
        {renderViewFriends()}
      </Box>
      <Modal
        open={showFriends}
        onClose={() => setShowFriends(false)}
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >
          <Typography sx={{ mb: 2 }} variant="body1">
            {Object.keys(profile?.friends ?? {}).length !== 0
              ? "Friends:"
              : "There are no friends here"}
          </Typography>
          {Object.keys(profile?.friends ?? {}).map((friend: string) => (
            <Typography key={friend} sx={{ mb: 2 }} variant="body1">
              {friend}
            </Typography>
          ))}
        </Box>
      </Modal>
    </Box>
  );
  return;
};

export default Profile;
