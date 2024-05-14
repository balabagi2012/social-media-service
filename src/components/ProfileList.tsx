import { getUserProfiles } from "@/libs/database";
import Link from "next/link";
import ProfileArea from "./ProfileArea";

const ProfileList = async () => {
  const profileList = await getUserProfiles();
  return profileList.map((profile) => (
    <Link href={`/${profile.uid}`} key={profile.uid}>
      <ProfileArea profile={profile} />
    </Link>
  ));
};

export default ProfileList;
