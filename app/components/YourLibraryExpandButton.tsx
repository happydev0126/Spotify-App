"use client";
import React, { useState } from "react";
import UserLibrary from "./Library";
import { Album, CurrentUserPlaylist } from "../types/spotify";
import Card from "./ui/Card";

export default function YourLibraryExpandButton({
  library,
}: {
  library: Array<CurrentUserPlaylist | Album>;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleExpandLibrary = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card
      className={`flex h-screen-minus-5rem flex-col overflow-y-scroll md:h-full ${!isExpanded ? "h-fit" : ""}`}
    >
      <div className="flex items-center gap-2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          data-icon="SvgLibrary"
          aria-hidden="true"
        >
          <path d="M20.332 20L16.844 4M12 20V4M6 20V4"></path>
        </svg>
        <button onClick={handleExpandLibrary}>Your library</button>
      </div>
      {isExpanded && (
        <div>
          <UserLibrary library={library} />
        </div>
      )}
    </Card>
  );
}
