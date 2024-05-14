import { getUserProfiles } from "@/libs/database";
import ProfileArea from "./ProfileArea";
import Link from "next/link";

const ProfileList = async () => {
  const profileList = await getUserProfiles();
  return (
    <div>
      {profileList.map((profile) => (
        <Link href={`/${profile.uid}`} key={profile.uid}>
          <ProfileArea profile={profile} />
        </Link>
      ))}
    </div>
  );
};

export default ProfileList;
