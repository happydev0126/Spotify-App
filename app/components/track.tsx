'use client'
import { useContext, useEffect } from "react"
import { resumePlayback } from "../api/spotify/spotify-api"
import { Item } from "../types/spotify"
import { DeviceContext } from "../deviceContext"

export default function TrackC({ item, index, token }: { item: Item, index: number, token: string }) {
  const deviceId = useContext(DeviceContext)

  return (
    <>
      <div className="w-full text-right">{index + 1}</div>
      <div className="flex flex-row items-center gap-2">
        <button onClick={() => resumePlayback(token, deviceId, item.track.uri)}>
          <img src={item.track.album.images[0].url} className="max-w-12 rounded" alt="" />
        </button>
        <div>
          <div className="text-white">{item.track.name}</div>
          <div className="text-xs">{item.track.artists[0].name}</div>
        </div>
      </div>
      <div>{item.track.album.name}</div>
      <div>{item.added_at}</div>
      <div>{item.track.duration_ms}</div>
    </>
  )
}

