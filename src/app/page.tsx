"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignOutButton,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-blue-500">
        <SignedIn>
          <SignOutButton>
            <Button>Sign Out</Button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </main>
  );
}
