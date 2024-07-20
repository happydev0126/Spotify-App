'use client'
import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { DeviceContext, PlayerContext } from "../context/appContext";
import Link from "next/link";
import { convertMsToTimestamp } from "../lib/utils/convertMsToTimestamp";
import { pausePlayback, resumePlayback, setPlaybackPosition, setPlaybackVolume, skipToNext, skipToPrev } from "../api/spotify/spotify-api";

export default function Player({ token }: { token: string }) {
  const { player, is_paused, current_track, position } = useContext(PlayerContext)
  const { deviceId } = useContext(DeviceContext)
  const [volume, setVolume] = useState(50)
  const [prevVolume, setPrevVolume] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [trackPositionInMs, setTrackPositionInMs] = useState(position)


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      if (current_track !== undefined) {
        setFullScreen(window.innerWidth <= 768)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


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
    setPlaybackVolume(+e.target.value, token)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      setPrevVolume(volume)
      setVolume(0)
      setPlaybackVolume(0, token)
    } else {
      setVolume(prevVolume)
      setPlaybackVolume(prevVolume, token)
    }
  }

  const handleTrackPosition = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackPositionInMs(+e.currentTarget.value)
  }

  const handleMouseUp = () => {
    setPlaybackPosition(trackPositionInMs, token)
  }

  const handleFullScreen = (e: MouseEvent<HTMLDivElement>) => {
    if (current_track === undefined) return
    if (!isMobile) return
    setFullScreen(true)
    if (!fullScreen) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSetFullScreen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setFullScreen(false)
  }

  const fullScreenPlayer = fullScreen ?
    `flex flex-col md:h-16 w-full items-center justify-between col-span-full h-screen absolute left-0 top-0 bg-background p-4` :
    `flex h-16 w-full items-center justify-between `

  const floatingPlayer = !fullScreen && isMobile && `fixed bottom-0 left-0 bg-background p-2`

  if (!fullScreen) return (
    <div onClick={handleFullScreen} className={`flex h-16 w-full items-center justify-between col-span-full ${floatingPlayer}`} >
      <div className="flex gap-2 items-center md:w-[30%]">
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
      <div className="flex flex-col gap-1 md:w-[40%] justify-center items-center">
        <div className="flex items-center justify-center gap-4">
          <button
            className=""
            onClick={(e) => { skipToPrev(token); e.stopPropagation() }} >
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

          {is_paused ?
            <button
              className="bg-white rounded-full text-black w-8 h-8 flex justify-center items-center"
              onClick={(e) => { resumePlayback(token, deviceId); e.stopPropagation() }} >
              <img src="/icons/track/playBlack.svg" alt="Play" />
            </button>
            :

            <button
              className="bg-white rounded-full text-black w-8 h-8 flex justify-center items-center"
              onClick={(e) => { pausePlayback(token, deviceId); e.stopPropagation() }} >
              <img src="/icons/track/pauseBlack.svg" alt="Pause" />
            </button>
          }
          <button
            className="mr-2 md:mr-0"
            onClick={(e) => { skipToNext(token); e.stopPropagation() }} >
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
        {!isMobile &&
          <div className="w-full">
            <div className="flex flex-row items-center gap-1 text-sm text-zinc-400">
              <span>
                {current_track && trackPositionInMs > current_track.duration_ms ?
                  convertMsToTimestamp(current_track.duration_ms) :
                  convertMsToTimestamp(trackPositionInMs)
                }
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
        }
      </div>
      {player && !isMobile &&
        <div className="w-[30%] flex justify-end items-center gap-3">
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
              max={100}
              step={1}
              value={volume}
              className="w-36 h-1.5  accent-green cursor-pointer "
            />
          </>
        </div>
      }
    </div >
  )


  return (
    <div onClick={handleFullScreen} className="w-full col-span-full" >
      <div className={fullScreenPlayer} >
        {fullScreen &&
          <button
            onClick={e => handleSetFullScreen(e)}
            className="mr-auto"
          >
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
              aria-hidden="true">
              <path d="M6 9.1L9 12l3 2.9 3-2.9 3-2.9"></path>
            </svg>
          </button>}
        <div className="flex flex-col gap-2 items-center justify-center w-full ">
          {current_track &&
            <>
              <img
                src={current_track.album.images[0].url}
                className="size-full rounded"
                alt={current_track.album.name} />
              <div className="w-full text-left">
                <Link
                  className="w-fit block"
                  href={`../artist/${getId(current_track.artists[0].uri)}`}>
                  <div className="">
                    {current_track.name}
                  </div>

                  <div className="text-zinc-400">
                    {current_track.artists[0].name}
                  </div>
                </Link>
              </div>
            </>
          }
        </div>
        <div className="flex flex-col gap-6 w-full justify-center items-center overflow-hidden">

          <div className="w-full">
            <div className="flex flex-row items-center gap-1 text-sm text-zinc-400">
              <span>
                {current_track && trackPositionInMs > current_track.duration_ms ?
                  convertMsToTimestamp(current_track.duration_ms) :
                  convertMsToTimestamp(trackPositionInMs)
                }
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
          <div className="w-full flex gap-16 justify-between">
            <div></div>
            <button
              className="w-12"
              onClick={() => { skipToPrev(token) }} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
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

            {is_paused ?
              <button
                className="bg-white rounded-full text-black w-12 flex justify-center items-center"
                onClick={() => { resumePlayback(token, deviceId) }} >
                <img src="/icons/track/playBlack.svg" alt="Play" />
              </button>
              :

              <button
                className="bg-white rounded-full text-black w-12 flex justify-center items-center"
                onClick={() => { pausePlayback(token, deviceId) }} >
                <img src="/icons/track/pauseBlack.svg" alt="Pause" />
              </button>
            }
            <button
              className="w-12"
              onClick={() => { skipToNext(token) }} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
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
            <div></div>
          </div>
        </div>
      </div >
    </div>
  )
}

