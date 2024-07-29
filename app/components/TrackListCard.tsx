"use client";

import Link from "next/link";
import PlayTrackButton from "./track/PlayTrackButton";
import { Album, Artist, Playlist } from "../types/spotify";
import { useContext } from "react";
import { PlayerContext } from "../context/appContext";
import isCurrentlyPlaying from "../lib/utils/isCurrentlyPlaying";
import PauseTrackButton from "./track/PauseTrackButton";
import Image from "next/image";

type MusicSource = Album | Artist | Playlist;
export default function TrackListCard({
  listItem,
  token,
}: {
  listItem: Artist | Playlist | Album;
  token: string;
}) {
  const { currentTrackContext, is_paused } = useContext(PlayerContext);
  if (listItem.images.length === 0) return;
  const getItemSource = (item: MusicSource): string => {
    if (item.type === "artist") return "artist";
    if (item.type === "playlist") return "playlist";
    if (item.type === "album") return "album";
    return "";
  };

  const itemSource = getItemSource(listItem);

  return (
    <div>
      <Link
        href={`/${itemSource}/${listItem.id}`}
        key={listItem.id}
        className="group flex flex-col items-start gap-2 rounded p-2 hover:bg-gray-50/10"
      >
        <div className="relative">
          <Image
            src={listItem.images[0]?.url}
            className="ratio aspect-square min-w-[11rem] max-w-[11rem] rounded"
            width={156}
            height={156}
            alt={listItem.name}
          />
          {itemSource !== "artist" && (
            <div className="hidden group-hover:block">
              {isCurrentlyPlaying(currentTrackContext, listItem.uri) &&
              !is_paused ? (
                <PauseTrackButton token={token} variant="green" />
              ) : (
                <PlayTrackButton
                  index={0}
                  token={token}
                  playlist_uri={listItem.uri}
                  variant="green"
                  isPlaying={isCurrentlyPlaying(
                    currentTrackContext,
                    listItem.uri,
                  )}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="w-full text-sm font-bold">{listItem.name}</p>
          <p className="w-full text-sm text-zinc-400">{listItem.type}</p>
        </div>
      </Link>
    </div>
  );
}
