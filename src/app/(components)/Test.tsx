"use client";

import React, { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

interface Link {
  id: number;
  platform: string;
  url: string;
}

const platforms = ["GitHub", "YouTube", "LinkedIn", "Facebook", "Frontend Mentor"];

const Customize: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [newLink, setNewLink] = useState<Link>({ id: 0, platform: "", url: "" });
  const [editing, setEditing] = useState<Link | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleAddLink = () => {
    if (newLink.platform && newLink.url) {
      setLinks([...links, { ...newLink, id: Date.now() }]);
      setNewLink({ id: 0, platform: "", url: "" });
      setDropdownOpen(false); // Close the dropdown after adding a link
    }
  };

  const handleEditLink = (link: Link) => {
    setEditing(link);
    setNewLink(link);
  };

  const handleSaveEdit = () => {
    if (editing) {
      setLinks(links.map((link) => (link.id === editing.id ? newLink : link)));
      setEditing(null);
      setNewLink({ id: 0, platform: "", url: "" });
    }
  };

  const handleRemoveLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-6 space-y-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-extrabold text-gray-900">Customize your links</h2>
        <p className="text-sm text-gray-600">Add/edit/remove links below and then share all your profiles with the world!</p>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  {newLink.platform || "Select platform"}
                  {dropdownOpen ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </button>
                {dropdownOpen && (
                  <ul className="absolute left-0 w-full py-2 mt-2 overflow-hidden bg-white border rounded-md shadow-lg">
                    {platforms.map((platform) => (
                      <li
                        key={platform}
                        onClick={() => {
                          setNewLink({ ...newLink, platform });
                          setDropdownOpen(false);
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {platform}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type="text"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="Add a new link"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              {editing ? (
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleAddLink}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md focus:outline-none"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.id} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <strong>{link.platform}:</strong> <a href={link.url} className="text-blue-600 hover:underline">{link.url}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditLink(link)}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button className="w-full px-4 py-2 text-white bg-purple-600 rounded-md focus:outline-none">
          Save
        </button>
      </div>
    </div>
  );
};

export default Customize;
