import RegisterFormRenderedCount from "@/components/RegisterFormRenderedCount";
import { db } from "@/utils/firebase";
import { doc, increment, updateDoc } from "firebase/firestore";
import Image from "next/image";
import styles from "./page.module.css";

const addRegisterFormRenderedCount = async () => {
  return await updateDoc(doc(db, "systemLog", "website"), {
    registerFormRenderedCount: increment(1),
  });
};

export default async function Home() {
  await addRegisterFormRenderedCount();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Viewing <span>-&gt;</span>
          </h2>
          <RegisterFormRenderedCount></RegisterFormRenderedCount>
        </a>
      </div>
    </main>
  );
}
