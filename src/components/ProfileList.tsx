"use client";
import { getUserProfiles } from "@/libs/database";
import { UserProfileEntity } from "@/types/user";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import ProfileArea from "./ProfileArea";
import { useMe } from "@/libs/hooks";

const ProfileList = () => {
  const [profileList, setProfileList] = useState<UserProfileEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const me = useMe();

  const fetchUserProfiles = async () => {
    try {
      setLoading(true);
      const data = await getUserProfiles();
      setProfileList(data);
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (me) {
      fetchUserProfiles();
    }
  }, [me]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  return profileList.map((profile) => (
    <Link href={`/${profile.uid}`} key={profile.uid}>
      <ProfileArea profile={profile} />
    </Link>
  ));
};

export default ProfileList;
