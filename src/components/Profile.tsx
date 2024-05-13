import { getUserProfileById } from "@/utils/database";
import Image from "next/image";

interface ProfileProps {
  userId: string;
}

const Profile = async (props: ProfileProps) => {
  const { userId } = props;
  const profileData = await getUserProfileById(userId);
  if (!profileData) {
    return <div>Profile not found</div>;
  }
  return (
    <div>
      <h3>{profileData.displayName}</h3>
      <p>{profileData.email}</p>
      <p>{profileData.phoneNumber}</p>
      <p>{profileData.company}</p>
      <Image
        src={profileData.photoURL}
        alt={profileData.displayName}
        width={60}
        height={60}
      />
    </div>
  );
  return;
};

export default Profile;
