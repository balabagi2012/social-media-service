import Profile from "@/components/Profile";

const UserPage = ({ params }: { params: { userId: string } }) => {
  return (
    <main>
      <h1>User Profile Page </h1>
      <Profile userId={params.userId} />
    </main>
  );
};

export default UserPage;
