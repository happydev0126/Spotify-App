'use client'
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/appContext";
import Link from "next/link";
import { convertMsToTimestamp } from "../lib/utils/convertMsToTimestamp";

export default function Player({ className }: { className: string }) {
  const { player, is_paused, current_track, position } = useContext(PlayerContext)
  const [volume, setVolume] = useState(0.5)
  const [prevVolume, setPrevVolume] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [trackPositionInMs, setTrackPositionInMs] = useState(position)

  useEffect(() => {
    const timeout = setInterval(() => {
      setTrackPositionInMs(prev => prev + 1000)
    }, 1000);

    if (is_paused) { clearInterval(timeout) }

    return () => {
      clearInterval(timeout)
    }
  }, [is_paused])

  useEffect(() => {
    setTrackPositionInMs(position)
  }, [position, current_track])


  const getId = (string: string) => {
    const id = string.split(':')
    return id[id.length - 1]
  }


  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setIsMuted(false)
    setVolume(() => +e.target.value)
    player?.setVolume(+e.target.value)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      setPrevVolume(volume)
      setVolume(0)
      player?.setVolume(0)
    } else {
      setVolume(prevVolume)
      player?.setVolume(prevVolume)
    }
  }

  const handleTrackPosition = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackPositionInMs(+e.currentTarget.value)
  }

  const handleMouseUp = () => {
    player?.seek(trackPositionInMs)
  }

  return (
    <div className={`flex h-16 w-full items-center justify-between ${className}`} >
      <div className="flex gap-2 items-center w-[30%]">
        {current_track &&
          <>
            <img
              src={current_track.album.images[current_track.album.images.length - 1].url}
              className="now-playing__cover size-12 rounded"
              alt={current_track.album.name} />
            <Link
              href={`../artist/${getId(current_track.artists[0].uri)}`}
              className="now-playing__side">
              <div className="now-playing__name">
                {current_track.name}
              </div>

              <div className="now-playing__artist text-xs text-gray-400">
                {current_track.artists[0].name}
              </div>
            </Link>
          </>
        }
      </div>
      <div className="flex flex-col gap-1 w-[40%] justify-center items-center">
        <div className="flex items-center justify-center gap-4">
          <button
            className=""
            onClick={() => { player?.previousTrack() }} >
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
              aria-hidden="true">
              <path d="M17.767 19.664a1 1 0 001.633-.774V5.11a1 1 0 00-1.633-.774L13.9 7.5l-4.554 3.726a1 1 0 000 1.548L13.9 16.5zM4.6 21V3"></path>
            </svg>
          </button>

          <button
            className="bg-white rounded-full text-black w-8 h-8 flex justify-center items-center"
            onClick={() => { player?.togglePlay() }} >
            {is_paused ?
              <img src="/icons/track/playBlack.svg" alt="Play" />
              :
              <img src="/icons/track/pauseBlack.svg" alt="Pause" />
            }
          </button>
          <button
            className=""
            onClick={() => { player?.nextTrack() }} >
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
              aria-hidden="true">
              <path d="M14.4 12.524a1 1 0 000-1.548L9.85 7.25 5.983 4.086a1 1 0 00-1.633.774v13.78a1 1 0 001.633.774L9.85 16.25zm4.75-9.774v18"></path>
            </svg>
          </button>
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center gap-1 text-sm text-zinc-400">
            <span>
              {convertMsToTimestamp(trackPositionInMs)}
            </span>
            <input
              id="default-range"
              onChange={e => handleTrackPosition(e)}
              onMouseUp={handleMouseUp}
              type="range"
              min={0}
              max={current_track?.duration_ms}
              step={1000}
              value={trackPositionInMs}
              className="w-full h-1.5 accent-green cursor-pointer "
            />
            {current_track &&
              <span>
                {convertMsToTimestamp(current_track?.duration_ms)}
              </span>
            }
          </div>
        </div>
      </div>
      <div className="w-[30%] flex justify-end items-center gap-3">
        {player &&
          <>
            <button onClick={handleMute}>
              {isMuted || volume == 0 ?
                <svg
                  data-encore-id="icon"
                  role="presentation"
                  aria-label="Volume off"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="inline text-gray-50/10 fill-gray-50/50 w-5"
                >
                  <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
                </svg> :
                <svg
                  data-encore-id="icon"
                  role="presentation"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="inline text-gray-50/10 fill-gray-50/50 w-5"
                >
                  <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z"></path>
                </svg>
              }
            </button>
            <input
              id="default-range"
              onChange={handleVolume}
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              className="w-36 h-1.5  accent-green cursor-pointer "
            />

          </>
        }
      </div>
    </div >
  )
}

