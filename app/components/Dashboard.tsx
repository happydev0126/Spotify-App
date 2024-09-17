import React from "react";
import { Album, CurrentUserPlaylist } from "../types/spotify";
import {
  getCurrentUserPlaylists,
  getUsersAlbums,
} from "../api/spotify/spotify-api";
import YourLibrary from "./YourLibrary";

export default async function Dashboard() {
  let playlists = await getCurrentUserPlaylists().then((data) => data.items);
  let albums = await getUsersAlbums();

  let library: Array<CurrentUserPlaylist | Album> = [...playlists];
  albums?.items.forEach(({ album }) => {
    library.push(album);
  });

  return (
    <div className="mb-2 max-w-96 flex flex-col gap-2 md:mb-0 md:h-full">
      <YourLibrary library={library} />
    </div>
  );
}
