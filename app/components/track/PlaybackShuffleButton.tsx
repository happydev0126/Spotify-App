"use client";
import { togglePlaybackShuffle } from "@/app/api/spotify/spotify-api";
import { PlayerContext } from "@/app/context/appContext";
import { useContext } from "react";

export default function PlaybackShuffleButton({ token }: { token: string }) {
  const { is_shuffle } = useContext(PlayerContext);
  const handleClick = () => {
    togglePlaybackShuffle(!is_shuffle, token);
  };
  return (
    <div onClick={handleClick} className={is_shuffle ? "text-green" : ""}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        data-icon="SvgShuffle"
        aria-hidden="true"
      >
        <path d="M21 18h-2.969a6 6 0 01-3.585-1.181M9.341 6.965a6.006 6.006 0 00-3.372-1.03H3m0 12.1h2.969A6.031 6.031 0 0012 12h0a6.031 6.031 0 016.031-6.031H21M18 9l3-3-3-3m.107 18.031l3-3-3-3"></path>
      </svg>
    </div>
  );
}