import React from "react";
import Card from "./ui/Card";
import { Album, CurrentUserPlaylist } from "../types/spotify";
import Link from "next/link";
import {
  getCurrentUserPlaylists,
  getUsersAlbums,
} from "../api/spotify/spotify-api";
import YourLibraryExpandButton from "./YourLibraryExpandButton";

export default async function Dashboard() {
  let playlists = await getCurrentUserPlaylists().then((data) => data.items);
  let albums = await getUsersAlbums();

  let library: Array<CurrentUserPlaylist | Album> = [...playlists];
  albums?.items.forEach(({ album }) => {
    library.push(album);
  });

  return (
    <div className="mb-2 flex w-full flex-col gap-2 md:mb-0 md:h-full">
      <YourLibraryExpandButton library={library} />
    </div>
  );
}
