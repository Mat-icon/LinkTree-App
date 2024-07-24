"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HomeCard from "./(components)/home/HomeCard";
import HomeNavbar from "./(components)/home/HomeNav";
import { useAuth } from "./(components)/useAuth";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <ClipLoader className="clip"/>; 
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-white md:bg-gray-100 pb-10 instrument-sans">
      <div className="absolute top-0 left-0 w-full h-2/5 bg-blue-600 rounded-b-2xl hidden md:block"></div>
      <div className="relative flex flex-col items-center h-full p-0 md:p-4">
        <HomeNavbar />
        <HomeCard />
      </div>
    </div>
  );
}
