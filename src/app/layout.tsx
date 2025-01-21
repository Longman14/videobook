import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
// import ConvexClientProvider from "./ConvexClientProvider";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mattdacademy",
  description: "Generate Courses with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      {/* <GoogleOneTap /> */}
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
