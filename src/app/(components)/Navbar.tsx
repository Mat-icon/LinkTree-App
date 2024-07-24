'use client';

import { LinkIcon } from "@heroicons/react/16/solid";
import { EyeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  setActivePage: (page: 'links' | 'profile') => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActivePage }) => {
  return (
    <div className="w-full h-14 flex items-center justify-between rounded-lg p-4 bg-white .instrument-sans">
      <Image
        src="/images/Group 252.png"
        alt="logo"
        width={100}
        height={37}
        className="hidden lg:block"
      />
       <Image
        src="/images/Group 251.png"
        alt="logo"
        width={35}
        height={35}
        className="block lg:hidden"
      />
      <div className="nav-links flex space-x-2">
        <button
          onClick={() => setActivePage('links')}
          className="links hidden lg:flex items-center hover:text-blue-500 text-gray-500 text-sm px-6 font-semibold link-bg p-3 rounded-md"
        >
          <LinkIcon className="w-4 h-4 mr-2" />
          Links
        </button>
        <button
          onClick={() => setActivePage('links')}
          className="links lg:hidden link-color text-sm px-4 font-semibold link-bg py-2 rounded-md"
        >
          <LinkIcon className="w-4 h-4 link-color" />
          
        </button>
        <button
          onClick={() => setActivePage('profile')}
          className="profile lg:hidden block  text-gray-500  hover:text-blue-600 items-center text-sm p-3 rounded-xl px-6 font-semibold"
        >
          <UserCircleIcon className="w-4 h-4 mr-2" />

        </button>
        <button
          onClick={() => setActivePage('profile')}
          className="profile hidden text-gray-500 link-bg lg:flex hover:text-blue-600 items-center text-sm p-3 rounded-md px-6 font-semibold"
        >
          <UserCircleIcon className="w-4 h-4 mr-2" />
          Profile Details
        </button>
      </div>

      <div className="">
      <Link href='/' className="lg:hidden block link-color text-xs p-2 rounded-md preview font-semibold">
          <EyeIcon className="w-4 h-4"/>
        </Link>
        <Link href='/' className="hidden lg:block link-color text-xs p-3 px-6 rounded-md preview font-semibold">
          Preview
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
