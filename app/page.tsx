"use client";
import Search from "@/components/Search";
import { Sun } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-cover bg-gradient-to-r from-emerald-700 via-cyan-500 to-pink-300 h-screen flex items-center justify-center">
      <div className="flex flex-col bg-white/25   rounded-lg h-full w-full  md:h-[700px] md:w-[700px] top-[50%] left-[50%] p-4 overflow-y-scroll custom-scrollbar">
        <Search />
      </div>
    </div>
  );
}
