"use client";
import {
  addUserFriend,
  getUserProfileById,
  getUserProfilesByIds,
  removeUserFriend,
} from "@/libs/database";
import { useMe } from "@/libs/hooks";
import { UserProfileEntity } from "@/types/user";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ProfileArea from "./ProfileArea";

interface ProfileProps {
  userId: string;
}

const Profile = (props: ProfileProps) => {
  const { userId } = props;
  const me = useMe();
  const [profile, setProfile] = useState<UserProfileEntity | null>(null);
  const [friends, setFriends] = useState<UserProfileEntity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [showFriends, setShowFriends] = useState(false);
  const router = useRouter();

  const fetchProfile = async (userId: string) => {
    try {
      setLoadingProfile(true);
      const data = await getUserProfileById(userId);
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchFriends = async (friends: string[]) => {
    try {
      setLoadingFriends(true);
      const data = await getUserProfilesByIds(friends);
      setFriends(data);
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    } finally {
      setLoadingFriends(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (profile?.friends && Object.keys(profile.friends).length > 0) {
      fetchFriends(Object.keys(profile.friends));
    }
  }, [profile?.friends]);

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
        setError((error as Error).message);
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
        setError((error as Error).message);
      }
    }
  };

  const viewFriend = async () => {
    setShowFriends(true);
  };

  if (loadingProfile) {
    return <Loading />;
  } else if (!profile) {
    return (
      <Box>
        <Typography variant="h4">User not found</Typography>
      </Box>
    );
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
          mb: 2,
        }}
      >
        {renderEditProfile()}
        {renderFriendButton()}
        {renderViewFriends()}
      </Box>
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", cursor: "pointer", mb: 2 }}
        >
          {error}
        </Typography>
      )}
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
          {loadingFriends ? (
            <Loading />
          ) : (
            friends.map((friend) => (
              <Box
                key={friend.uid}
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar alt={friend.displayName} src={friend.photoURL} />
                <Typography variant="body1">
                  <Link href={`/${friend.uid}`}> {friend.displayName}</Link>
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Modal>
    </Box>
  );
  return;
};

export default Profile;
