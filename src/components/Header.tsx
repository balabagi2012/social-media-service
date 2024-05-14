"use client";

import { auth } from "@/libs/firebase";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { User, getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (!user) {
        router.push("/auth");
      } else if (!user.emailVerified) {
        router.push("/auth/emailVerification");
      } else if (!user.photoURL) {
        router.push(`/${user.uid}/profileSetting`);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const signOutUser = async () => {
    const auth = getAuth();
    return await signOut(auth);
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link href="/">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Link>

            {user && (
              <Link href={`/${user.uid}`}>
                <Box sx={{ flexGrow: 0 }}>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user?.email}
                  </Typography>
                </Box>
              </Link>
            )}
            {
              <Button color="inherit" onClick={signOutUser} sx={{ ml: "auto" }}>
                Sign Out
              </Button>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
