// components/CustomizeLinks.tsx
"use client";

import React, { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import StartBanner from "./StartBanner";
import CrudContainer from "./CrudContainer";
import { useUserProfile } from "./UserProfileContext";
import { auth, db } from "@/firebaseConfig"; // Adjust the path as needed
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToast } from "./ToastContext";

interface Link {
  id: number;
  platform: string;
  url: string;
}

const CustomizeLinks: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const { profile, setProfile } = useUserProfile();
  const [user] = useAuthState(auth);
  const {addToast} = useToast();

  useEffect(() => {
    
  }, []);

  const handleAddLink = () => {
    setLinks([...links, { id: Date.now(), platform: "GitHub", url: "" }]);
  };

  const handleRemoveLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleLinkChange = (id: number, updatedLink: Link) => {
    setLinks(links.map((link) => (link.id === id ? updatedLink : link)));
  };

  const handleSave = async () => {
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          {
            links,
          },
          { merge: true }
        );
        setProfile({ ...profile, links });
        addToast("Profile saved successfully!", 'success');
      } catch (error) {
        console.error("Error saving profile:", error);
        addToast('Error saving profile. Please try again.', 'error');
      }
    } else {
      alert("You must be logged in to save your profile.");
    }
  };

  return (
    <div className="w-full lg:w-7/12">
      <div className="w-full p-6 md:p-8 lg:p-10 space-y-4 bg-white rounded-t-xl border-b border-gray-300">
        <h2 className="text-2xl font-extrabold text-gray-900">Customize your links</h2>
        <p className="text-sm text-gray-600">
          Add/edit/remove links below and then share all your profiles with the world!
        </p>
        <div className="space-y-4">
          <button
            onClick={handleAddLink}
            className="link-color mt-10 text-xs p-3 w-full rounded-md preview font-semibold flex justify-center items-center"
          >
            <PlusIcon className="w-3 h-3" />
            Add new link
          </button>
        </div>
        {links.length === 0 ? (
          <StartBanner />
        ) : (
          links.map((link, index) => (
            <CrudContainer
              key={link.id}
              id={link.id}
              index={index + 1}
              onRemove={handleRemoveLink}
              onLinkChange={handleLinkChange}
            />
          ))
        )}
      </div>
      <div className="text-end w-full px-4 md:px-0 py-4 md:pr-10 bg-white rounded-b-xl h-auto">
        <button onClick={handleSave} className="md:w-2/12 w-full btn text-white p-3 px-6 text-sm rounded-md focus:outline-none">
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomizeLinks;
