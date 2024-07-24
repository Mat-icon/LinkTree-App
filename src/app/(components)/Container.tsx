"use client";
import React, { useState } from "react";
import CustomLinks from "./CustomLinks";
import Navbar from "./Navbar";
import PreviewPage from "./Preview";
import ProfileDetails from "./ProfileDetails"; // Assuming you have a ProfileDetails component

const Container: React.FC = () => {
  const [activePage, setActivePage] = useState<"links" | "profile">("links");

  const renderActivePage = () => {
    if (activePage === "profile") {
      return <ProfileDetails />;
    }
    if (activePage === "links") {
      return <CustomLinks />;
    }
  };

  return (
    <div className="w-full h-auto bg-slate-50 flex flex-col items-center p-4">
      <Navbar setActivePage={setActivePage} />
      <div className="w-full flex lg:space-x-4 mt-6">
        <PreviewPage />
        {renderActivePage()}
      </div>
    </div>
  );
};

export default Container;
