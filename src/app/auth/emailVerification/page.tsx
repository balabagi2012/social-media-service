"use client";

import { auth } from "@/libs/firebase";
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
      <section>
        Your Email verification is pending. Please check your email.
        <button onClick={reloadUser}>I have finished verification</button>
      </section>
    </main>
  );
};

export default EmailVerificationPage;
