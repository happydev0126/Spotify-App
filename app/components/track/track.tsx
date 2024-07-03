'use client'
import { useContext, useState } from "react"
import { resumePlayback } from "../../api/spotify/spotify-api"
import { DeviceContext, PlayerContext } from "../../context/appContext"
import Link from "next/link"
import type { Track } from "../../types/spotify"
import { usePathname } from "next/navigation"
import { convertMsToTimestamp } from "../../lib/utils/convertMsToTimestamp"
import { isoDateToMonthDayYear } from "../../lib/utils/isoDateToMonthDayYear"
import HandleTrack from "./handleTrack"


export default function Track({ item, index, token, playlist_uri, uris, added_at }: { item: Track, index: number, token: string, playlist_uri?: string, uris?: string[], added_at?: string }) {
  const { deviceId, user } = useContext(DeviceContext)
  const { current_track } = useContext(PlayerContext)
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

  const isCurrentlyPlaying = (trackid: string) => {
    if (current_track?.id === trackid) {
      return true
    }
    return false
  }

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
        {<HandleTrack token={token} playlist_uri={playlist_uri} index={index} uris={uris} isHover={isHover} item={item} />}
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
      {
        added_at &&
        <>
          <div>{isoDateToMonthDayYear(added_at).month} {isoDateToMonthDayYear(added_at).day}, {isoDateToMonthDayYear(added_at).year}</div>
          <div>{convertMsToTimestamp(item.duration_ms)}</div>
        </>
      }
      {
        !added_at && item.duration_ms &&
        <div className="justify-self-end">{convertMsToTimestamp(item.duration_ms)}</div>
      }
    </div >
  );
}

