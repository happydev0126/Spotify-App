import { pausePlayback, resumePlayback } from "@/app/api/spotify/spotify-api";
import { DeviceContext, PlayerContext } from "@/app/context/appContext";
import Image from "next/image";
import { useContext } from "react";

export default function ResumePausePlaybackButton({
  token,
  pagePlaylistURI,
}: {
  token: string;
  pagePlaylistURI?: string;
}) {
  const { deviceId } = useContext(DeviceContext);
  const { is_paused, currentTrackContext } = useContext(PlayerContext);

  const playlistIsNotPlaying =
    !is_paused && pagePlaylistURI !== currentTrackContext;

  const playlistIsPlaying =
    !is_paused && pagePlaylistURI === currentTrackContext;

  if (pagePlaylistURI === undefined) {
    return is_paused ? (
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
        onClick={(e) => {
          console.log({ is_paused }, { pagePlaylistURI }, currentTrackContext);
          resumePlayback(token, deviceId);
          e.stopPropagation();
        }}
      >
        <Image
          width={48}
          height={48}
          src="/icons/track/playBlack.svg"
          alt="Play"
        />
      </button>
    ) : (
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
        onClick={(e) => {
          console.log({ is_paused }, { pagePlaylistURI }, currentTrackContext);
          pausePlayback(token, deviceId);
          e.stopPropagation();
        }}
      >
        <Image
          width={32}
          height={32}
          src="/icons/track/pauseBlack.svg"
          alt="Pause"
        />
      </button>
    );
  }

  if (is_paused && pagePlaylistURI !== currentTrackContext) {
    return (
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
        onClick={(e) => {
          resumePlayback(token, deviceId, 0, pagePlaylistURI);
          e.stopPropagation();
        }}
      >
        <Image
          width={48}
          height={48}
          src="/icons/track/playBlack.svg"
          alt="Play"
        />
      </button>
    );
  }

  //check if its paused and the playlist is not the same => show PLAY new button
  if (playlistIsPlaying) {
    return (
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
        onClick={(e) => {
          pausePlayback(token, deviceId);
          e.stopPropagation();
        }}
      >
        <Image
          width={32}
          height={32}
          src="/icons/track/pauseBlack.svg"
          alt="Pause"
        />
      </button>
    );
  }

  if (playlistIsNotPlaying) {
    return (
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
        onClick={(e) => {
          console.log({ is_paused }, { pagePlaylistURI }, currentTrackContext);
          resumePlayback(token, deviceId, 0, pagePlaylistURI);
          e.stopPropagation();
        }}
      >
        <Image
          width={48}
          height={48}
          src="/icons/track/playBlack.svg"
          alt="Play"
        />
      </button>
    );
  }

  return (
    <div>
      {is_paused ? (
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
          onClick={(e) => {
            console.log("default clicked");
            console.log(
              { is_paused },
              { pagePlaylistURI },
              currentTrackContext,
            );
            resumePlayback(token, deviceId);
            e.stopPropagation();
          }}
        >
          <Image
            width={48}
            height={48}
            src="/icons/track/playBlack.svg"
            alt="Play"
          />
        </button>
      ) : (
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
          onClick={(e) => {
            console.log("default clicked");
            console.log(
              { is_paused },
              { pagePlaylistURI },
              currentTrackContext,
            );
            pausePlayback(token, deviceId);
            e.stopPropagation();
          }}
        >
          <Image
            width={32}
            height={32}
            src="/icons/track/pauseBlack.svg"
            alt="Pause"
          />
        </button>
      )}
    </div>
  );
}
