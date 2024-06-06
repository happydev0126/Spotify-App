'use client'
import { useEffect, useState } from "react";
import Card from "./components/card";

export default function TopTracks({ topTracks }) {
  console.count()
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    setTracks(topTracks)
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
