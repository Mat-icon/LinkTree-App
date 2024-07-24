'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Link {
  id: number;
  platform: string;
  url: string;
}

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl?: string; 
  links: Link[];
}

interface UserProfileContextProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}

const UserProfileContext = createContext<UserProfileContextProps | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    imageUrl:'',
    links: [],
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextProps => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
