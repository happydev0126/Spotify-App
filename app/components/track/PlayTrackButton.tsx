import { MouseEvent, useContext } from "react";
import { DeviceContext, PlayerContext } from "../../context/appContext";
import { resumePlayback } from "../../api/spotify/spotify-api";
import Image from "next/image";

type Variant = "green";

export default function PlayTrackButton({
  token,
  index,
  playlist_uri,
  uris,
  isPlaying,
  variant,
}: {
  index: number;
  token: string;
  playlist_uri?: string;
  uris?: string[];
  isPlaying?: boolean;
  variant?: Variant;
}) {
  const { deviceId, user } = useContext(DeviceContext);
  const { player } = useContext(PlayerContext);

  const handlePlayTrack = (e: MouseEvent) => {
    e.preventDefault();
    if (user?.product !== "premium") {
      alert("Get Spotify Premium to use the player");
      return;
    }
    if (isPlaying && player && deviceId) {
      resumePlayback(token, deviceId);
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

  return (
    <button
      className={
        variant === "green"
          ? "flex items-center justify-center w-12 h-12 absolute bg-green z-50 bottom-2 right-2 rounded-full shadow-lg shadow-zinc-900/50 text-black hover:scale-110"
          : ""
      }
      onClick={(e) => handlePlayTrack(e)}
    >
      {variant === "green" ? (
        <Image
          className="w-8"
          width={32}
          height={32}
          src="/icons/track/playBlack.svg"
          alt="Play"
        />
      ) : (
        <Image width={32} height={32} src="/icons/track/play.svg" alt="Pause" />
      )}
    </button>
  );
}
