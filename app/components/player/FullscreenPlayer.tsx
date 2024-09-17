import {
  pausePlayback,
  resumePlayback,
  skipToNext,
  skipToPrev,
} from "@/app/api/spotify/spotify-api";
import { DeviceContext, PlayerContext } from "@/app/context/appContext";
import { convertMsToTimestamp } from "@/app/lib/utils/convertMsToTimestamp";
import Image from "next/image";
import Link from "next/link";
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
} from "react";
import PlaybackShuffleButton from "../track/PlaybackShuffleButton";
import SetRepeatModeButton from "../track/SetRepeatModeButton";
import Button from "../Button";
import ResumePausePlaybackButton from "../track/ResumePausePlaybackButton";

export const FullscreenPlayer = ({
  fullScreen,
  getId,
  setFullScreen,
  handleFullScreen,
  trackPositionInMs,
  handleTrackPosition,
  handleMouseUp,
  token,
}: {
  handleFullScreen: () => void;
  getId: (string: string) => string;
  setFullScreen: Dispatch<SetStateAction<boolean>>;
  token: string;
  isMobile: boolean;
  trackPositionInMs: number;
  setTrackPositionInMs: Dispatch<SetStateAction<number>>;
  handleTrackPosition: (e: ChangeEvent<HTMLInputElement>) => void;
  fullScreen: boolean;
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMute: () => void;
  handleMouseUp: () => void;
  volume: number;
  isMuted: boolean;
}) => {
  const { deviceId } = useContext(DeviceContext);
  const { is_paused, current_track } = useContext(PlayerContext);

  const handleSetFullScreen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFullScreen(false);
  };

  const fullScreenPlayer = fullScreen
    ? `flex flex-col md:h-16 w-full items-center justify-between col-span-full h-screen absolute left-0 top-0 bg-background p-4`
    : `flex h-16 w-full items-center justify-between `;

  return (
    <div onClick={handleFullScreen} className="w-full col-span-full">
      <div className={fullScreenPlayer}>
        {fullScreen && (
          <button onClick={(e) => handleSetFullScreen(e)} className="mr-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              data-icon="SvgChevronDown"
              aria-hidden="true"
            >
              <path d="M6 9.1L9 12l3 2.9 3-2.9 3-2.9"></path>
            </svg>
          </button>
        )}
        <div className="flex flex-col gap-2 items-center justify-center w-full ">
          {current_track && (
            <>
              <Image
                src={current_track.album.images[0].url}
                width={500}
                height={500}
                className="size-full rounded"
                alt={current_track.album.name}
              />
              <div className="w-full text-left">
                <Link
                  className="w-fit block"
                  href={`../artist/${getId(current_track.artists[0].uri)}`}
                >
                  <div className="">{current_track.name}</div>

                  <div className="text-zinc-400">
                    {current_track.artists[0].name}
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-center overflow-hidden">
          <div className="w-full">
            <input
              id="default-range"
              onChange={(e) => handleTrackPosition(e)}
              onMouseUp={handleMouseUp}
              type="range"
              min={0}
              max={current_track?.duration_ms}
              step={1000}
              value={trackPositionInMs}
              className="w-full h-1.5 accent-green cursor-pointer "
            />
            <div className="flex justify-between text-gray-400 text-xs">
              <span>
                {current_track && trackPositionInMs > current_track.duration_ms
                  ? convertMsToTimestamp(current_track.duration_ms)
                  : convertMsToTimestamp(trackPositionInMs)}
              </span>
              {current_track && (
                <span>{convertMsToTimestamp(current_track?.duration_ms)}</span>
              )}
            </div>
          </div>
          <div className="w-full flex justify-between items-center mb-16">
            <PlaybackShuffleButton token={token} />

            <Button
              onClick={(e) => {
                skipToPrev(token);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                stroke="currentColor"
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                data-icon="SvgSkipBack"
                aria-hidden="true"
              >
                <path d="M17.767 19.664a1 1 0 001.633-.774V5.11a1 1 0 00-1.633-.774L13.9 7.5l-4.554 3.726a1 1 0 000 1.548L13.9 16.5zM4.6 21V3"></path>
              </svg>
            </Button>
            <ResumePausePlaybackButton token={token} />

            <Button
              className="mr-2 md:mr-0"
              onClick={(e) => {
                skipToNext(token);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                stroke="currentColor"
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                data-icon="SvgSkipForward"
                aria-hidden="true"
              >
                <path d="M14.4 12.524a1 1 0 000-1.548L9.85 7.25 5.983 4.086a1 1 0 00-1.633.774v13.78a1 1 0 001.633.774L9.85 16.25zm4.75-9.774v18"></path>
              </svg>
            </Button>

            <SetRepeatModeButton token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};
