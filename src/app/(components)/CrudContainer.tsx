import React, { useState, useEffect } from "react";
import {
  Bars2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  LinkIcon,
} from "@heroicons/react/16/solid";
import {
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaUserAstronaut,
  FaTwitch,
  FaCodepen,
  FaFreeCodeCamp,
} from "react-icons/fa";
import { PiDevToLogo } from "react-icons/pi";
import { BsGitlab } from "react-icons/bs";
import { SiCodewars, SiHashnode } from "react-icons/si";

const platforms = [
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

interface Link {
  id: number;
  platform: string;
  url: string;
}

interface CrudContainerProps {
  id: number;
  index: number;
  onRemove: (id: number) => void;
  onLinkChange: (id: number, updatedLink: Link) => void;
}

const CrudContainer: React.FC<CrudContainerProps> = ({
  id,
  index,
  onRemove,
  onLinkChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [newLink, setNewLink] = useState<Link>({
    id,
    platform: "GitHub",
    url: "",
  });
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    // Update local state when props change
    setNewLink((prevLink) => ({
      ...prevLink,
      id,
    }));
  }, [id]);

  const currentPlatform = platforms.find((p) => p.name === newLink.platform);

  const handlePlatformChange = (platform: string) => {
    setNewLink((prevLink) => {
      const updatedLink = { ...prevLink, platform };
      onLinkChange(id, updatedLink);
      return updatedLink;
    });
  };

  const handleUrlChange = (url: string) => {
    // Validate the URL
    const isValidUrl = validateUrl(url);
    if (isValidUrl) {
      setUrlError(null);
      setNewLink((prevLink) => {
        const updatedLink = { ...prevLink, url };
        onLinkChange(id, updatedLink);
        return updatedLink;
      });
    } else {
      setUrlError("Invalid URL format");
    }
  };

  const validateUrl = (url: string) => {
    // Regular expression for URL validation
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // Protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // Domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // Query string
      "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // Fragment locator
    return !!urlPattern.test(url);
  };

  return (
    <div className="w-full bg-gray-50 rounded-xl p-4 space-y-2 mt-6">
      <div className="flex items-center justify-between">
        <h4 className="flex items-center text-gray-500 font-bold">
          <Bars2Icon className="w-5 h-5 mr-3" /> Link #{index}
        </h4>
        <button className="text-sm text-gray-500" onClick={() => onRemove(id)}>
          Remove
        </button>
      </div>
      <div className="relative flex-1 ">
        <div>
          <label className="text-xs">Platform</label>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between bg-white w-full px-4 py-2 border rounded-md focus:outline-none login-focus"
          >
            <div className="flex items-center space-x-4">
              {currentPlatform && (
                <currentPlatform.icon className=" text-gray-500" />
              )}
              <span className=" text-xs">{newLink.platform}</span>
            </div>
            {dropdownOpen ? (
              <ChevronUpIcon className="w-5 h-5 link-color" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 link-color" />
            )}
          </button>
          {dropdownOpen && (
            <ul className="absolute left-0 w-full h-52 py-2 px-4 mt-2 overflow-y-scroll bg-white border   rounded-md shadow-lg z-10">
              {platforms.map((platform) => (
                <li
                  key={platform.name}
                  onClick={() => handlePlatformChange(platform.name)}
                  className="flex items-center px-4 py-2 cursor-pointer text-xs hover:text-blue-500 space-x-4 border-b border-b-gray-200"
                >
                  <platform.icon className="w-4 h-4 text-gray-600" />
                  <span>{platform.name}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-2">
            <label className="text-xs">Link</label>
            <div className="absolute left-0 bottom-3 flex items-center pl-3 pointer-events-none">
              <LinkIcon className="w-4 h-4 text-gray-600" />
            </div>
            <input
              type="text"
              value={newLink.url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="Add a new link"
              className={`w-full px-5 py-2 indent-6 text-sm overflow-hidden border rounded-md focus:outline-none login-focus pr-10 ${
                urlError ? "border-red-500" : ""
              }`}
            />
            {urlError && <p className="text-xs text-red-500">{urlError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudContainer;
