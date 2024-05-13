import ProfileForm from "@/components/ProfileForm";
import RegisterFormRenderedCount from "@/components/RegisterFormRenderedCount";
import { addRegisterFormRenderedCount } from "@/utils/database";

const UserProfileSettingPage = async ({
  params,
}: {
  params: { userId: string };
}) => {
  await addRegisterFormRenderedCount();

  return (
    <main>
      <h1>User Profile Setting Page</h1>
      <ProfileForm userId={params.userId} />
      <RegisterFormRenderedCount />
    </main>
  );
};

export default UserProfileSettingPage;
