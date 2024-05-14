import Profile from "@/components/Profile";

const UserPage = ({ params }: { params: { userId: string } }) => {
  return (
    <main>
      <Profile userId={params.userId} />
    </main>
  );
};

export default UserPage;
