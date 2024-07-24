import React from "react";
import Image from "next/image";
import { FaArrowRight, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaFacebook, FaUserAstronaut, FaTwitch, FaCodepen, FaFreeCodeCamp } from "react-icons/fa";
import { PiDevToLogo } from "react-icons/pi";
import { BsGitlab } from "react-icons/bs";
import { SiCodewars, SiHashnode } from "react-icons/si";
import { useUserProfile } from "./UserProfileContext";
import Skeleton from "./Skeleton"; 

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

const PreviewPage: React.FC = () => {
  const { profile } = useUserProfile();
  const isLoading = !profile || !profile.firstName;

  return (
    <div className="w-5/12 h-auto bg-white rounded-xl lg:flex items-center justify-center hidden md:hidden">
      <div className="relative bg-white rounded-3xl border border-gray-300 p-2 phone"> <div className="w-5/12 absolute -top-8 left-20 h-14 border-b border-gray-300 rounded-b-xl"></div>
        <div className="rounded-3xl w-full h-full border border-gray-300 p-8">
         
          <div className="flex flex-col items-center space-y-5">
            {isLoading ? (
              <>
                <Skeleton width="100px" height="100px"   borderRadius='50%'/>
                <Skeleton width="200px" height="20px" borderRadius='5px' />
                <Skeleton width="150px" height="20px" borderRadius='5px' />
                <Skeleton width="100%" height="50px"  borderRadius='5px'/>
                <Skeleton width="100%" height="50px"  borderRadius='5px'/>
                <Skeleton width="100%" height="50px"  borderRadius='5px'/>
                <Skeleton width="100%" height="50px"  borderRadius='5px'/>
              </>
            ) : (
              <>
                <Image
                  className="w-28 h-28 object-cover object-top rounded-full border-4 border-blue-600"
                  src={profile.imageUrl || '/images/user.png'}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="flex flex-col items-center">
                  <h2 className="mt-4 text-xl font-semibold">{profile.firstName} {profile.lastName}</h2>
                  <p className="mt-4 text-sm text-gray-600">{profile.email}</p>
                </div>

                <div className="pt-10 space-y-5 w-full">
                  {profile.links.map((link) => {
                    const platform = platforms.find((p) => p.name === link.platform);
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
      </div>
    </div>
  );
};

export default PreviewPage;
