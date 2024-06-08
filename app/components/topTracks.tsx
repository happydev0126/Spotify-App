'use client'
import { useEffect, useState } from "react";
import Card from "./card";

export default function TopTracks({ topTracks }) {
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    setTracks(topTracks.items)
  }, [topTracks])

  return (
    <Card>
      {tracks?.map((track) => (
        <div key={track.id} >
          {
            track.artists.map((artist) => (
              <span key={artist.name}>{artist.name}</span>
            ))
          }
        </div>
      ))
      }
    </Card >
  )
}
