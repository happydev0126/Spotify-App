'use client'
import { useContext, useState } from "react"
import { pausePlayback, resumePlayback } from "../api/spotify/spotify-api"
import { DeviceContext, PlayerContext } from "../appContext"
import Link from "next/link"
import type { Track } from "../types/spotify"

export default function Track({ item, index, token, playlist_uri, uris, added_at }: { item: Track, index: number, token: string, playlist_uri?: string, uris?: string[], added_at?: string }) {
  const { deviceId, user } = useContext(DeviceContext)
  const { is_active, is_paused, current_track } = useContext(PlayerContext)
  const [isHover, setIsHover] = useState(false)

  const formatTime = (trackDate: string) => {
    const date = new Date(trackDate)
    const month = date.toLocaleString('default', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    return <div>{month} {day}, {year}</div>
  }

  const msToTime = (s: number) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    const secsStr = secs.toString().padStart(2, '0');
    if (hrs > 0) return hrs + ':' + mins + ':' + secsStr
    if (mins > 0) return mins + ':' + secsStr

    return 0 + ':' + secsStr
  }

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

  return (
    <div
      role="button"
      key={item.id}
      className="text-zinc-400 grid grid-cols-[3%_35%_25%_22%_5%] max-w-full text-sm overflow-hidden gap-x-6 items-center text-left hover:bg-gray-50/10 p-2 rounded max-h-16"
      onDoubleClick={handlePlayTrack}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex align-center justify-end w-full text-right">
        {
          isHover && is_paused ?
            <svg onClick={handlePlayTrack} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
            </svg>
            :
            isHover && !is_paused && !isCurrentlyPlaying(item.id) ?
              <svg onClick={handlePlayTrack} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
              </svg>
              :
              isHover && !is_paused && isCurrentlyPlaying(item.id) ?
                <svg onClick={handlePauseTrack} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z" clipRule="evenodd" />
                </svg> :
                !isHover && isCurrentlyPlaying(item.id) && !is_paused ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="#1ED45E" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" data-icon="SvgActivity" aria-hidden="true"><path d="M3 12.3h3.3l.8-2.4.8-2.4 1.8 6.75L11.5 21l1.95-9 1.95-9 1 4.65 1 4.65H21"></path></svg>
                  :
                  !isHover && isCurrentlyPlaying(item.id) && is_paused ?
                    <span className="text-green">{index + 1}</span> :
                    isHover && !isCurrentlyPlaying(item.id) && is_active ?
                      'hello' :
                      index + 1
        }
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link href={`/album/${item.album?.id}`} className="text-xs">
          <img src={item.album?.images[0].url} className="max-w-12 rounded" alt={item.album?.name} />
        </Link>
        <div className="overflow-hidden">
          <div className={`${isCurrentlyPlaying(item.id) ? ' text-green ' : ' text-white '} whitespace-nowrap text-ellipsis overflow-hidden text-md font-bold`}>{item.name}</div>
          <Link href={`/artist/${item.artists[0].id}`} className="text-xs hover:underline">{item.artists[0].name}</Link>
        </div>
      </div>

      <Link href={`/album/${item.album?.id}`} className="text-xs">
        <div className="text-zinc-400 whitespace-nowrap text-ellipsis overflow-hidden hover:underline">{item.album?.name}</div>
      </Link>
      {added_at &&
        <>
          <div>{formatTime(added_at)}</div>
          <div>{msToTime(item.duration_ms)}</div>
        </>
      }
      {!added_at && item.duration_ms &&
        <div>{msToTime(item.duration_ms)}</div>
      }
    </div>
  );
}

