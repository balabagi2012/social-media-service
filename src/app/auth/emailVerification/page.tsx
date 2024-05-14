"use client";

import { auth } from "@/libs/firebase";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const EmailVerificationPage = () => {
  const router = useRouter();

  async function reloadUser() {
    try {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          router.push(`/${auth.currentUser.uid}`);
        } else {
          window.alert("Email is not verified yet.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <Typography variant="h4">Email Verification Page</Typography>
      <section>
        <Typography variant="body2">
          Your Email verification is pending. Please check your email.
        </Typography>
        <Button variant="outlined" onClick={reloadUser}>
          I have finished verification
        </Button>
      </section>
    </main>
  );
};

export default EmailVerificationPage;
