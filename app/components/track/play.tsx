import { useContext } from "react"
import { DeviceContext } from "../../context/appContext"
import { resumePlayback } from "../../api/spotify/spotify-api"

export default function PlayTrackButton({ token, index, playlist_uri, uris }: { index: number, token: string, playlist_uri?: string, uris?: string[] }) {
  const { deviceId, user } = useContext(DeviceContext)

  const handlePlayTrack = () => {
    if (user?.product !== 'premium') {
      alert('Get Spotify Premium to use the player')
      return
    }
    if (deviceId) {
      resumePlayback(token, deviceId, index, playlist_uri ?? undefined, uris ?? undefined)
    }
  }
  return (
    <div onClick={handlePlayTrack}>
      <img src="/icons/track/play.svg" alt="Play" />
    </div>
  )
}

