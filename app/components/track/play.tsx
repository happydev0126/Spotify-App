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
    <svg onClick={handlePlayTrack} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
    </svg>
  )
}

