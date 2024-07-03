'use client'
import { useContext, useState } from "react"
import { pausePlayback, resumePlayback } from "../api/spotify/spotify-api"
import { DeviceContext, PlayerContext } from "../context/appContext"
import Link from "next/link"
import type { Track } from "../types/spotify"
import { usePathname } from "next/navigation"
import { convertMsToTimestamp } from "../lib/utils/convertMsToTimestamp"
import { isoDateToMonthDayYear } from "../lib/utils/isoDateToMonthDayYear"

export default function Track({ item, index, token, playlist_uri, uris, added_at }: { item: Track, index: number, token: string, playlist_uri?: string, uris?: string[], added_at?: string }) {
  const { deviceId, user } = useContext(DeviceContext)
  const { is_active, is_paused, current_track } = useContext(PlayerContext)
  const [isHover, setIsHover] = useState(false)
  const pathName = usePathname()

  const handlePlayTrack = () => {
    if (user?.product !== 'premium') {
      alert('Get Spotify Premium to use the player')
      return
    }
    if (deviceId) {
      resumePlayback(token, deviceId, index, playlist_uri ?? undefined, uris ?? undefined)
    }
  }

  const handlePauseTrack = () => {
    deviceId && pausePlayback(token, deviceId)
  }

  const isCurrentlyPlaying = (trackid: string) => {
    if (current_track?.id === trackid) {
      return true
    }
    return false
  }

  const showPlay = isHover && !isCurrentlyPlaying(item.id) || isHover && is_active && is_paused
  const showPause = (isHover && !is_paused) && isCurrentlyPlaying(item.id)
  const showPlaying = (!isHover && isCurrentlyPlaying(item.id)) && !is_paused
  const showActive = !isHover && isCurrentlyPlaying(item.id) && is_paused
  const showNumber = (!showPlay && !showPause && !showPlaying && !showActive)

  /*   TODO
   *   Refactor this component
  */
  return (
    <div
      role="button"
      key={item.id}
      className="text-zinc-400 grid grid-cols-[24px_minmax(200px,35%)_25%_22%_max-content] max-w-full text-sm overflow-hidden gap-x-6 items-center text-left hover:bg-gray-50/10 py-1 px-2 rounded max-h-16"
      onDoubleClick={handlePlayTrack}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex align-center justify-end w-full text-right min-w-6 text-sm">
        {
          showPlay &&
          <svg onClick={handlePlayTrack} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
          </svg>
        }
        {
          showPause &&
          <svg onClick={handlePauseTrack} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z" clipRule="evenodd" />
          </svg>
        }
        {
          showPlaying &&
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#1ED45E" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" data-icon="SvgActivity" aria-hidden="true"><path d="M3 12.3h3.3l.8-2.4.8-2.4 1.8 6.75L11.5 21l1.95-9 1.95-9 1 4.65 1 4.65H21"></path></svg>
        }
        {
          showActive &&
          <span className="text-green">{index + 1}</span>
        }
        {
          showNumber &&
          <span>{index + 1}</span>
        }
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link href={`/album/${item.album?.id}`} className="text-xs">
          <img src={item.album?.images[item.album?.images.length - 1].url} className="max-w-12 rounded" alt={item.album?.name} />
        </Link>
        <div className="overflow-hidden">
          <div className={`${isCurrentlyPlaying(item.id) ? ' text-green ' : ' text-white '} whitespace-nowrap text-ellipsis overflow-hidden text-md font-bold`}>{item.name}</div>
          {
            !(pathName.includes('/artist/')) &&
            <span>
              {
                item.artists.map((artist, index) => (
                  <>
                    <Link href={`/artist/${item.artists[0].id}`} className="text-xs whitespace-nowrap text-ellipsis overflow-hidden hover:underline hover:text-white">
                      {artist.name}
                    </Link>
                    {item.artists.length > 1 && item.artists.length !== index + 1 &&
                      <>
                        {', '}
                      </>
                    }
                  </>
                ))
              }
            </span>
          }
        </div>
      </div>

      <Link href={`/album/${item.album?.id}`} className="text-xs">
        <div className="text-zinc-400 whitespace-nowrap text-ellipsis overflow-hidden hover:underline hover:text-white">{item.album?.name}</div>
      </Link>
      {added_at &&
        <>
          <div>{isoDateToMonthDayYear(added_at).month} {isoDateToMonthDayYear(added_at).day}, {isoDateToMonthDayYear(added_at).year}</div>
          <div>{convertMsToTimestamp(item.duration_ms)}</div>
        </>
      }
      {!added_at && item.duration_ms &&
        <div className="justify-self-end">{convertMsToTimestamp(item.duration_ms)}</div>
      }
    </div>
  );
}

