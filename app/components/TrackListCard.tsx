'use client'

import Link from "next/link";
import PlayTrackButton from "./track/PlayTrackButton";
import { Album, Artist, Playlist } from "../types/spotify";
import { useContext } from "react";
import { PlayerContext } from "../context/appContext";

type MusicSource = Album | Artist | Playlist
export default function TrackListCard({ listItem, token }: { listItem: Artist | Playlist | Album, token: string }) {
  if (listItem.images.length === 0) return
  const getItemSource = (item: MusicSource): string => {
    if (item.type === 'artist') return 'artist';
    if (item.type === 'playlist') return 'playlist';
    if (item.type === 'album') return 'album';
    return '';
  };

  const itemSource = getItemSource(listItem);

  return (
    <div>
      <Link href={`/${itemSource}/${listItem.id}`} key={listItem.id} className="flex flex-col items-start gap-2 p-2 rounded hover:bg-gray-50/10">
        <img src={listItem.images[0]?.url} className="min-w-[11rem] max-w-[11rem] ratio aspect-square rounded" alt={listItem.name} />
        <div className="flex flex-col">
          <p className="w-full font-bold text-sm">
            {listItem.name}
          </p>
          <p className="w-full text-sm text-zinc-400">
            {listItem.type}
          </p>
        </div>
      </Link>
      <PlayTrackButton index={0} token={token} playlist_uri={listItem.uri} />
    </div>
  )
}
