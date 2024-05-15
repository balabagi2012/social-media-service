"use client";

import SystemLogEntity from "@/types/systemLog";
import { db } from "@/libs/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Loading from "./Loading";

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
    <Box>
      <Typography variant="h6">Register Form Rendered Count:</Typography>
      {data?.registerFormRenderedCount ? (
        <Typography variant="body2">
          {data?.registerFormRenderedCount}
        </Typography>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default RegisterFormRenderedCount;
