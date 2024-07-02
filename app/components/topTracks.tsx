'use client'
import { useEffect, useState } from "react";
import Card from "./card";
import { CurrentUserPlaylist, CurrentUserPlaylists, TrackArtist } from "../types/spotify";

export default function TopTracks({ topTracks }: { topTracks: CurrentUserPlaylists | undefined }) {
  const [tracks, setTracks] = useState<CurrentUserPlaylist[] | undefined>()

  if (!topTracks) return <div>No top tracks found</div>

  useEffect(() => {
    setTracks(topTracks.items)
  }, [topTracks])

  return (
    <Card>
      {tracks?.map((track: any) => (
        <div key={track.id} >
          {
            track.artists.map((artist: TrackArtist) => (
              <span key={artist.name}>{artist.name}</span>
            ))
          }
        </div>
      ))
      }
    </Card >
  )
}
