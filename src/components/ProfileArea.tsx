import { UserProfileEntity } from "@/types/user";
import Image from "next/image";

interface ProfileAreaProps {
  profile: UserProfileEntity;
}

const ProfileArea = (props: ProfileAreaProps) => {
  const { profile } = props;
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
    </div>
  );
};

export default ProfileArea;
