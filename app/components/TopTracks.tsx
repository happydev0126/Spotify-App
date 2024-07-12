'use client'
import { useEffect, useState } from "react";
import Card from "./ui/Card";
import { CurrentUserPlaylist, CurrentUserPlaylists, TrackArtist } from "../types/spotify";

export default function TopTracks({ topTracks }: { topTracks: CurrentUserPlaylists | undefined }) {
  const [tracks, setTracks] = useState<CurrentUserPlaylist[] | undefined>()

  useEffect(() => {
    if (topTracks) {
      setTracks(topTracks.items)
    }

  }, [topTracks])

  if (!topTracks) return <div>No top tracks found</div>


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
