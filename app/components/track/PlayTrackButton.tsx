import { useContext } from "react"
import { DeviceContext, PlayerContext } from "../../context/appContext"
import { resumePlayback } from "../../api/spotify/spotify-api"

export default function PlayTrackButton({ token, index, playlist_uri, uris, isPlaying }: { index: number, token: string, playlist_uri?: string, uris?: string[], isPlaying?: boolean }) {

  const { deviceId, user } = useContext(DeviceContext)
  const { player } = useContext(PlayerContext)

  const handlePlayTrack = () => {
    if (user?.product !== 'premium') {
      alert('Get Spotify Premium to use the player')
      return
    }
    console.log(isPlaying)
    if (isPlaying && player) {
      player.togglePlay()
      return
    }
    if (deviceId) {
      resumePlayback(token, deviceId, index, playlist_uri ?? undefined, uris ?? undefined)
    }
  }
  return (
    <button className="" onClick={handlePlayTrack}>
      <img src="/icons/track/play.svg" alt="Play" />
    </button>
  )
}

