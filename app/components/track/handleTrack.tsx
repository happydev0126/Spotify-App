import { PlayerContext } from '@/app/context/appContext'
import React, { useContext } from 'react'
import type { Track } from "../../types/spotify"
import PlayTrackButton from './play'
import PauseTrackButton from './pause'

export default function HandleTrack({ token, item, isHover, index, uris, playlist_uri }: { token: string, item: Track, isHover: boolean, index: number, uris?: string[], playlist_uri?: string }) {
  const { is_active, is_paused, current_track } = useContext(PlayerContext)

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

  return (
    <>
      {
        showPlay &&
        <PlayTrackButton index={index} token={token} uris={uris} playlist_uri={playlist_uri} />
      }
      {
        showPause &&
        <PauseTrackButton token={token} />
      }
      {
        showPlaying &&
        <img src="/icons/track/playing.svg" alt="Playing" />
      }
      {
        showActive &&
        <span className="text-green">{index + 1}</span>
      }
      {
        showNumber &&
        <span>{index + 1}</span>
      }
    </>
  )
}

