"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignOutButton,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Header from "./_components/Header.jsx";
import Hero from "./_components/Hero.jsx";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-blue-800">
      <Header />
      <Hero />
    
    </div>
  );
}
