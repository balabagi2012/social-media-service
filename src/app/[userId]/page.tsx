import Profile from "@/components/Profile";
import { Typography } from "@mui/material";

const UserPage = ({ params }: { params: { userId: string } }) => {
  return (
    <main>
      <Typography variant="h4">User Profile Page</Typography>
      <Profile userId={params.userId} />
    </main>
  );
};

export default UserPage;
