'use client'
import { useContext } from "react"
import { resumePlayback } from "../api/spotify/spotify-api"
import { Item } from "../types/spotify"
import { DeviceContext } from "../appContext"

export default function Track({ item, index, token, playlist_uri }: { item: Item, index: number, token: string, playlist_uri: string }) {
  const { deviceId, user } = useContext(DeviceContext)

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
    console.log(user?.product)
    if (user?.product !== 'premium') {
      alert('Get Spotify Premium to use the player')
      return
    }
    if (deviceId) {
      resumePlayback(token, deviceId, playlist_uri, index)
    }
  }

  return (
    <button
      key={item.track.id + index}
      className="text-zinc-400 grid grid-cols-[3%_35%_25%_22%_5%] max-w-full text-sm overflow-hidden gap-x-6 items-center text-left hover:bg-gray-50/10 p-2 rounded max-h-16"
      onClick={handlePlayTrack}
    >
      <div className="w-full text-right">{index + 1}</div>
      <div className="flex flex-row items-center gap-2">
        <img src={item.track.album.images[0].url} className="max-w-12 rounded" alt="" />
        <div className="overflow-hidden">
          <div className="text-white whitespace-nowrap text-ellipsis overflow-hidden text-md font-bold">{item.track.name}</div>
          <div className="text-xs">{item.track.artists[0].name}</div>
        </div>
      </div>
      <div className="text-zinc-400 whitespace-nowrap text-ellipsis overflow-hidden">{item.track.album.name}</div>
      <div>{formatTime(item.added_at)}</div>
      <div>{msToTime(item.track.duration_ms)}</div>
    </button>
  );
}

