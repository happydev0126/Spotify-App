'use client'
import { useContext } from "react"
import { resumePlayback } from "../api/spotify/spotify-api"
import { Item } from "../types/spotify"
import { DeviceContext } from "../appContext"

export default function Track({ item, index, token, playlist_uri }: { item: Item, index: number, token: string, playlist_uri: string }) {
  const deviceId = useContext(DeviceContext)

  return (
    <button
      key={item.track.id + index}
      className="grid grid-cols-[5%_25%_25%_25%_10%] max-w-full overflow-hidden gap-x-6 gap-y-4 items-center text-gray-300 text-left hover:bg-gray-50/10 p-2 rounded"
      onClick={() => resumePlayback(token, deviceId, playlist_uri, index)}
    >
      <div className="w-full text-right">{index + 1}</div>
      <div className="flex flex-row items-center gap-2">
        <img src={item.track.album.images[0].url} className="max-w-12 rounded" alt="" />
        <div>
          <div className="text-white">{item.track.name}</div>
          <div className="text-xs">{item.track.artists[0].name}</div>
        </div>
      </div>
      <div>{item.track.album.name}</div>
      <div>{item.added_at}</div>
      <div>{item.track.duration_ms}</div>
    </button>
  );
}

