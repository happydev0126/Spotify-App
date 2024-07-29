"use client";
import { useContext, useEffect, useState } from "react";
import { resumePlayback } from "../../api/spotify/spotify-api";
import { DeviceContext, PlayerContext } from "../../context/appContext";
import Link from "next/link";
import type { Track } from "../../types/spotify";
import { usePathname } from "next/navigation";
import { convertMsToTimestamp } from "../../lib/utils/convertMsToTimestamp";
import { isoDateToMonthDayYear } from "../../lib/utils/isoDateToMonthDayYear";
import HandleTrack from "./HandleTrack";
import isCurrentlyPlaying from "@/app/lib/utils/isCurrentlyPlaying";
import Image from "next/image";

interface TrackProps {
  item: Track;
  index: number;
  token: string;
  playlist_uri?: string;
  uris?: string[];
  added_at?: string;
  variant: "trackOnly" | "trackAndDescription" | "all";
}
export default function Track({
  item,
  index,
  token,
  playlist_uri,
  uris,
  added_at,
  variant,
}: TrackProps) {
  const { deviceId, user } = useContext(DeviceContext);
  const { current_track } = useContext(PlayerContext);
  const [isHover, setIsHover] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (current_track) {
      document.title = `${current_track.name} • ${current_track.artists[0].name} `;
    }
  }, [current_track]);

  const handlePlayTrack = () => {
    if (!user) return;
    if (user.product !== "premium") {
      alert("Get Spotify Premium to use the player");
      return;
    }
    if (deviceId) {
      resumePlayback(
        token,
        deviceId,
        index,
        playlist_uri ?? undefined,
        uris ?? undefined,
      );
    }
  };

  const compVariant = () => {
    if (variant === "trackOnly") {
      return "grid-cols-[24px_minmax(200px,95%)_auto]";
    }
    if (variant === "trackAndDescription") {
      return "grid-cols-[24px_minmax(200px,55%)_35%_auto]";
    }
    if (variant === "all") {
      return "grid-cols-[24px_minmax(200px,35%)_30%_20%_auto]";
    }
  };

  const notAvailableOnUsersCountry = item.restrictions;

  const notOnArtist = !pathName.includes("/artist/");
  const notOnAlbum = !pathName.includes("/album/");

  return (
    <div
      role="button"
      key={item.id}
      className={`text-zinc-400 ${notAvailableOnUsersCountry && "opacity-50"} grid ${compVariant()} max-h-16 min-h-14 max-w-full select-none items-center gap-x-3 overflow-hidden rounded px-2 py-1 text-left text-sm hover:cursor-default hover:bg-gray-50/10`}
      onDoubleClick={handlePlayTrack}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="align-center flex w-full min-w-6 justify-center text-sm">
        {notAvailableOnUsersCountry ? (
          <span>{index + 1}</span>
        ) : (
          <HandleTrack
            token={token}
            playlist_uri={playlist_uri}
            index={index}
            uris={uris}
            isHover={isHover}
            item={item}
          />
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        {notOnAlbum && (
          <Link
            href={`/album/${item.album?.id}`}
            className="flex min-h-12 min-w-12 items-center justify-center rounded bg-zinc-800 text-xs"
          >
            {item.album.images.length > 0 ? (
              <Image
                src={item.album?.images[item.album?.images.length - 1].url}
                width={48}
                height={48}
                className="w-12 rounded"
                alt={item.album?.name}
              />
            ) : (
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="white"
                width={16}
              >
                <path d="M10 2v9.5a2.75 2.75 0 1 1-2.75-2.75H8.5V2H10zm-1.5 8.25H7.25A1.25 1.25 0 1 0 8.5 11.5v-1.25z"></path>
              </svg>
            )}
          </Link>
        )}
        <div className="overflow-hidden">
          {/* TRACK NAME */}
          <span
            className={`${isCurrentlyPlaying(current_track?.uri, item.uri) ? " text-green " : " text-white "}text-md block overflow-hidden text-ellipsis whitespace-nowrap font-bold`}
          >
            {item.name}
          </span>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            {notOnArtist &&
              item.artists.map((artist, index) => (
                <div
                  key={artist.id}
                  className="inline overflow-hidden text-ellipsis whitespace-nowrap text-xs"
                >
                  <Link
                    className="inline overflow-hidden text-ellipsis whitespace-nowrap text-xs hover:text-white hover:underline"
                    href={`/artist/${artist.id}`}
                  >
                    {artist.name}
                  </Link>
                  {item.artists.length > 1 &&
                    item.artists.length !== index + 1 && <>{", "}</>}
                </div>
              ))}
          </div>
        </div>
      </div>

      {!(variant === "trackOnly") && (
        <>
          <Link href={`/album/${item.album?.id}`} className="text-xs">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-zinc-400 hover:text-white hover:underline">
              {item.album?.name}
            </div>
          </Link>
          {added_at && (
            <>
              <div>
                {isoDateToMonthDayYear(added_at).month}{" "}
                {isoDateToMonthDayYear(added_at).day},{" "}
                {isoDateToMonthDayYear(added_at).year}
              </div>
              <div className="justify-self-end pr-1">
                {convertMsToTimestamp(item.duration_ms)}
              </div>
            </>
          )}
        </>
      )}
      {!added_at && item.duration_ms && (
        <div className="justify-self-end pr-1">
          {convertMsToTimestamp(item.duration_ms)}
        </div>
      )}
    </div>
  );
}
