import { UserProfileEntity } from "@/types/user";
import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";

interface ProfileAreaProps {
  profile: UserProfileEntity;
}

const ProfileArea = (props: ProfileAreaProps) => {
  const { profile } = props;
  return (
    <Card
      sx={{
        display: "flex",
        flex: 1,
        minWidth: "360px",
        flexDirection: "column",
        marginBottom: 2,
        p: 2,
      }}
    >
      <Typography variant="h6">{profile.displayName}</Typography>
      <Image
        src={profile.photoURL}
        alt={profile.displayName}
        width={60}
        height={60}
      />
      <Typography variant="body1">{profile.email}</Typography>
      <Typography variant="body1">{profile.phoneNumber}</Typography>
      <Typography variant="body1">{profile.company}</Typography>
    </Card>
  );
};

export default ProfileArea;
