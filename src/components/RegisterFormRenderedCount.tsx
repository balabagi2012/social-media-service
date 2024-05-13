"use client";

import SystemLogEntity from "@/types/systemLog";
import { db } from "@/utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const RegisterFormRenderedCount = () => {
  const [data, setData] = useState<SystemLogEntity | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "systemLog", "website"), (doc) => {
      const systemLog = doc.data() as SystemLogEntity;
      setData(systemLog);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      The register form rendered times: {data?.registerFormRenderedCount ?? "Loading"}
    </div>
  );
};

export default RegisterFormRenderedCount;
