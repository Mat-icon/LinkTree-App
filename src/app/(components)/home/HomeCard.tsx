import React from "react";
import Image from "next/image";
import { FaArrowRight, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import {
  FaFacebook,
  FaUserAstronaut,
  FaTwitch,
  FaCodepen,
  FaFreeCodeCamp,
} from "react-icons/fa";
import { PiDevToLogo } from "react-icons/pi";
import { BsGitlab } from "react-icons/bs";
import { SiCodewars, SiHashnode } from "react-icons/si";
import { useUserProfile } from "../UserProfileContext";
import Skeleton from "../Skeleton";

export const platforms = [
  { name: "GitHub", icon: FaGithub },
  { name: "YouTube", icon: FaYoutube },
  { name: "LinkedIn", icon: FaLinkedin },
  { name: "Facebook", icon: FaFacebook },
  { name: "Frontend Mentor", icon: FaUserAstronaut },
  { name: "Twitch", icon: FaTwitch },
  { name: "Dev.to", icon: PiDevToLogo },
  { name: "Hashnode", icon: SiHashnode },
  { name: "CodePen", icon: FaCodepen },
  { name: "CodeWars", icon: SiCodewars },
  { name: "freeCodeCamp", icon: FaFreeCodeCamp },
  { name: "Gitlab", icon: BsGitlab },
];

const HomeCard = () => {
  const { profile } = useUserProfile();
  const isLoading = !profile || !profile.firstName;

  return (
    <div className="relative bg-white md:rounded-xl md:shadow-lg p-10 w-80 mt-10 md:mt-20 ">
      <div className="flex flex-col items-center space-y-8">
        {isLoading ? (
          <>
            <Skeleton width="100px" height="100px" borderRadius="50%" />
            <Skeleton width="200px" height="20px" borderRadius="5px" />
            <Skeleton width="150px" height="20px" borderRadius="5px" />
            <Skeleton width="100%" height="50px" borderRadius="5px" />
            <Skeleton width="100%" height="50px" borderRadius="5px" />
            <Skeleton width="100%" height="50px" borderRadius="5px" />
            <Skeleton width="100%" height="50px" borderRadius="5px" />
          </>
        ) : (
          <>
            <Image
              className="w-28 h-28 object-cover object-top rounded-full border-2 border-blue-600"
              src={profile.imageUrl || "/images/user.png"}
              alt="User Avatar"
              width={500}
              height={500}
              unoptimized
            />
            <div className="flex flex-col items-center">
              <h2 className="w-11/12 mt-4 text-2xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h2>
              <p className="mt-4 text-sm text-gray-600">{profile.email}</p>
            </div>
            <div className="pt-10 space-y-5 w-full">
              {profile.links.map((link) => {
                const platform = platforms.find(
                  (p) => p.name === link.platform
                );
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    className={`flex items-center justify-between w-full py-4 px-4 text-xs rounded-lg ${
                      platform?.name === "GitHub"
                        ? "bg-black text-white"
                        : platform?.name === "YouTube"
                        ? "bg-red-600 text-white"
                        : platform?.name === "LinkedIn"
                        ? "bg-blue-600 text-white"
                        : platform?.name === "Facebook"
                        ? "bg-blue-400 text-white"
                        : platform?.name === "Frontend Mentor"
                        ? "bg-white text-black"
                        : platform?.name === "Twitch"
                        ? "bg-purple-600 text-white"
                        : platform?.name === "Dev.to"
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                  >
                    <span className="flex items-center">
                      {platform && <platform.icon className="mr-2" />}
                      {platform?.name}
                    </span>
                    <FaArrowRight className="text-xs" />
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeCard;
