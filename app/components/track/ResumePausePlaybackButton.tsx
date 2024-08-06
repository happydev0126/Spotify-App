import { pausePlayback, resumePlayback } from "@/app/api/spotify/spotify-api";
import { DeviceContext, PlayerContext } from "@/app/context/appContext";
import Image from "next/image";
import { useContext } from "react";

function PauseTrackButton({
  token,
}: {
  token: string;
  pagePlaylistURI?: string;
}) {
  const { deviceId } = useContext(DeviceContext);
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

function PlayTrackButton({
  token,
  pagePlaylistURI,
}: {
  token: string;
  pagePlaylistURI?: string;
}) {
  const { deviceId } = useContext(DeviceContext);
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
      onClick={(e) => {
        !pagePlaylistURI
          ? resumePlayback(token, deviceId)
          : resumePlayback(token, deviceId, 0, pagePlaylistURI);
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

export default function ResumePausePlaybackButton({
  token,
  pagePlaylistURI,
}: {
  token: string;
  pagePlaylistURI?: string;
}) {
  const { is_paused, currentTrackContext } = useContext(PlayerContext);

  const playlistIsNotPlaying =
    !is_paused && pagePlaylistURI !== currentTrackContext;

  const playlistIsPlaying =
    !is_paused && pagePlaylistURI === currentTrackContext;

  if (pagePlaylistURI === undefined) {
    return is_paused ? (
      <PlayTrackButton token={token} />
    ) : (
      <PauseTrackButton token={token} />
    );
  }

  if (is_paused && pagePlaylistURI !== currentTrackContext) {
    return <PlayTrackButton token={token} pagePlaylistURI={pagePlaylistURI} />;
  }

  //check if its paused and the playlist is not the same => show PLAY new button
  if (playlistIsPlaying) {
    return <PauseTrackButton token={token} />;
  }

  if (playlistIsNotPlaying) {
    return <PlayTrackButton token={token} pagePlaylistURI={pagePlaylistURI} />;
  }

  return (
    <div>
      {is_paused ? (
        <PlayTrackButton token={token} />
      ) : (
        <PauseTrackButton token={token} />
      )}
    </div>
  );
}
