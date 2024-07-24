// components/ProfilePage.tsx
import React, { useState } from "react";
import Image from "next/image";
import { db, auth, storage } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserProfile } from "./UserProfileContext";
import { useToast } from "./ToastContext";

const ProfilePage: React.FC = () => {
  const { profile, setProfile } = useUserProfile();
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    profile.imageUrl || null
  );
  const [user] = useAuthState(auth);
  const { addToast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (user) {
      try {
        let imageUrl = profile.imageUrl;
        if (image) {
          const imageRef = ref(
            storage,
            `profile_images/${user.uid}/${image.name}`
          );
          await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(imageRef);
        }

        const userRef = doc(db, "users", user.uid);
        await setDoc(
          userRef,
          { firstName, lastName, email, imageUrl },
          { merge: true }
        );
        setProfile({ ...profile, firstName, lastName, email, imageUrl });
        addToast("Profile saved successfully!", "success");
      } catch (error) {
        console.error("Error saving profile:", error);
        addToast("Error saving profile. Please try again.", "error");
      }
    } else {
      addToast("You must be logged in to save your profile.", "error");
    }
  };

  return (
    <div className="w-full lg:w-7/12">
      <div className="w-full h-auto bg-white flex flex-col px-5 lg:px-10 pb-16 pt-10 rounded-t-xl border-b border-gray-200">
        <h1 className="text-2xl font-semibold mb-4">Profile Details</h1>
        <p className="text-gray-500 text-sm mb-6">
          Add your details to create a personal touch to your profile.
        </p>

        <div className="w-full flex mb-6">
          <div className="w-full h-auto flex lg:items-center lg:flex-row flex-col bg-gray-100 p-4 rounded-lg space-y-4 lg:space-x-4">
            <p className="lg:w-1/3 w-full text-gray-500 text-sm">
              Profile Picture
            </p>
            <div className="lg:w-1/3 w-44 h-48 rounded-lg relative overflow-hidden">
              <div className="w-full h-full absolute flex  bg-black opacity-45">
                <input
                  type="file"
                  id="browse"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs mt-12 ml-8 lg:ml-11 relative z-20"
                />
              </div>

              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile Preview"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={profile.imageUrl || "/images/upload-icon.png"}
                  alt="Upload Image"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              )}
            </div>
            <div className="lg:w-1/3 w-full text-xs text-gray-500 mt-2">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-gray-100 px-4 rounded-xl py-4 space-y-4 md:space-y-2">
          <div className="flex md:flex-row flex-col md:items-center md:justify-between">
            <label className="text-xs font-medium md:mb-0 mb-1 text-gray-700">
              First name*
            </label>
            <input
              type="text"
              className="md:w-3/5 login-focus w-full p-3 text-sm border rounded-md focus:outline-none "
              placeholder="e.g. John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center md:justify-between">
            <label className="text-xs font-medium md:mb-0 mb-1 text-gray-700">
              Last name*
            </label>
            <input
              type="text"
              className="md:w-3/5 w-full login-focus p-3 border text-sm rounded-md focus:outline-none "
              placeholder="e.g. Appleseed"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex md:flex-row flex-col md:items-center md:justify-between">
            <label className="text-xs font-medium md:mb-0 mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="md:w-3/5 w-full text-sm p-3 border login-focus border-gray-300 rounded-md focus:outline-none "
              placeholder="e.g. email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="text-end w-full px-4 md:px-0 py-4 md:pr-10 bg-white rounded-b-xl h-auto">
        <button
          onClick={handleSave}
          className="md:w-2/12 w-full btn text-white p-3 px-6 text-sm rounded-md focus:outline-none"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
