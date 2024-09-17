"use client";
import { setRepeatMode } from "@/app/api/spotify/spotify-api";
import { PlayerContext } from "@/app/context/appContext";
import { useContext } from "react";
import Button from "../Button";

export default function SetRepeatModeButton({ token }: { token: string }) {
  const { is_repeat } = useContext(PlayerContext);
  const handleClick = () => {
    if (is_repeat === 0) {
      setRepeatMode("context", token);
    } else if (is_repeat === 1) {
      setRepeatMode("track", token);
    } else setRepeatMode("off", token);
  };
  return (
    <Button
      onClick={handleClick}
      className={`relative justify-center flex gap-1 text-center ${is_repeat == 0 ? "" : "text-green"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        data-icon="SvgRepeat"
        aria-hidden="true"
      >
        <path d="M17.251 3L21 6.752 17.251 10.5M21 6.759H5.805A2.807 2.807 0 003 9.566v1.628m3.751 2.35L3 17.3 6.7 21M3 17.289h15.2a2.807 2.807 0 002.8-2.808v-1.628"></path>
      </svg>
      <span className="absolute bg-black text-sm pointer-events-none">
        {is_repeat == 2 && "1"}
      </span>
    </Button>
  );
}
