"use client";

import { db } from "@/utils/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const RegisterFormRenderedCount = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "systemLog", "website"), (doc) => {
      setData(doc.data());
    });

    return () => unsubscribe();
  }, []);

  return <div>{data?.registerFormRenderedCount ?? "Loading"}</div>;
};

export default RegisterFormRenderedCount;
