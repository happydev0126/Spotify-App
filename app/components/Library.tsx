"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Album, CurrentUserPlaylist } from "../types/spotify";
import { useRouter } from "next/navigation";
import { PlayerContext } from "../context/appContext";
import TagButton from "./ui/TagButton";
import isCurrentlyPlaying from "../lib/utils/isCurrentlyPlaying";
import Image from "next/image";

export default function UserLibrary({
  library,
  isExpanded,
}: {
  library: Array<CurrentUserPlaylist | Album>;
  isExpanded: boolean;
}) {
  const { currentTrackContext } = useContext(PlayerContext);
  const [userLibrary, setUserLibrary] =
    useState<Array<CurrentUserPlaylist | Album>>();
  const [searchInput, setSearchInput] = useState("");
  const [filterLibraryType, setFilterLibraryType] = useState("all");
  const router = useRouter();

  useEffect(() => {
    setUserLibrary(library);
  }, [library]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  };

  if (!userLibrary) {
    return <div>No playlists found</div>;
  }

  const handleClick = (e: any, type: string, id: string) => {
    e.stopPropagation();
    router.push(type === "playlist" ? `/playlist/${id}` : `/album/${id}`);
  };

  const handleFilterTag = (type: "album" | "playlist" | "all") => {
    if (type === filterLibraryType) {
      setFilterLibraryType("all");
    } else {
      setFilterLibraryType(type);
    }
  };

  const filterLibrary = (library: (CurrentUserPlaylist | Album)[]) => {
    if (filterLibraryType === "all") {
      return library.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchInput),
      );
    }
    return library.filter(
      (playlist) =>
        playlist.name.toLowerCase().includes(searchInput) &&
        playlist.type === filterLibraryType,
    );
  };

  return (
    <div className="flex flex-col ">
      {isExpanded && (
        <>
          <div className="mb-3 flex gap-2">
            {filterLibraryType !== "all" && (
              <TagButton title="X" onClick={() => handleFilterTag("all")} />
            )}
            {filterLibraryType === "album" ||
              ("all" && (
                <TagButton
                  onClick={() => handleFilterTag("playlist")}
                  title="playlists"
                />
              ))}
            {filterLibraryType === "playlist" ||
              ("all" && (
                <TagButton
                  onClick={() => handleFilterTag("album")}
                  title="albums"
                />
              ))}
          </div>
          <form>
            <input
              className="mb-2 w-full rounded bg-stone-500/20 p-1 px-2 text-sm placeholder-gray-300"
              placeholder="Search in your library"
              onChange={(e) => handleSearch(e)}
              type="text"
            />
          </form>
        </>
      )}
      {filterLibrary(userLibrary).map((playlist) => (
        <div
          key={playlist.id}
          onClick={(e) => handleClick(e, playlist.type, playlist.id)}
          className="w-full rounded from-white/0 to-white/5 py-2 hover:cursor-pointer hover:bg-gradient-to-r active:bg-black"
        >
          <div className="flex w-full items-center justify-between overflow-hidden">
            <div className="flex w-max flex-row items-center gap-3 overflow-hidden">
              <Image
                src={playlist.images[playlist.images.length - 1].url}
                alt="Image"
                width={48}
                height={48}
                className="max-w-12 rounded"
              />
              {isExpanded && (
                <>
                  <div className="flex overflow-hidden">
                    <div className="flex flex-col overflow-hidden">
                      <div
                        className={`${isCurrentlyPlaying(currentTrackContext, playlist.uri) ? `text-green` : ""} overflow-hidden text-ellipsis whitespace-nowrap`}
                      >
                        {playlist.name}
                      </div>
                      <div className="overflow-hidden text-sm capitalize text-gray-400">
                        <span>
                          {playlist.type}
                          {" • "}
                          {"owner" in playlist
                            ? playlist.owner.display_name
                            : playlist.artists.map((artist, index) => (
                                <span key={artist.id}>
                                  {artist.name}
                                  {playlist.artists.length > 1 &&
                                    playlist.artists.length !== index + 1 && (
                                      <>{", "}</>
                                    )}
                                </span>
                              ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {isExpanded &&
              isCurrentlyPlaying(currentTrackContext, playlist.uri) && (
                <div>
                  <svg
                    data-encore-id="icon"
                    role="img"
                    aria-hidden="true"
                    className="inline w-4 fill-green text-gray-50/10"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.016 1.125A.75.75 0 0 0 8.99.85l-6.925 4a3.639 3.639 0 0 0 0 6.299l6.925 4a.75.75 0 0 0 1.125-.65v-13a.75.75 0 0 0-.1-.375zM11.5 5.56a2.75 2.75 0 0 1 0 4.88V5.56z"></path>
                    <path d="M16 8a5.752 5.752 0 0 1-4.5 5.614v-1.55a4.252 4.252 0 0 0 0-8.127v-1.55A5.752 5.752 0 0 1 16 8z"></path>
                  </svg>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
