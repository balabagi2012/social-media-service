import RegisterFormRenderedCount from "@/components/RegisterFormRenderedCount";
import SignUpForm from "@/components/SignUpForm";
import { addRegisterFormRenderedCount } from "@/utils/database";

const SignUpPage = async () => {
  await addRegisterFormRenderedCount();
  return (
    <main>
      <SignUpForm />
      <RegisterFormRenderedCount />
    </main>
  );
};

export default SignUpPage;
