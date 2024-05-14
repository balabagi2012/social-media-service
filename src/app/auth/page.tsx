import AuthForm from "@/components/AuthForm";
import { Typography } from "@mui/material";

const AuthPage = async () => {
  return (
    <main>
      <Typography variant="h4">User System Page</Typography>
      <AuthForm />
    </main>
  );
};

export default AuthPage;
