import ProfileForm from "@/components/ProfileForm";
import RegisterFormRenderedCount from "@/components/RegisterFormRenderedCount";
import { addRegisterFormRenderedCount } from "@/libs/database";
import { Typography } from "@mui/material";

const UserProfileSettingPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  await addRegisterFormRenderedCount();

  return (
    <main>
      <Typography variant="h4">User Profile Setting Page</Typography>
      <ProfileForm userId={params.userId} />
      <RegisterFormRenderedCount />
    </main>
  );
};

export default UserProfileSettingPage;
