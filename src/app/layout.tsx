import Header from "@/components/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "social media service",
  description:
    "This is a mock social media website prototype designed for users to connect with friends and register using their email addresses.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpeg" />
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Header />
          <Container maxWidth="sm" sx={{ p: 4, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {children}
            </Box>
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
