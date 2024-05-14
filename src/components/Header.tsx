"use client";

import { auth } from "@/libs/firebase";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";

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
import { usePathname } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleRoute = () => {
    pathname === "/" ? router.push("/") : router.back();
  };

  const signOutUser = async () => {
    const auth = getAuth();
    return await signOut(auth);
  };

  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleRoute}
            >
              {pathname === "/" ? <HomeIcon /> : <ArrowBackIcon />}
            </IconButton>
            {user && (
              <Box sx={{ flexGrow: 0, ml: "auto" }}>
                <Link href={`/${user.uid}`}>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {user?.email}
                  </Typography>
                </Link>
              </Box>
            )}
            {user && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={signOutUser}
                sx={{ ml: 2 }}
              >
                <LogoutIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
