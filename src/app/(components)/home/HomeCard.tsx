import React from 'react'
import Image from "next/image";
import { FaArrowRight, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { useUserProfile } from '../UserProfileContext';

const HomeCard = () => {
 const {profile} = useUserProfile();

  return (
    
    <div className="relative bg-white md:rounded-xl md:shadow-lg p-10 w-80 mt-10 md:mt-20 ">
    <div className="flex flex-col items-center space-y-8">
      <Image
        className="w-28 h-28 rounded-full border-2 border-blue-600"
        src="/images/head2.jpg"
        alt="User Avatar"
        width={500}
        height={500}
      />
      <div className="flex flex-col items-center">
      <h2 className="mt-4 text-3xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h2>
      <p className="mt-4 text-sm text-gray-600">{profile.email}</p>
      </div>
     
      <div className=" space-y-5 w-full">
        <a
          href="https://github.com"
          className="flex items-center justify-between text-xs  w-full py-5 px-4   bg-black text-white rounded-lg"
        >
          <span className='flex items-center'><FaGithub className='mr-2'/>GitHub</span> <FaArrowRight className='text-xs'/>
        </a>
        <a
          href="https://youtube.com"
          className="flex items-center justify-between w-full py-5 text-xs  px-4 bg-red-600 text-white rounded-lg"
        >
          <span className='flex items-center'><FaYoutube className='mr-2'/>YouTube</span>
          <FaArrowRight className='text-xs'/>
        </a>
        <a
          href="https://linkedin.com"
          className="flex items-center justify-between w-full py-5 text-xs  px-4 bg-blue-600 text-white rounded-lg"
        >
          <span className='flex items-center'><FaLinkedin className='mr-2'/>LinkedIn</span>
          <FaArrowRight className='text-xs'/>
        </a>
      </div>
    </div>
  </div>
  )
}

export default HomeCard