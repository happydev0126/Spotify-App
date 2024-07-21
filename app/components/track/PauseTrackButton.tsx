import { MouseEvent, useContext } from "react";
import { DeviceContext } from "../../context/appContext";
import { pausePlayback } from "../../api/spotify/spotify-api";
import Image from "next/image";

type Variant = "green";

export default function PauseTrackButton({
  token,
  variant,
}: {
  token: string;
  variant?: Variant;
}) {
  const { deviceId } = useContext(DeviceContext);

  const handlePauseTrack = (e: MouseEvent) => {
    e.preventDefault();
    if (deviceId) {
      pausePlayback(token, deviceId);
    }
  };

  return (
    <button
      className={
        variant === "green"
          ? "flex items-center justify-center w-12 h-12 absolute bg-green z-50 bottom-2 right-2 rounded-full shadow-lg shadow-zinc-900/50 text-black hover:scale-110"
          : ""
      }
      onClick={(e) => handlePauseTrack(e)}
    >
      {variant === "green" ? (
        <Image
          width={32}
          height={32}
          className="w-8"
          src="/icons/track/pauseBlack.svg"
          alt="Play"
        />
      ) : (
        <Image
          width={32}
          height={32}
          src="/icons/track/pause.svg"
          alt="Pause"
        />
      )}
    </button>
  );
}
